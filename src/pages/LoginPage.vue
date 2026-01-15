<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale'
import { authContent } from '../content/auth'

const { locale, setLocale } = useLocale()
const content = computed(() => authContent[locale.value])

const changeLocale = (next: 'en' | 'tr') => setLocale(next)
</script>

<template>
  <section class="auth-page">
    <div class="container">
      <header class="auth-header">
        <RouterLink to="/" class="auth-logo" aria-label="CUQQAA">
          <img src="/cuqqaa-logo.png" alt="CUQQAA logo" class="auth-logo__img" />
        </RouterLink>
        <div class="auth-header__actions">
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
          <RouterLink class="btn btn-ghost" to="/signup">
            <i class="fa-solid fa-user-plus"></i>
            {{ content.nav.signup }}
          </RouterLink>
        </div>
      </header>

      <div class="auth-grid">
        <div class="auth-panel">
          <span class="section-tag">{{ content.nav.login }}</span>
          <h1 class="auth-title">{{ content.login.title }}</h1>
          <p class="auth-subtitle">{{ content.login.subtitle }}</p>
          <form class="auth-form" @submit.prevent>
            <label class="auth-field">
              <span>{{ content.login.email }}</span>
              <div class="auth-field__control">
                <i class="fa-solid fa-envelope"></i>
                <input type="email" required />
              </div>
            </label>
            <label class="auth-field">
              <span>{{ content.login.password }}</span>
              <div class="auth-field__control">
                <i class="fa-solid fa-lock"></i>
                <input type="password" required />
              </div>
            </label>
            <div class="auth-options">
              <label class="auth-checkbox">
                <input type="checkbox" />
                <span>{{ content.login.remember }}</span>
              </label>
              <button class="auth-link" type="button">
                {{ content.login.helper }}
              </button>
            </div>
            <button class="btn btn-primary btn-primary--lift" type="submit">
              <i class="fa-solid fa-right-to-bracket"></i>
              {{ content.login.primaryCta }}
            </button>
          </form>
          <RouterLink class="auth-switch" to="/signup">
            {{ content.login.secondaryCta }}
            <i class="fa-solid fa-arrow-right"></i>
          </RouterLink>
          <RouterLink class="auth-back" to="/">
            <i class="fa-solid fa-arrow-left"></i>
            {{ content.nav.back }}
          </RouterLink>
        </div>
        <div class="auth-aside" aria-hidden="true">
          <div class="auth-aside__glow"></div>
          <div class="auth-aside__card">
            <span>{{ content.login.aside.label }}</span>
            <strong>{{ content.login.aside.value }}</strong>
            <small>{{ content.login.aside.helper }}</small>
          </div>
          <div class="auth-aside__stat">
            <i class="fa-solid fa-shield-halved"></i>
            {{ content.login.aside.stat }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
