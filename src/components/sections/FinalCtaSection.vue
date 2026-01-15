<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import type { LandingContent } from '../../content/landing'
import { drift, reveal, splitText } from '../../lib/gsap'

const props = defineProps<{
  finalCta: LandingContent['finalCta']
}>()

const sectionRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const subRef = ref<HTMLElement | null>(null)
const actionsRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!sectionRef.value) return
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
    if (subRef.value) {
      reveal(subRef.value, {
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
    if (subRef.value) {
      drift(subRef.value, { trigger: sectionEl, yPercent: 6 })
    }
    if (actionsRef.value) {
      reveal(Array.from(actionsRef.value.children), {
        trigger: sectionEl,
        start: 'top 70%',
        end: 'top 40%',
        scrub: true,
        stagger: 0.12,
      })
      drift(actionsRef.value, { trigger: sectionEl, yPercent: 10 })
    }
  }, sectionRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <section ref="sectionRef" class="section section--muted">
    <div class="container final-cta">
      <div class="final-cta__content">
        <h2 ref="titleRef" class="section__title">{{ props.finalCta.title }}</h2>
        <p ref="subRef" class="section__subtitle">{{ props.finalCta.subtitle }}</p>
      </div>
      <div ref="actionsRef" class="final-cta__actions">
        <RouterLink class="btn btn-primary btn-primary--glow" to="/signup">
          <i class="fa-solid fa-user-plus"></i>
          {{ props.finalCta.primaryCta }}
        </RouterLink>
        <RouterLink class="btn btn-ghost" to="/login">
          <i class="fa-solid fa-right-to-bracket"></i>
          {{ props.finalCta.secondaryCta }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
