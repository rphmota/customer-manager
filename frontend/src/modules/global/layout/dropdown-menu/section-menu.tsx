import {
  AccordionItem,
  AccordionButton,
  chakra,
  AccordionIcon,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface SectionMenuProps {
  icon: ReactNode
  title: string
  children: ReactNode
  isOpen?: boolean
}

export function SectionMenu({
  title,
  children,
  icon,
  isOpen = true,
}: SectionMenuProps) {
  return (
    <AccordionItem pb="14px" border={0}>
      <AccordionButton
        bg="green.700"
        color="white"
        borderRadius={8}
        _hover={{ backgroundColor: 'green.800' }}
        justifyContent="center"
        p={3}
        fontSize="sm"
        fontWeight="normal"
      >
        {icon}
        <chakra.div
          flex="1"
          textAlign="left"
          mx={3}
          display={isOpen ? 'initial' : 'none'}
        >
          {title}
        </chakra.div>
        <AccordionIcon display={isOpen ? 'initial' : 'none'} />
      </AccordionButton>
      {children}
    </AccordionItem>
  )
}
