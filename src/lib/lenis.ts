import Lenis from 'lenis'

export const initLenis = () => {
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
