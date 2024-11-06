import { As, Box, Button, chakra, Icon } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
interface MenuButtonProps {
  icon: As
  title: string
  path: string
  isOpen: boolean
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  title,
  icon,
  path,
  isOpen,
}) => {
  const navigate = useNavigate()
  const handleRedirect = () => {
    return navigate(path)
  }
  return (
    <Box pb="14px" border={0}>
      <Button
        bg="green.700"
        color="white"
        borderRadius={8}
        _hover={{ backgroundColor: 'green.800' }}
        justifyContent="center"
        p={3}
        fontSize="sm"
        fontWeight="normal"
        width="100%"
        onClick={handleRedirect}
      >
        <Icon as={icon} />
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
