<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import gsap from 'gsap'
import type { LandingContent, Locale } from '../../content/landing'
import { splitText } from '../../lib/gsap'

const props = defineProps<{
  hero: LandingContent['hero']
  nav: LandingContent['nav']
  locale: Locale
}>()

const emit = defineEmits<{
  (e: 'locale-change', locale: Locale): void
}>()

const heroRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const subRef = ref<HTMLElement | null>(null)
const miniRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)
const scrollRef = ref<HTMLElement | null>(null)
const orbRef = ref<HTMLElement | null>(null)
const photoRef = ref<HTMLElement | null>(null)
const showcaseRef = ref<HTMLElement | null>(null)
const layers = Array.from({ length: 9 }, (_, index) => index)
let ctx: gsap.Context | null = null
const showcaseIcons = ['fa-plus', 'fa-paper-plane', 'fa-right-left']

const scrollToFlow = () => {
  const target = document.querySelector('#flow')
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const animateTitle = () => {
  if (!titleRef.value) return
  titleRef.value.textContent = props.hero.title
  titleRef.value.removeAttribute('data-split')
  const chars = splitText(titleRef.value)
  gsap.from(chars, {
    y: -28,
    opacity: 0,
    duration: 0.8,
    stagger: 0.06,
    ease: 'power3.out',
  })
}

onMounted(() => {
  if (!heroRef.value || !titleRef.value) return

  ctx = gsap.context(() => {
    animateTitle()

    gsap.from([subRef.value, miniRef.value, ctaRef.value], {
      y: 18,
      opacity: 0,
      duration: 0.7,
      delay: 0.15,
      stagger: 0.12,
      ease: 'power2.out',
    })

    if (showcaseRef.value) {
      gsap.from(showcaseRef.value.children, {
        y: 18,
        opacity: 0,
        duration: 0.7,
        delay: 0.35,
        stagger: 0.1,
        ease: 'power2.out',
      })
    }

    if (scrollRef.value) {
      gsap.to(scrollRef.value, {
        y: 6,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }

    if (orbRef.value) {
      const ringLayers = orbRef.value.querySelectorAll('span')
      gsap.to(orbRef.value, {
        rotation: 12,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      ringLayers.forEach((layer, index) => {
        gsap.fromTo(
          layer,
          { opacity: 0.2 + index * 0.02 },
          {
            opacity: 0.85 - index * 0.04,
            duration: 1.6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.15,
          },
        )
      })
    }

    if (heroRef.value && orbRef.value) {
      gsap.to(orbRef.value, {
        y: -60,
        scale: 0.92,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    if (heroRef.value && photoRef.value) {
      gsap.to(photoRef.value, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    if (photoRef.value) {
      gsap.to(photoRef.value, {
        rotation: 6,
        x: 18,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }

    gsap.utils.toArray<HTMLElement>('.hero__float').forEach((card, index) => {
      gsap.to(card, {
        y: 14,
        duration: 4 + index * 0.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }, heroRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})

watch(
  () => props.hero.title,
  () => {
    animateTitle()
  },
)

const changeLocale = (next: Locale) => emit('locale-change', next)
</script>

<template>
  <section ref="heroRef" class="hero">
    <div class="hero__glow hero__glow--left"></div>
    <div class="hero__glow hero__glow--right"></div>
    <div class="hero__noise"></div>
    <div class="hero__pattern" aria-hidden="true"></div>
    <nav class="container hero__nav">
      <RouterLink class="hero__logo" to="/" aria-label="CUQQAA">
        <img src="/cuqqaa-logo.png" alt="CUQQAA logo" class="logo-mark" />
      </RouterLink>
      <div class="hero__nav-actions">
        <div class="lang-toggle">
          <button
            class="lang-toggle__btn"
            :class="locale === 'en' ? 'lang-toggle__btn--active' : ''"
            type="button"
            @click="changeLocale('en')"
          >
            EN
          </button>
          <button
            class="lang-toggle__btn"
            :class="locale === 'tr' ? 'lang-toggle__btn--active' : ''"
            type="button"
            @click="changeLocale('tr')"
          >
            TR
          </button>
        </div>
        <RouterLink class="btn btn-ghost" to="/login">
          <i class="fa-solid fa-right-to-bracket"></i>
          {{ props.nav.login }}
        </RouterLink>
        <RouterLink class="btn btn-primary" to="/signup">
          <i class="fa-solid fa-user-plus"></i>
          {{ props.nav.signup }}
        </RouterLink>
      </div>
    </nav>

    <div class="container hero__grid">
      <div class="hero__content">
        <h1 ref="titleRef" class="hero__title">
          {{ props.hero.title }}
        </h1>
        <p ref="subRef" class="hero__subtitle">
          {{ props.hero.subtitle }}
        </p>
        <p ref="miniRef" class="hero__mini">{{ props.hero.mini }}</p>
        <div ref="ctaRef" class="hero__cta">
          <RouterLink class="btn btn-primary hero__cta-primary" to="/signup">
            <i class="fa-solid fa-bolt"></i>
            {{ props.hero.primaryCta }}
          </RouterLink>
          <button class="btn btn-ghost" type="button" @click="scrollToFlow">
            <i class="fa-solid fa-arrow-right"></i>
            {{ props.hero.secondaryCta }}
          </button>
        </div>
      </div>
      <div class="hero__visual" aria-hidden="true">
        <div ref="orbRef" class="hero__orb">
          <span v-for="layer in layers" :key="layer" :style="{ '--i': layer }"></span>
        </div>
        <div ref="photoRef" class="hero__photo"></div>
        <div class="hero__float hero__float--one">
          <span><i class="fa-solid fa-plus"></i> €520</span>
          <small>{{ props.hero.mini }}</small>
        </div>
        <div class="hero__float hero__float--two">
          <span><i class="fa-solid fa-paper-plane"></i> Transfer</span>
          <small>€1,250</small>
        </div>
        <div class="hero__float hero__float--three">
          <span><i class="fa-solid fa-lock"></i> Card</span>
          <small>Locked</small>
        </div>
      </div>
    </div>

    <div class="container hero__footer">
      <div ref="showcaseRef" class="hero__showcase">
        <div
          v-for="(item, index) in props.hero.showcase"
          :key="item.title"
          class="hero__showcase-card"
        >
          <div class="hero__showcase-icon">
            <i class="fa-solid" :class="showcaseIcons[index]"></i>
          </div>
          <div class="hero__showcase-text">
            <span>{{ item.title }}</span>
            <small>{{ item.detail }}</small>
          </div>
        </div>
      </div>
      <div ref="scrollRef" class="hero__scroll">
        <i class="fa-solid fa-arrow-down"></i>
        {{ props.hero.scroll }}
      </div>
    </div>
  </section>
</template>
