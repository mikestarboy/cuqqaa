import Lenis from 'lenis'

export const initLenis = () => {
  if (typeof window !== 'undefined') {
    const isTouch = window.matchMedia?.('(pointer: coarse)').matches ?? 'ontouchstart' in window
    if (isTouch) {
      return {
        lenis: undefined,
        destroy: () => {},
      }
    }
  }

  const lenis = new Lenis({
    lerp: 0.18,
    smoothWheel: true,
    wheelMultiplier: 1.2,
    autoRaf: false,
  })

  return {
    lenis,
    destroy: () => {
      lenis.destroy()
    },
  }
}
