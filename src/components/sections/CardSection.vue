<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import gsap from "gsap";
import type { LandingContent } from "../../content/landing";
import { drift, reveal, splitText } from "../../lib/gsap";

const props = defineProps<{
  card: LandingContent["card"];
}>();

const sectionRef = ref<HTMLElement | null>(null);
const cardRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const tagRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const subtitleRef = ref<HTMLElement | null>(null);
const linkRef = ref<HTMLElement | null>(null);
const chipsRef = ref<HTMLElement | null>(null);
const chipIcons = ["fa-wifi", "fa-gauge-high", "fa-lock"];
let ctx: gsap.Context | null = null;

onMounted(() => {
  if (!sectionRef.value) return;
  const sectionEl = sectionRef.value;

  ctx = gsap.context(() => {
    reveal([tagRef.value, subtitleRef.value, linkRef.value].filter(Boolean), {
      trigger: sectionEl,
      start: "top 70%",
      end: "top 40%",
      scrub: true,
      stagger: 0.12,
    });

    if (titleRef.value) {
      splitText(titleRef.value);
      const words = titleRef.value.querySelectorAll<HTMLElement>(".split-word");
      gsap.from(words, {
        y: 22,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 70%",
          end: "top 40%",
          scrub: true,
        },
      });
    }

    if (cardRef.value) {
      gsap.fromTo(
        cardRef.value,
        { y: 40, opacity: 0 },
        {
          y: -10,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: sectionEl,
            start: "top 50%",
            end: "top 20%",
            scrub: true,
          },
        }
      );
    }
    if (contentRef.value) {
      drift(contentRef.value, { trigger: sectionEl, yPercent: -4 });
    }

    if (chipsRef.value) {
      const chips = chipsRef.value.querySelectorAll(".chip");
      reveal(chips, {
        trigger: sectionEl,
        start: "top 70%",
        end: "top 40%",
        scrub: true,
        stagger: 0.18,
      });
    }
  }, sectionRef.value);
});

onBeforeUnmount(() => {
  ctx?.revert();
});
</script>

<template>
  <section ref="sectionRef" class="section section--dark">
    <div class="container card-section">
      <div ref="cardRef" class="card-visual" aria-hidden="true">
        <div class="card-visual__shine"></div>
      </div>
      <div ref="contentRef" class="card-content">
        <span ref="tagRef" class="section-tag">{{ props.card.label }}</span>
        <h2 ref="titleRef" class="section__title">{{ props.card.title }}</h2>
        <p ref="subtitleRef" class="section__subtitle">
          {{ props.card.subtitle }}
        </p>
        <div ref="chipsRef" class="card-chips">
          <span
            v-for="(chip, index) in props.card.chips"
            :key="chip"
            class="chip"
          >
            <i class="fa-solid" :class="chipIcons[index]"></i>
            {{ chip }}
          </span>
        </div>
        <a ref="linkRef" class="card-link" href="#">
          {{ props.card.link }}
          <i class="fa-solid fa-arrow-right"></i>
          <span class="card-link__line"></span>
        </a>
      </div>
    </div>
  </section>
</template>
