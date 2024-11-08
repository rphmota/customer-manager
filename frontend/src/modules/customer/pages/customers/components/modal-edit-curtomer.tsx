import { useEffect, useState } from 'react'
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
  name: z.string().min(1, 'Nome é obrigatório'),
  salary: z.number().positive('Salário deve ser um número positivo'),
  company_price: z
    .number()
    .positive('Valor da company_price deve ser um número positivo'),
})

interface ModalEditCustomerProps {
  isOpen: boolean
  onClose: () => void
  cliente: {
    id: number
    name: string
    salary: number
    company_price: number
  }
}

export function ModalEditCustomer({
  isOpen,
  onClose,
  cliente,
}: ModalEditCustomerProps) {
  const toast = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    salary: '',
    company_price: '',
  })

  useEffect(() => {
    if (cliente) {
      setFormData({
        name: cliente.name,
        salary: cliente.salary.toFixed(2),
        company_price: cliente.company_price.toFixed(2),
      })
    }
  }, [cliente])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      const validatedData = customerSchema.parse({
        name: formData.name,
        salary: parseFloat(formData.salary),
        company_price: parseFloat(formData.company_price),
      })

      setIsSubmitting(true)
      await api.post(`/customers`, {
        id: cliente.id,
        ...validatedData,
      })

      toast({
        title: 'Cliente atualizado!',
        description: 'As informações do cliente foram atualizadas com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      onClose()

      setTimeout(() => {
        window.location.href = '/home'
      }, 2000)
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
          title: 'Erro ao atualizar cliente.',
          description: 'Ocorreu um erro ao atualizar o cliente.',
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
        <ModalHeader>Editar cliente:</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Nome:</FormLabel>
            <Input
              placeholder="Digite o nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Salário:</FormLabel>
            <Input
              placeholder="Digite o salário"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Valor da company_price:</FormLabel>
            <Input
              placeholder="Digite o valor da company_price"
              name="company_price"
              type="number"
              value={formData.company_price}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={handleSubmit}
            colorScheme="orange"
            isLoading={isSubmitting}
            loadingText="Salvando..."
            width="100%"
          >
            Editar cliente
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
