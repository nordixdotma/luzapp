"use client"

import React, { useState, useRef, useCallback, useEffect } from "react"

export function useDraggableScroll() {
  const ref = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)
  const [hasMoved, setHasMoved] = useState(false)
  const dragThreshold = 5 // pixels to move before considering it a drag

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    
    // Only drag with left mouse button
    if (e.button !== 0) return

    // Don't start dragging if we're clicking on a button or link specifically?
    // Actually, we want to be able to drag from anywhere in the container.
    // The onClickCapture will prevent the link from firing if we move.

    setIsDragging(true)
    setHasMoved(false)
    setStartY(e.pageY)
    setScrollTop(ref.current.scrollTop)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !ref.current) return

      const deltaY = e.pageY - startY
      
      if (!hasMoved && Math.abs(deltaY) > dragThreshold) {
        setHasMoved(true)
        document.body.style.cursor = "grabbing"
        document.body.style.userSelect = "none"
      }

      if (hasMoved) {
        // Prevent default touch behaviors if we're dragging
        ref.current.scrollTop = scrollTop - deltaY
      }
    }

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false)
        document.body.style.cursor = ""
        document.body.style.userSelect = ""
        
        // Use a small timeout to let the click event pass through or be blocked
        setTimeout(() => {
          setHasMoved(false)
        }, 0)
      }
    }

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, startY, scrollTop, hasMoved])

  const onClickCapture = useCallback(
    (e: React.MouseEvent) => {
      if (hasMoved) {
        e.preventDefault()
        e.stopPropagation()
      }
    },
    [hasMoved],
  )

  return {
    ref,
    onMouseDown,
    onClickCapture,
    isDragging: isDragging && hasMoved,
  }
}
