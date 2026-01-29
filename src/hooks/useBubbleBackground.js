import { useEffect } from 'react'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const lerp = (start, end, amount) => start + (end - start) * amount

export function useBubbleBackground(ref) {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const layer = ref?.current
    if (!layer) {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let width = window.innerWidth
    let height = window.innerHeight
    let maxScroll = Math.max(document.documentElement.scrollHeight - height, 1)
    let scrollRatio = 0

    const pointer = {
      x: width * 0.6,
      y: height * 0.35,
    }

    const target = {
      cx: width * 0.65,
      cy: height * 0.45,
      scale: 1,
      rot: 0,
    }

    const current = { ...target }
    const turbulenceNode = layer.querySelector('[data-orb-turbulence]')
    const displacementNode = layer.querySelector('[data-orb-displacement]')
    const startTime = performance.now()

    const updateBounds = () => {
      width = window.innerWidth
      height = window.innerHeight
      maxScroll = Math.max(document.documentElement.scrollHeight - height, 1)
    }

    const updateScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset || 0
      scrollRatio = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0
    }

    const onPointerMove = (event) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
    }

    const onPointerLeave = () => {
      pointer.x = width * 0.6
      pointer.y = height * 0.35
    }

    const updateTargets = (timeMs) => {
      const time = timeMs * 0.001
      const driftX = Math.sin(time * 0.6) * width * 0.03
      const driftY = Math.cos(time * 0.7) * height * 0.035
      const scrollShift = (scrollRatio - 0.5) * height * 0.45
      const shiftX = (pointer.x - width * 0.5) * 0.9
      const shiftY = (pointer.y - height * 0.45) * 0.85

      target.cx = clamp(
        width * 0.62 + shiftX + driftX,
        width * 0.2,
        width * 0.95,
      )
      target.cy = clamp(
        height * 0.45 + shiftY + scrollShift + driftY,
        height * 0.1,
        height * 0.92,
      )

      const distance = Math.hypot(pointer.x - target.cx, pointer.y - target.cy)
      const proximity = 1 - Math.min(distance / (Math.min(width, height) * 0.55), 1)
      const pulse = 0.03 * Math.sin(time * 0.9)
      target.scale = 0.92 + proximity * 0.22 + scrollRatio * 0.08 + pulse
      target.rot = (shiftX / width) * 18 + scrollRatio * 10 + Math.sin(time * 0.8)

      const highlightX = clamp((pointer.x / width) * 100, 20, 80)
      const highlightY = clamp((pointer.y / height) * 100, 15, 80)
      layer.style.setProperty('--orb-hx', `${highlightX.toFixed(1)}%`)
      layer.style.setProperty('--orb-hy', `${highlightY.toFixed(1)}%`)
      layer.style.setProperty('--orb-hx2', `${(100 - highlightX).toFixed(1)}%`)
      layer.style.setProperty('--orb-hy2', `${(100 - highlightY).toFixed(1)}%`)

      layer.style.setProperty('--cursor-x', `${pointer.x.toFixed(1)}px`)
      layer.style.setProperty('--cursor-y', `${pointer.y.toFixed(1)}px`)

      if (turbulenceNode && displacementNode) {
        const base =
          0.0045 +
          proximity * 0.005 +
          scrollRatio * 0.002 +
          Math.sin(time * 0.9) * 0.001
        const freqX = base
        const freqY = base * 1.4
        turbulenceNode.setAttribute(
          'baseFrequency',
          `${freqX.toFixed(4)} ${freqY.toFixed(4)}`,
        )
        const distortion =
          5 + proximity * 10 + scrollRatio * 4 + Math.sin(time * 1.1) * 2
        displacementNode.setAttribute('scale', distortion.toFixed(1))
      }
    }

    const applyStyles = () => {
      layer.style.setProperty('--orb-cx', `${current.cx}px`)
      layer.style.setProperty('--orb-cy', `${current.cy}px`)
      layer.style.setProperty('--orb-scale', current.scale.toFixed(3))
      layer.style.setProperty('--orb-rot', `${current.rot.toFixed(2)}deg`)
    }

    if (prefersReducedMotion) {
      updateBounds()
      updateScroll()
      updateTargets(performance.now() - startTime)
      Object.assign(current, target)
      applyStyles()
      return undefined
    }

    let rafId = 0

    const animate = () => {
      updateTargets(performance.now() - startTime)

      current.cx = lerp(current.cx, target.cx, 0.26)
      current.cy = lerp(current.cy, target.cy, 0.26)
      current.scale = lerp(current.scale, target.scale, 0.1)
      current.rot = lerp(current.rot, target.rot, 0.14)

      applyStyles()
      rafId = window.requestAnimationFrame(animate)
    }

    const handleResize = () => {
      updateBounds()
      updateScroll()
    }

    updateBounds()
    updateScroll()
    animate()

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    window.addEventListener('blur', onPointerLeave)
    document.addEventListener('mouseleave', onPointerLeave)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('blur', onPointerLeave)
      document.removeEventListener('mouseleave', onPointerLeave)
    }
  }, [ref])
}
