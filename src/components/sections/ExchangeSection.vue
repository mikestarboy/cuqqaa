<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import type { LandingContent } from '../../content/landing'
import { drift, reveal, splitText } from '../../lib/gsap'

const props = defineProps<{
  exchange: LandingContent['exchange']
}>()

const sectionRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const subRef = ref<HTMLElement | null>(null)
const widgetRef = ref<HTMLElement | null>(null)
const openMenu = ref<'from' | 'to' | null>(null)
const fromCurrency = ref<string>(props.exchange.currencies[0] ?? 'EUR')
const toCurrency = ref<string>(props.exchange.currencies[1] ?? props.exchange.currencies[0] ?? 'USD')
let ctx: gsap.Context | null = null

const toggleMenu = (menu: 'from' | 'to') => {
  openMenu.value = openMenu.value === menu ? null : menu
}

const selectCurrency = (menu: 'from' | 'to', value: string) => {
  if (menu === 'from') {
    fromCurrency.value = value
  } else {
    toCurrency.value = value
  }
  openMenu.value = null
}

onMounted(() => {
  if (!sectionRef.value || !widgetRef.value) return
  const sectionEl = sectionRef.value

  ctx = gsap.context(() => {
    if (titleRef.value) {
      splitText(titleRef.value)
      const words = titleRef.value.querySelectorAll<HTMLElement>('.split-word')
      gsap.from(words, {
        y: 22,
        opacity: 0,
        duration: 1,
        stagger: 0.5,
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
    if (contentRef.value) {
      drift(contentRef.value, { trigger: sectionEl, yPercent: -8 })
    }
    if (widgetRef.value) {
      gsap.fromTo(
        widgetRef.value,
        { xPercent: 22, opacity: 0, y: 18 },
        {
          xPercent: 0,
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 70%',
            end: 'top 40%',
            scrub: true,
          },
        },
      )
    }
  }, sectionRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <section ref="sectionRef" class="section section--light">
    <div class="container exchange-section">
      <div ref="contentRef" class="exchange-section__content">
        <h2 ref="titleRef" class="section__title">{{ props.exchange.title }}</h2>
        <p ref="subRef" class="section__subtitle">{{ props.exchange.subtitle }}</p>
      </div>
      <div ref="widgetRef" class="exchange-widget">
        <div class="exchange-field">
          <label class="exchange-label">{{ props.exchange.sentLabel }}</label>
          <div class="exchange-input-row">
            <input class="exchange-input" type="text" :value="props.exchange.fromValue" readonly />
            <button class="currency-select" type="button" @click="toggleMenu('from')">
              {{ fromCurrency }}
              <span class="currency-select__chevron">
                <i class="fa-solid fa-chevron-down"></i>
              </span>
            </button>
          </div>
          <div class="dropdown" :class="openMenu === 'from' ? 'dropdown--open' : ''">
            <button
              v-for="currency in props.exchange.currencies"
              :key="currency"
              type="button"
              class="dropdown__item"
              @click="selectCurrency('from', currency)"
            >
              {{ currency }}
            </button>
          </div>
        </div>
        <div class="exchange-divider"></div>
        <div class="exchange-field">
          <label class="exchange-label">{{ props.exchange.receivedLabel }}</label>
          <div class="exchange-input-row">
            <input class="exchange-input" type="text" :value="props.exchange.toValue" readonly />
            <button class="currency-select" type="button" @click="toggleMenu('to')">
              {{ toCurrency }}
              <span class="currency-select__chevron">
                <i class="fa-solid fa-chevron-down"></i>
              </span>
            </button>
          </div>
          <div class="dropdown" :class="openMenu === 'to' ? 'dropdown--open' : ''">
            <button
              v-for="currency in props.exchange.currencies"
              :key="currency"
              type="button"
              class="dropdown__item"
              @click="selectCurrency('to', currency)"
            >
              {{ currency }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
