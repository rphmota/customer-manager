import { Box, Flex, Img, useMediaQuery } from '@chakra-ui/react'
import Logo from '../../assets/logo.svg'

import { LogoutButton } from './logout-button'
import { DropdownMenu } from '../dropdown-menu'
import { useSidebar } from '../../context/sidebar-context'
import { HomeButton } from './home-button'
import { CustomerButton } from './customer-button'
import { ProductButton } from './product-button'
import { useNavigate } from 'react-router-dom'

export function Sidebar() {
  const { isOpen } = useSidebar()
  const [maiorQue1000] = useMediaQuery('(min-width: 1200px)')
  const navigate = useNavigate()

  const handleClickCustomer = () => {
    navigate('/customer')
  }

  return (
    <Flex
      direction="column"
      align="center"
      gap="32px"
      bg="green.700"
      borderRadius={10}
      p="24px 11px 32px"
      transition="all .2s"
      w={isOpen && maiorQue1000 ? '280px' : '77px'}
      justify="space-between"
    >
      <Flex w="100%" direction="column" align="center">
        {isOpen && maiorQue1000 ? (
          <>
            <Box>
              <Img src={Logo} w="150px" />
            </Box>
          </>
        ) : (
          <Box>
            <Img src={Logo} w="40px" />
          </Box>
        )}

        <Flex mt={8}>
          <DropdownMenu isOpen={isOpen && maiorQue1000}>
            <HomeButton
              title="Início"
              onClick={() => console.log('click')}
              isOpen={isOpen && maiorQue1000}
            />
            <CustomerButton
              title="Clientes"
              onClick={handleClickCustomer}
              isOpen={isOpen && maiorQue1000}
            />
            <ProductButton
              title="Produtos"
              onClick={() => console.log('click')}
              isOpen={isOpen && maiorQue1000}
            />

            <LogoutButton
              onClick={() => console.log('apertou')}
              title="Sair"
              isOpen={isOpen && maiorQue1000}
            />
          </DropdownMenu>
        </Flex>
      </Flex>
    </Flex>
  )
}
