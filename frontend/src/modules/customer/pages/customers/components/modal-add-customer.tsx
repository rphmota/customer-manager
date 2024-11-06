import { useState } from 'react'
import {
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { z } from 'zod'
import { api } from '../../../../global/api/api'

const customerSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  salario: z.number().positive('Salário deve ser um número positivo'),
  empresa: z.number().positive('Valor da empresa deve ser um número positivo'),
})

export function ModalAddCustomer({ isOpen, onClose }) {
  const toast = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    salario: '',
    empresa: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      const validatedData = customerSchema.parse({
        nome: formData.nome,
        salario: parseFloat(formData.salario),
        empresa: parseFloat(formData.empresa),
      })

      setIsSubmitting(true)
      await api.post('/clientes', validatedData)

      toast({
        title: 'Cliente criado!',
        description: 'O cliente foi criado com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      onClose()
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Erro de validação.',
          description: error.errors.map((err) => err.message).join(', '),
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Erro ao criar cliente.',
          description: 'Ocorreu um erro ao criar o cliente.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar cliente:</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Digite o nome:</FormLabel>
            <Input
              placeholder="Digite o nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Digite o salário:</FormLabel>
            <Input
              placeholder="Digite o salário"
              name="salario"
              type="number"
              value={formData.salario}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Digite o valor da empresa:</FormLabel>
            <Input
              placeholder="Digite o valor da empresa"
              name="empresa"
              type="number"
              value={formData.empresa}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={handleSubmit}
            colorScheme="orange"
            isLoading={isSubmitting}
            loadingText="Criando cliente..."
            width="100%"
          >
            Criar cliente
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
