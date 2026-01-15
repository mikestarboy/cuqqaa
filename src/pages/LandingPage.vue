<script setup lang="ts">
import { computed } from 'vue'
import { landingContent } from '../content/landing'
import { useLocale } from '../composables/useLocale'
import HeroSection from '../components/sections/HeroSection.vue'
import FinanceTabsSection from '../components/sections/FinanceTabsSection.vue'
import StepperSection from '../components/sections/StepperSection.vue'
import CtaBandSection from '../components/sections/CtaBandSection.vue'
import CardSection from '../components/sections/CardSection.vue'
import ExchangeSection from '../components/sections/ExchangeSection.vue'
import TestimonialsSection from '../components/sections/TestimonialsSection.vue'
import FinalCtaSection from '../components/sections/FinalCtaSection.vue'
import FooterSection from '../components/sections/FooterSection.vue'

const { locale, setLocale } = useLocale()
const content = computed(() => landingContent[locale.value])
</script>

<template>
  <main>
    <HeroSection
      :hero="content.hero"
      :nav="content.nav"
      :locale="locale"
      @locale-change="setLocale"
    />
    <FinanceTabsSection :tabs="content.tabs" />
    <StepperSection :stepper="content.stepper" />
    <CtaBandSection :cta-band="content.ctaBand" />
    <CardSection :card="content.card" />
    <ExchangeSection :exchange="content.exchange" />
    <TestimonialsSection :testimonials="content.testimonials" />
    <FinalCtaSection :final-cta="content.finalCta" />
    <FooterSection :footer="content.footer" />
  </main>
</template>
