// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface UserContextType {
  nome: string
  setNome: (nome: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [nome, setNome] = useState('')

  return (
    <UserContext.Provider value={{ nome, setNome }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
