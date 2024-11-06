import { Center, Text } from '@chakra-ui/react'
interface SidebarTitleProps {
  title: string | undefined
}
export function SidebarTitle({ title }: SidebarTitleProps) {
  return (
    <Center
      position="relative"
      w="100%"
      _before={{
        content: '""',
        position: 'absolute',
        height: '2%',
        width: '100%',
        top: 0,
        left: 0,
        background: 'radial-gradient(circle, lightgray, #276749)',
      }}
      _after={{
        content: '""',
        position: 'absolute',
        height: '2%',
        width: '100%',
        bottom: 0,
        left: 0,
        background: 'radial-gradient(circle, lightgray, #276749)',
      }}
    >
      <Text
        color="white"
        fontWeight="bold"
        my={4}
        whiteSpace={'pre-line'}
        textAlign={'center'}
      >
        {title?.toUpperCase()}
      </Text>
    </Center>
  )
}
