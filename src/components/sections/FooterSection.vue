<script setup lang="ts">
import type { LandingContent } from '../../content/landing'

const props = defineProps<{
  footer: LandingContent['footer']
}>()

const isHashLink = (href: string) => href.startsWith('#')

const scrollToHash = (hash: string) => {
  const target = document.querySelector(hash)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
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
        <template v-for="link in props.footer.links" :key="link.label">
          <button
            v-if="isHashLink(link.href)"
            type="button"
            class="site-footer__link"
            @click="scrollToHash(link.href)"
          >
            {{ link.label }}
          </button>
          <RouterLink v-else class="site-footer__link" :to="link.href">
            {{ link.label }}
          </RouterLink>
        </template>
      </div>
    </div>
    <div class="container site-footer__meta">{{ props.footer.meta }}</div>
  </footer>
</template>
