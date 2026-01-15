import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export const initGsap = (lenis?: Lenis) => {
  let cleanup = () => {}

  if (lenis) {
    const onScroll = () => ScrollTrigger.update()
    const onRefresh = () => lenis.resize()
    const onTick = (time: number) => lenis.raf(time * 1000)

    lenis.on('scroll', onScroll)
    ScrollTrigger.addEventListener('refresh', onRefresh)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    cleanup = () => {
      lenis.off('scroll', onScroll)
      ScrollTrigger.removeEventListener('refresh', onRefresh)
      gsap.ticker.remove(onTick)
    }
  }

  ScrollTrigger.refresh()

  return cleanup
}

type RevealOptions = {
  trigger?: Element | string
  start?: string
  end?: string
  scrub?: boolean | number
  y?: number
  opacity?: number
  duration?: number
  stagger?: number
}

type DriftOptions = {
  trigger?: Element | string
  start?: string
  end?: string
  scrub?: number | boolean
  yPercent?: number
  xPercent?: number
  rotation?: number
  scale?: number
}

export const reveal = (targets: gsap.DOMTarget, options: RevealOptions = {}) => {
  const {
    trigger,
    start = 'top 85%',
    end,
    scrub,
    y = 28,
    opacity = 0,
    duration = 0.7,
    stagger = 0.12,
  } = options

  const scrollTrigger: ScrollTrigger.Vars = {
    trigger: trigger ?? targets,
    start,
    toggleActions: 'play reverse play reverse',
  }

  if (end) {
    scrollTrigger.end = end
  }

  if (scrub !== undefined) {
    scrollTrigger.scrub = scrub
    scrollTrigger.toggleActions = undefined
  }

  return gsap.from(targets, {
    y,
    opacity,
    duration,
    stagger,
    ease: 'power3.out',
    scrollTrigger,
  })
}

export const splitText = (element: HTMLElement) => {
  if (element.dataset.split === 'true') {
    return element.querySelectorAll<HTMLElement>('.split-char')
  }

  const text = element.textContent ?? ''
  element.textContent = ''
  element.dataset.split = 'true'
  element.setAttribute('aria-label', text)
  element.setAttribute('role', 'text')

  const fragment = document.createDocumentFragment()
  const words = text.split(' ')
  words.forEach((word, index) => {
    const wordSpan = document.createElement('span')
    wordSpan.className = 'split-word'
    Array.from(word).forEach((char) => {
      const span = document.createElement('span')
      span.className = 'split-char'
      span.setAttribute('aria-hidden', 'true')
      span.textContent = char
      wordSpan.appendChild(span)
    })
    fragment.appendChild(wordSpan)
    if (index < words.length - 1) {
      fragment.appendChild(document.createTextNode(' '))
    }
  })
  element.appendChild(fragment)
  return element.querySelectorAll<HTMLElement>('.split-char')
}

export const underlineMove = (
  underline: HTMLElement,
  activeButton: HTMLElement,
  container: HTMLElement,
) => {
  const parentRect = container.getBoundingClientRect()
  const activeRect = activeButton.getBoundingClientRect()
  const x = activeRect.left - parentRect.left

  gsap.to(underline, {
    x,
    width: activeRect.width,
    duration: 0.35,
    ease: 'power2.out',
  })
}

export const parallax = (target: HTMLElement, distance = 24) => {
  gsap.to(target, {
    y: distance,
    ease: 'none',
    scrollTrigger: {
      trigger: target,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

export const drift = (target: gsap.DOMTarget, options: DriftOptions = {}) => {
  const {
    trigger,
    start = 'top bottom',
    end = 'bottom top',
    scrub = 0.6,
    yPercent = 0,
    xPercent = 0,
    rotation = 0,
    scale = 1,
  } = options

  return gsap.to(target, {
    yPercent,
    xPercent,
    rotation,
    scale,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger ?? target,
      start,
      end,
      scrub,
    },
  })
}
