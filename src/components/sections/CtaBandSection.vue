<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import type { LandingContent } from '../../content/landing'
import { drift, reveal, splitText } from '../../lib/gsap'

const props = defineProps<{
  ctaBand: LandingContent['ctaBand']
}>()

const sectionRef = ref<HTMLElement | null>(null)
const bgRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const subRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!sectionRef.value) return

  ctx = gsap.context(() => {
    if (bgRef.value) {
      gsap.to(bgRef.value, {
        y: -20,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }

    if (titleRef.value) {
      splitText(titleRef.value)
      const words = titleRef.value.querySelectorAll<HTMLElement>('.split-word')
      gsap.from(words, {
        y: 26,
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

    reveal([subRef.value, buttonRef.value].filter(Boolean), {
      trigger: sectionRef.value,
      start: 'top 70%',
      end: 'top 40%',
      scrub: true,
    })

    if (titleRef.value) {
      drift(titleRef.value, { trigger: sectionRef.value, yPercent: -10, xPercent: -2 })
    }
    if (subRef.value) {
      drift(subRef.value, { trigger: sectionRef.value, yPercent: 6 })
    }
    if (buttonRef.value) {
      drift(buttonRef.value, { trigger: sectionRef.value, yPercent: 10 })
    }
  }, sectionRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <section ref="sectionRef" class="cta-band">
    <div ref="bgRef" class="cta-band__bg" aria-hidden="true"></div>
    <div class="container cta-band__inner">
      <h2 ref="titleRef" class="cta-band__title">{{ props.ctaBand.title }}</h2>
      <p ref="subRef" class="cta-band__subtitle">{{ props.ctaBand.subtitle }}</p>
      <button ref="buttonRef" class="btn btn-primary btn-primary--lift" type="button">
        <i class="fa-solid fa-bolt"></i>
        {{ props.ctaBand.button }}
      </button>
    </div>
  </section>
</template>
