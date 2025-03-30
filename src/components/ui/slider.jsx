"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

const Slider = React.forwardRef(
  ({ className, min = 0, max = 100, step = 1, value = [0], onValueChange, ...props }, ref) => {
    const [values, setValues] = React.useState(value)

    React.useEffect(() => {
      setValues(value)
    }, [value])

    const handleChange = (index, newValue) => {
      const newValues = [...values]
      newValues[index] = Math.max(min, Math.min(max, newValue))
      setValues(newValues)

      if (onValueChange) {
        onValueChange(newValues)
      }
    }

    return (
      <div ref={ref} className={cn("relative flex w-full touch-none select-none items-center", className)} {...props}>
        <div className="relative w-full h-2 bg-secondary rounded-full">
          <div
            className="absolute h-full bg-primary rounded-full"
            style={{
              left: `${((values[0] - min) / (max - min)) * 100}%`,
              right: values[1] !== undefined ? `${100 - ((values[1] - min) / (max - min)) * 100}%` : "0%",
            }}
          />
          {values.map((value, index) => (
            <div
              key={index}
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-primary border-2 border-background cursor-pointer"
              style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 10px)` }}
              onMouseDown={(e) => {
                e.preventDefault()

                const slider = e.currentTarget.parentElement
                const rect = slider.getBoundingClientRect()

                const handleMouseMove = (moveEvent) => {
                  const newPct = (moveEvent.clientX - rect.left) / rect.width
                  const newValue = min + Math.round(((max - min) * newPct) / step) * step
                  handleChange(index, newValue)
                }

                const handleMouseUp = () => {
                  document.removeEventListener("mousemove", handleMouseMove)
                  document.removeEventListener("mouseup", handleMouseUp)
                }

                document.addEventListener("mousemove", handleMouseMove)
                document.addEventListener("mouseup", handleMouseUp)
              }}
            />
          ))}
        </div>
      </div>
    )
  },
)
Slider.displayName = "Slider"

export { Slider }

