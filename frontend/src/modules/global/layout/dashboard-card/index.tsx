import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
} from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

interface DashboardCardProps {
  icon: any
  iconBackground?: any
  title: string
  value?: number
  description: string
  path: string
  onClick?: () => void
}

export function DashboardCard({
  icon,
  iconBackground = 'linear(green.700, green.900)',
  title,
  value,
  description,
  path,
  onClick,
}: DashboardCardProps) {
  return (
    <Flex
      as={ReactRouterLink}
      to={path}
      h={152}
      justify="flex-end"
      w={302}
      direction="column"
      position="relative"
      _hover={{ transform: 'scale(1.02)' }}
      _active={{ transform: 'scale(1)', filter: 'brightness(0.9)' }}
      transition="all .2s ease-in-out"
      onClick={onClick}
    >
      <Card position="initial" borderRadius={12} h={134} shadow="md">
        <CardHeader
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          h={79}
          p="18px 15px"
        >
          <Center
            bgGradient={iconBackground}
            position="absolute"
            top={0}
            w="16"
            h="16"
            borderRadius={12}
          >
            <Icon as={icon} color="white" />
          </Center>
          <Flex
            direction="column"
            align="flex-end"
            justify="flex-start"
            w="100%"
            h="100%"
          >
            <Heading color="gray.700" fontWeight="bold" fontSize="xl">
              {title}
            </Heading>
            {value && (
              <Text
                color="gray.600"
                fontSize="2xl"
                lineHeight={8}
                fontWeight="bold"
              >
                {value}
              </Text>
            )}
          </Flex>
        </CardHeader>
        <Divider color="gray.300" border="1px" />
        <CardBody
          as={Flex}
          px="15px"
          h={55}
          fontSize="sm"
          lineHeight={1}
          color="#7D7D7D"
          fontWeight="medium"
          overflow="hidden"
          alignItems="center"
          justifyContent="center"
        >
          {description}
        </CardBody>
      </Card>
    </Flex>
  )
}
