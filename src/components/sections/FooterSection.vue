<script setup lang="ts">
import type { LandingContent } from '../../content/landing'

const props = defineProps<{
  footer: LandingContent['footer']
}>()

const isHashLink = (href: string) => href.startsWith('#')
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__pattern" aria-hidden="true"></div>
    <div class="container site-footer__inner">
      <div class="site-footer__brand">
        <img src="/cuqqaa-logo.png" alt="Cuqqaa logo" class="site-footer__logo" />
        <p class="site-footer__tagline">{{ props.footer.tagline }}</p>
      </div>
      <div class="site-footer__links">
        <component
          v-for="link in props.footer.links"
          :key="link.label"
          :is="isHashLink(link.href) ? 'a' : 'RouterLink'"
          :href="isHashLink(link.href) ? link.href : undefined"
          :to="!isHashLink(link.href) ? link.href : undefined"
          class="site-footer__link"
        >
          {{ link.label }}
        </component>
      </div>
    </div>
    <div class="container site-footer__meta">{{ props.footer.meta }}</div>
  </footer>
</template>
