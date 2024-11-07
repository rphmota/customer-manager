import { Box, Center, Flex, Text, Button } from '@chakra-ui/react'

interface UserProfileProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userProfileData: Record<string, any>
}

export const UserProfile: React.FC<UserProfileProps> = ({
  userProfileData,
}) => {
  const handleLogout = () => {
    console.log('saiu')
  }

  return (
    <Box borderRadius="md">
      <Center
        background={'#363636'}
        color={'#fff'}
        height={140}
        p={2}
        borderTopRadius={8}
      >
        <Flex direction="column" alignItems="center" p={6}>
          <Text mt={2} fontWeight="bold" fontSize="lg">
            Olá {userProfileData.name || 'Usuário'}
          </Text>
        </Flex>
      </Center>
      <Center mt={1} height={20} p={4}>
        <Box width="100%">
          <Button mt={4} colorScheme="red" onClick={handleLogout}>
            Sair
          </Button>
        </Box>
      </Center>
    </Box>
  )
}
