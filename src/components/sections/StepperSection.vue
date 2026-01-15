<script setup lang="ts">
import { onBeforeUnmount, onBeforeUpdate, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { LandingContent } from '../../content/landing'
import { drift, reveal, splitText } from '../../lib/gsap'

const props = defineProps<{
  stepper: LandingContent['stepper']
}>()

const sectionRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const itemsRef = ref<HTMLElement | null>(null)
const lineRef = ref<HTMLElement | null>(null)
const stepRefs = ref<HTMLElement[]>([])
let ctx: gsap.Context | null = null

const setStepRef = (el: Element | null) => {
  if (el instanceof HTMLElement) stepRefs.value.push(el)
}

onBeforeUpdate(() => {
  stepRefs.value = []
})

onMounted(() => {
  if (!sectionRef.value || !lineRef.value) return
  const sectionEl = sectionRef.value

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
          trigger: sectionEl,
          start: 'top 70%',
          end: 'top 40%',
          scrub: true,
        },
      })
    }
    if (itemsRef.value) {
      reveal(itemsRef.value, {
        trigger: sectionEl,
        start: 'top 70%',
        end: 'top 40%',
        scrub: true,
        stagger: 0,
      })
    }
    if (titleRef.value) {
      drift(titleRef.value, { trigger: sectionEl, yPercent: -10 })
    }
    if (itemsRef.value) {
      drift(itemsRef.value, { trigger: sectionEl, yPercent: 6 })
    }

    stepRefs.value.forEach((step) => {
      gsap.set(step, { opacity: 1, scale: 1 })
      const fill = step.querySelector<HTMLElement>('.stepper__fill')
      if (fill) {
        gsap.set(fill, { width: '0%' })
      }
    })

    gsap.set(lineRef.value, { scaleX: 0, transformOrigin: 'left' })
    const clamp = gsap.utils.clamp(0, 1)

    const resetProgress = () => {
      stepRefs.value.forEach((step) => {
        gsap.to(step, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: true,
        })
      })
      stepRefs.value.forEach((step) => {
        const fill = step.querySelector<HTMLElement>('.stepper__fill')
        if (fill) {
          gsap.to(fill, {
            width: '0%',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: true,
          })
        }
      })
      gsap.to(lineRef.value, {
        scaleX: 0,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: true,
      })
    }

    ScrollTrigger.create({
      trigger: sectionEl,
      start: 'top 70%',
      end: 'bottom 20%',
      onEnter: () => {
        ScrollTrigger.refresh()
      },
      onLeaveBack: resetProgress,
      onUpdate: (self) => {
        const progress = self.progress
        const activeIndex = Math.min(
          stepRefs.value.length - 1,
          Math.floor(progress * stepRefs.value.length),
        )

        stepRefs.value.forEach((step, index) => {
          const fill = clamp(progress * stepRefs.value.length - index)
          const fillEl = step.querySelector<HTMLElement>('.stepper__fill')
          gsap.to(step, {
            opacity: index === activeIndex ? 1 : 1,
            scale: index === activeIndex ? 1.06 : 1,
            duration: 0.2,
            overwrite: true,
          })
          if (fillEl) {
            gsap.set(fillEl, { width: `${(fill * 100).toFixed(1)}%` })
          }
        })

        gsap.to(lineRef.value, { scaleX: progress, duration: 0.2, overwrite: true })
      },
    })
  }, sectionRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  ScrollTrigger.refresh()
})
</script>

<template>
  <section ref="sectionRef" class="section section--muted">
    <div class="container">
      <h2 ref="titleRef" class="section__title section__title--center">{{ props.stepper.title }}</h2>
      <div ref="itemsRef" class="stepper">
        <div class="stepper__line">
          <span ref="lineRef" class="stepper__progress"></span>
        </div>
        <div class="stepper__items">
          <div
            v-for="step in props.stepper.steps"
            :key="step"
            :ref="setStepRef"
            class="stepper__item"
          >
          <span class="stepper__fill" aria-hidden="true"></span>
          <span class="stepper__label" :data-label="step">{{ step }}</span>
        </div>
      </div>
      </div>
    </div>
  </section>
</template>
