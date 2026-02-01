import { useEffect } from 'react'

export function useInteractiveBackground(ref) {
  useEffect(() => {
    const layer = ref?.current
    if (!layer) {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const root = document.documentElement
    const state = {
      targetX: 50,
      targetY: 50,
      currentX: 50,
      currentY: 50,
      scroll: 0,
      rafId: null,
    }

    const update = () => {
      const ease = 0.08
      state.currentX += (state.targetX - state.currentX) * ease
      state.currentY += (state.targetY - state.currentY) * ease

      layer.style.setProperty('--bg-x', `${state.currentX.toFixed(2)}%`)
      layer.style.setProperty('--bg-y', `${state.currentY.toFixed(2)}%`)
      layer.style.setProperty('--scroll-y', `${state.scroll.toFixed(2)}%`)
      root.style.setProperty('--orbit-x', `${state.currentX.toFixed(2)}%`)
      root.style.setProperty('--orbit-y', `${state.currentY.toFixed(2)}%`)

      state.rafId = window.requestAnimationFrame(update)
    }

    const handlePointerMove = (event) => {
      const { innerWidth, innerHeight } = window
      const x = Math.min(Math.max(event.clientX / innerWidth, 0), 1)
      const y = Math.min(Math.max(event.clientY / innerHeight, 0), 1)
      state.targetX = x * 100
      state.targetY = y * 100
    }

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0
      state.scroll = ratio * 20
    }

    handleScroll()

    if (prefersReducedMotion) {
      layer.style.setProperty('--bg-x', `${state.currentX}%`)
      layer.style.setProperty('--bg-y', `${state.currentY}%`)
      layer.style.setProperty('--scroll-y', `${state.scroll}%`)
      root.style.setProperty('--orbit-x', `${state.currentX}%`)
      root.style.setProperty('--orbit-y', `${state.currentY}%`)
      return () => {}
    }

    state.rafId = window.requestAnimationFrame(update)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (state.rafId) {
        window.cancelAnimationFrame(state.rafId)
      }
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [ref])
}
