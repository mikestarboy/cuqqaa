<script setup lang="ts">
import { computed, onBeforeUnmount, onBeforeUpdate, onMounted, ref, watch } from 'vue'
import gsap from 'gsap'
import type { LandingContent } from '../../content/landing'
import { drift, reveal, splitText, underlineMove } from '../../lib/gsap'

const props = defineProps<{
  tabs: LandingContent['tabs']
}>()

const sectionRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const tabsRef = ref<HTMLElement | null>(null)
const underlineRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const visualRef = ref<HTMLElement | null>(null)
const tabRefs = ref<HTMLElement[]>([])
const activeIndex = ref(0)
const tabIcons = ['fa-plus', 'fa-paper-plane', 'fa-right-left']
let ctx: gsap.Context | null = null

onBeforeUpdate(() => {
  tabRefs.value = []
})

const setTabRef = (el: HTMLElement | null) => {
  if (el) tabRefs.value.push(el)
}

const activeTab = computed(() => props.tabs.items[activeIndex.value])

const animateUnderline = () => {
  if (!underlineRef.value || !tabsRef.value || !tabRefs.value[activeIndex.value]) return
  underlineMove(underlineRef.value, tabRefs.value[activeIndex.value], tabsRef.value)
}

watch(activeIndex, () => {
  animateUnderline()
  if (!panelRef.value) return
  gsap.fromTo(
    panelRef.value,
    { opacity: 0, scale: 0.98 },
    { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
  )
})

onMounted(() => {
  if (!sectionRef.value) return
  ctx = gsap.context(() => {
    if (titleRef.value) {
      splitText(titleRef.value)
      const words = titleRef.value.querySelectorAll<HTMLElement>('.split-word')
      gsap.from(words, {
        y: 22,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 70%',
          end: 'top 40%',
          scrub: true,
        },
      })
    }
    if (tabsRef.value) {
      reveal(tabsRef.value, {
        trigger: sectionRef.value,
        start: 'top 70%',
        end: 'top 40%',
        scrub: true,
        stagger: 0,
      })
    }
    if (panelRef.value) {
      reveal(panelRef.value, {
        trigger: sectionRef.value,
        start: 'top 70%',
        end: 'top 40%',
        scrub: true,
        stagger: 0,
      })
    }
    if (titleRef.value) {
      drift(titleRef.value, { trigger: sectionRef.value, yPercent: -12 })
    }
    if (tabsRef.value) {
      drift(tabsRef.value, { trigger: sectionRef.value, yPercent: -6 })
    }
    if (panelRef.value) {
      drift(panelRef.value, { trigger: sectionRef.value, yPercent: 8 })
    }
    if (visualRef.value) {
      gsap.fromTo(
        visualRef.value,
        { xPercent: 18, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top 70%',
            end: 'top 40%',
            scrub: true,
          },
        },
      )
    }
    animateUnderline()
  }, sectionRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <section id="flow" ref="sectionRef" class="section section--light">
    <div class="container">
      <div class="section__heading">
        <h2 ref="titleRef" class="section__title">{{ props.tabs.title }}</h2>
        <div ref="tabsRef" class="tabs">
          <div class="tabs__bar">
            <button
              v-for="(tab, index) in props.tabs.items"
              :key="tab.label"
              ref="setTabRef"
              class="tabs__button"
              :class="index === activeIndex ? 'tabs__button--active' : ''"
              type="button"
              @click="activeIndex = index"
            >
              <i class="fa-solid" :class="tabIcons[index]"></i>
              <span>{{ tab.label }}</span>
            </button>
          </div>
          <span ref="underlineRef" class="tabs__underline"></span>
        </div>
      </div>

      <div ref="panelRef" class="tabs__panel">
        <div class="tabs__content">
          <h3 class="tabs__title">{{ activeTab.heading }}</h3>
          <p class="tabs__text">{{ activeTab.description }}</p>
        </div>
        <div ref="visualRef" class="tabs__visual" aria-hidden="true">
          <div class="tabs__visual-inner">
            <div class="tabs__glow"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
