import { Outlet } from 'react-router-dom'
import { Header } from './header'
import { Flex } from '@chakra-ui/react'

import { Sidebar } from './sidebar'
import { SidebarProvider } from '../context/sidebar-context'

export function PrivadoLayout() {
  return (
    <Flex gap={5} minHeight="calc(100vh)" p={5} w="100%">
      <SidebarProvider>
        <Sidebar />
        <Flex direction="column" w="100%" gap={8}>
          <Header />
          <Outlet />
        </Flex>
      </SidebarProvider>
    </Flex>
  )
}
