// LoginPage.tsx
import { useState } from 'react'
import { Box, Button, Input, Heading, Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
  const [nome, setNome] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (nome.trim()) {
      navigate('/home')
    }
  }

  return (
    <Flex align="center" justify="center" height="100vh" bg="gray.50">
      <Box textAlign="center" p={6} bg="white" borderRadius="md" boxShadow="md">
        <Heading as="h1" size="lg" mb={4}>
          Olá, seja bem-vindo!
        </Heading>
        <Input
          placeholder="Digite o seu nome:"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          mb={4}
        />
        <Button
          colorScheme="orange"
          size="md"
          onClick={handleLogin}
          width="100%"
        >
          Entrar
        </Button>
      </Box>
    </Flex>
  )
}
