import { Center, Flex, Icon, Img } from '@chakra-ui/react'

import { FaUser, FaBars } from 'react-icons/fa6'
import { GenericButtonContent } from './generic-button-content'
import { UserProfile } from './profile-herader-menu'
import { useSidebar } from '../../context/sidebar-context'
import Logo from '../../assets/logo.svg'

export function Header() {
  const { toggle } = useSidebar()

  const getProfileSession = sessionStorage.getItem('seg.usuario')
  const profileData = getProfileSession ? JSON.parse(getProfileSession) : {}

  const userProfileData = {
    name: profileData.nome,
  }

  return (
    <Flex w="100%" h="77px" bg="white" borderRadius={10} shadow="lg">
      <Center w="115px" borderRight="1px solid" borderColor="gray.200">
        <Flex
          borderRadius={4}
          transition="all .2s"
          _hover={{ cursor: 'pointer', bgColor: 'gray.100' }}
          onClick={toggle}
        >
          <Icon as={FaBars} />
        </Flex>
      </Center>
      <Center
        px="65px"
        fontWeight="bold"
        color="gray.600"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <Img src={Logo} h="48px" w="100px" />
      </Center>
      <Flex flex={1} justify="flex-end" align="center" gap="10px" px={45}>
        <GenericButtonContent
          icon={<FaUser size={18} />}
          customContent={<UserProfile userProfileData={userProfileData} />}
        />
      </Flex>
    </Flex>
  )
}
