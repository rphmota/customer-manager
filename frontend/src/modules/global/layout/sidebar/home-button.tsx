import { Box, Button, chakra, Icon } from '@chakra-ui/react'
import { FaHome } from 'react-icons/fa'

interface LogoutButtonProps {
  onClick: () => void
  isOpen: boolean
  title: string
}

export function HomeButton({ title, onClick, isOpen }: LogoutButtonProps) {
  return (
    <Box pb="14px" border={0}>
      <Button
        onClick={onClick}
        bg="green.700"
        color="white"
        borderRadius={8}
        _hover={{ backgroundColor: 'green.800' }}
        justifyContent="center"
        p={3}
        fontSize="sm"
        fontWeight="normal"
        width="100%"
      >
        <Icon as={FaHome} />
        <chakra.div
          flex="1"
          textAlign="left"
          mx={3}
          display={isOpen ? 'initial' : 'none'}
        >
          {title}
        </chakra.div>
      </Button>
    </Box>
  )
}
