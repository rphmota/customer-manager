import { Center, Image } from '@chakra-ui/react'
import LogoCetic from '../../assets/logo-cetic.png'

export function Footer() {
  return (
    <Center pb={9}>
      <Image src={LogoCetic} width={'80px'} align="center" alt="logo" />
    </Center>
  )
}
