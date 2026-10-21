/**
 * Site motion, powered by GSAP (free incl. ScrollTrigger + SplitText).
 *
 * Progressive enhancement: Base.astro adds `html.motion` before first paint
 * only when the visitor hasn't asked for reduced motion. CSS hides the
 * elements animated here *only* under that class, so without JS, with
 * reduced motion, or if this file fails to load (Base removes the class after
 * a timeout), every element is simply visible.
 *
 * Hooks used in the markup:
 *   [data-hero-bg] [data-hero-content] [data-hero-item] [data-hero-title]
 *   .reveal                       fade-up when scrolled into view (batched)
 *   [data-timeline-line] [data-timeline-node]   legacy timeline
 */
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {SplitText} from 'gsap/SplitText'

window.__motionReady = true
const root = document.documentElement

if (root.classList.contains('motion')) {
  gsap.registerPlugin(ScrollTrigger, SplitText)
  gsap.defaults({ease: 'power3.out', duration: 0.9})
  hero()
  reveals()
  timeline()
}

function hero() {
  const section = document.querySelector('#home, [data-page-hero]')
  if (!section) return
  const bg = section.querySelector('[data-hero-bg]')
  const content = section.querySelector('[data-hero-content]')
  const items = section.querySelectorAll('[data-hero-item]')
  const title = section.querySelector('[data-hero-title]')

  // Intro: background settles, then content builds up line by line.
  if (bg) gsap.fromTo(bg, {scale: 1.12}, {scale: 1, duration: 2.4, ease: 'power2.out'})
  if (title) {
    gsap.set(title, {autoAlpha: 1})
    // Split by words (never characters) so Arabic letters stay joined.
    SplitText.create(title, {
      type: 'words,lines',
      mask: 'lines',
      autoSplit: true,
      onSplit: (self) => gsap.from(self.words, {yPercent: 110, duration: 1.1, ease: 'power4.out', stagger: 0.05, delay: 0.25}),
    })
  }
  gsap.fromTo(items, {autoAlpha: 0, y: 24}, {autoAlpha: 1, y: 0, stagger: 0.12, delay: 0.45})

  // Scroll: background drifts slower than the page, content eases away.
  const scrub = {trigger: section, start: 'top top', end: 'bottom top', scrub: true}
  if (bg) gsap.to(bg, {yPercent: 12, ease: 'none', scrollTrigger: scrub})
  if (content) gsap.to(content, {y: -60, autoAlpha: 0.2, ease: 'none', scrollTrigger: {...scrub, start: 'center center'}})
}

function reveals() {
  // Batch so elements entering together cascade instead of popping at once.
  ScrollTrigger.batch('.reveal', {
    start: 'top 88%',
    once: true,
    onEnter: (els) => gsap.to(els, {autoAlpha: 1, y: 0, stagger: 0.1, overwrite: true}),
  })
}

function timeline() {
  const line = document.querySelector('[data-timeline-line]')
  if (!line) return
  // The line draws itself as you scroll through the presidents. Trigger on
  // its container: the line starts at scaleY 0, so it can't be measured.
  gsap.fromTo(line, {scaleY: 0}, {
    scaleY: 1,
    ease: 'none',
    transformOrigin: 'top center',
    scrollTrigger: {trigger: line.parentElement, start: 'top 70%', end: 'bottom 70%', scrub: 0.6},
  })
  document.querySelectorAll('[data-timeline-node]').forEach((node) => {
    gsap.fromTo(node, {scale: 0}, {
      scale: 1,
      duration: 0.5,
      ease: 'back.out(3)',
      scrollTrigger: {trigger: node.parentElement, start: 'center 70%', toggleActions: 'play none none reverse'},
    })
  })
}
