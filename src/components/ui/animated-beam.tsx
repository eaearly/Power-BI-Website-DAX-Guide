"use client"

import { RefObject, useEffect, useId, useState } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

export interface AnimatedBeamProps {
  className?: string
  containerRef: RefObject<HTMLElement | null> // Container ref
  fromRef: RefObject<HTMLElement | null>
  toRef: RefObject<HTMLElement | null>
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

/**
 * Compute where a ray from `from` → `to` exits the axis-aligned rectangle.
 * Returns the intersection point on the rectangle border.
 * `rx, ry` = top-left corner; `rw, rh` = width, height.
 */
function borderIntersection(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  rx: number,
  ry: number,
  rw: number,
  rh: number
): { x: number; y: number } {
  const dx = toX - fromX
  const dy = toY - fromY
  let best: { x: number; y: number } | null = null
  let minT = Infinity

  // Top edge
  if (dy !== 0) {
    const t = (ry - fromY) / dy
    const ix = fromX + t * dx
    if (t > 0 && t < minT && ix >= rx && ix <= rx + rw) {
      minT = t
      best = { x: ix, y: ry }
    }
  }
  // Bottom edge
  if (dy !== 0) {
    const t = (ry + rh - fromY) / dy
    const ix = fromX + t * dx
    if (t > 0 && t < minT && ix >= rx && ix <= rx + rw) {
      minT = t
      best = { x: ix, y: ry + rh }
    }
  }
  // Left edge
  if (dx !== 0) {
    const t = (rx - fromX) / dx
    const iy = fromY + t * dy
    if (t > 0 && t < minT && iy >= ry && iy <= ry + rh) {
      minT = t
      best = { x: rx, y: iy }
    }
  }
  // Right edge
  if (dx !== 0) {
    const t = (rx + rw - fromX) / dx
    const iy = fromY + t * dy
    if (t > 0 && t < minT && iy >= ry && iy <= ry + rh) {
      minT = t
      best = { x: rx + rw, y: iy }
    }
  }

  return best || { x: fromX, y: fromY }
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false, // Include the reverse prop
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId()
  const [pathD, setPathD] = useState("")
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })

  // Calculate the gradient coordinates based on the reverse prop
  const gradientCoordinates = reverse
    ? {
        x1: ["90%", "-10%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["10%", "110%"],
        x2: ["0%", "100%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const rectA = fromRef.current.getBoundingClientRect()
        const rectB = toRef.current.getBoundingClientRect()

        const svgWidth = containerRect.width
        const svgHeight = containerRect.height
        setSvgDimensions({ width: svgWidth, height: svgHeight })

        // Center of each node (relative to container)
        const centerAX = rectA.left - containerRect.left + rectA.width / 2
        const centerAY = rectA.top - containerRect.top + rectA.height / 2
        const centerBX = rectB.left - containerRect.left + rectB.width / 2
        const centerBY = rectB.top - containerRect.top + rectB.height / 2

        // Rectangle bounds relative to container
        const aLeft = rectA.left - containerRect.left
        const aTop = rectA.top - containerRect.top
        const bLeft = rectB.left - containerRect.left
        const bTop = rectB.top - containerRect.top

        // Compute edge intersection — line exits "from" node heading toward "to" center
        const fromEdge = borderIntersection(
          centerAX, centerAY,
          centerBX, centerBY,
          aLeft, aTop, rectA.width, rectA.height,
        )
        // Line exits "to" node heading toward "from" center
        const toEdge = borderIntersection(
          centerBX, centerBY,
          centerAX, centerAY,
          bLeft, bTop, rectB.width, rectB.height,
        )

        // Apply offsets (small tweaks) on top of edge points
        const startX = fromEdge.x + startXOffset
        const startY = fromEdge.y + startYOffset
        const endX = toEdge.x + endXOffset
        const endY = toEdge.y + endYOffset

        const controlY = (startY + endY) / 2 - curvature
        const d = `M ${startX},${startY} Q ${
          (startX + endX) / 2
        },${controlY} ${endX},${endY}`
        setPathD(d)
      }
    }

    // Initialize ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      updatePath()
    })

    // Observe the container element
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // Call the updatePath initially to set the initial path
    updatePath()

    // Clean up the observer on component unmount
    return () => {
      resizeObserver.disconnect()
    }
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ])

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute top-0 left-0 transform-gpu stroke-2",
        className
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits={"userSpaceOnUse"}
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1], // https://easings.net/#easeOutExpo
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  )
}
