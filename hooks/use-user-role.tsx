"use client"

import * as React from "react"

export type UserRole = "Free" | "NGO" | "Government"

interface RoleContextType {
  role: UserRole
  setRole: (role: UserRole) => void
  isLoading: boolean
}

const RoleContext = React.createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = React.useState<UserRole>("Free")
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const savedRole = localStorage.getItem("medvfy_role") as UserRole
    if (savedRole) {
      setRoleState(savedRole)
    }
    setIsLoading(false)
  }, [])

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole)
    localStorage.setItem("medvfy_role", newRole)
  }

  return (
    <RoleContext.Provider value={{ role, setRole, isLoading }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useUserRole() {
  const context = React.useContext(RoleContext)
  if (context === undefined) {
    throw new Error("useUserRole must be used within a RoleProvider")
  }
  return context
}
