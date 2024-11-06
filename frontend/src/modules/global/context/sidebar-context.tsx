import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

interface SidebarContextProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  toggle(): void
}

export const SidebarContext = createContext<SidebarContextProps>(
  {} as SidebarContextProps,
)

interface SidebarStorageProps {
  children: ReactNode
}

export const SidebarProvider = ({ children }: SidebarStorageProps) => {
  const [isOpen, setIsOpen] = useState(true)

  function toggle() {
    setIsOpen(!isOpen)
  }
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext)
