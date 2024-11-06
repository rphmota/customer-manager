import { AccordionPanel, Text, chakra } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { ReactNode } from 'react'

interface ItemMenuProps {
  icon: ReactNode
  title: string
  path: string
}

export function ItemMenu({ title, path, icon }: ItemMenuProps) {
  return (
    <AccordionPanel
      fontSize="sm"
      lineHeight={4}
      opacity="0.92"
      textAlign="center"
      color="white"
      p={0}
      mx={3}
      borderRadius="8px"
      transition="all .2s"
      _hover={{ backgroundColor: 'green.800' }}
    >
      <Link to={path} style={{ textDecoration: 'none' }}>
        <chakra.div
          flex="1"
          display="flex"
          alignItems="center"
          style={{ margin: '2px' }}
          marginLeft={10}
          color="white"
        >
          {icon}

          <Text
            color="white"
            p={2}
            borderRadius="8px"
            _hover={{
              color: 'white',
            }}
          >
            {title}
          </Text>
        </chakra.div>
      </Link>
    </AccordionPanel>
  )
}
