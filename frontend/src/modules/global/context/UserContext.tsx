// UserContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react'

interface UserContextType {
  name: string
  setNome: (name: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [name, setNome] = useState('')

  return (
    <UserContext.Provider value={{ name, setNome }}>
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
