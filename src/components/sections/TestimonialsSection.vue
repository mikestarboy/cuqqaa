<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import type { LandingContent } from '../../content/landing'
import { drift, reveal, splitText } from '../../lib/gsap'

const props = defineProps<{
  testimonials: LandingContent['testimonials']
}>()

const sectionRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const cardsRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!sectionRef.value || !cardsRef.value) return

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
    if (titleRef.value) {
      drift(titleRef.value, { trigger: sectionRef.value, yPercent: -10 })
    }
    if (cardsRef.value) {
      drift(cardsRef.value, { trigger: sectionRef.value, yPercent: 6, xPercent: -2 })
    }
    const cards = cardsRef.value!.querySelectorAll('.testimonial-card')
    reveal(cards, {
      trigger: sectionRef.value,
      start: 'top 70%',
      end: 'top 40%',
      scrub: true,
      stagger: 0.2,
    })
  }, sectionRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <section ref="sectionRef" class="section section--dark">
    <div class="container">
      <h2 ref="titleRef" class="section__title section__title--center">
        {{ props.testimonials.title }}
      </h2>
      <div ref="cardsRef" class="testimonials-grid">
        <article
          v-for="item in props.testimonials.items"
          :key="item.name"
          class="testimonial-card"
        >
          <p class="testimonial-card__quote">
            <i class="fa-solid fa-quote-left"></i>
            “{{ item.quote }}”
          </p>
          <p class="testimonial-card__name">{{ item.name }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
