import { Accordion } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface DropdownMenuProps {
  children: ReactNode
  isOpen?: boolean
}

export function DropdownMenu({ children, isOpen }: DropdownMenuProps) {
  return (
    <Accordion
      allowToggle
      bg="green.700"
      transition="all .2s"
      w={isOpen ? '218px' : '77px'}
      borderRadius={8}
    >
      {children}
    </Accordion>
  )
}
