"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function GSAPInitializer() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Fade up animation for sections
    const sections = document.querySelectorAll("section")
    sections.forEach((section) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return null
}
