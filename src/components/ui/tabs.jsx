"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

const Tabs = React.forwardRef(({ className, defaultValue, ...props }, ref) => {
  const [value, setValue] = React.useState(defaultValue)

  return (
    <div
      ref={ref}
      className={cn("", className)}
      {...props}
      data-value={value}
      data-state={value ? "active" : "inactive"}
    >
      {React.Children.map(props.children, (child) => {
        if (!React.isValidElement(child)) return child

        return React.cloneElement(child, {
          value,
          onValueChange: setValue,
        })
      })}
    </div>
  )
})
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef(({ className, value, onValueChange, ...props }, ref) => {
  const tabsContext = React.useContext(TabsContext)
  const isActive = tabsContext?.value === value

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive ? "bg-background text-foreground shadow-sm" : "hover:bg-muted hover:text-muted-foreground",
        className,
      )}
      onClick={() => tabsContext?.onValueChange(value)}
      data-state={isActive ? "active" : "inactive"}
      {...props}
    />
  )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef(({ className, value, ...props }, ref) => {
  const tabsContext = React.useContext(TabsContext)
  const isActive = tabsContext?.value === value

  if (!isActive) return null

  return (
    <div
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      data-state={isActive ? "active" : "inactive"}
      {...props}
    />
  )
})
TabsContent.displayName = "TabsContent"

const TabsContext = React.createContext(null)

export { Tabs, TabsList, TabsTrigger, TabsContent }

