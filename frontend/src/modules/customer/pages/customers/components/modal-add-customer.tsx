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
  ModalProps,
} from '@chakra-ui/react'
import { z } from 'zod'
import { api } from '../../../../global/api/api'

const customerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  salary: z.number().positive('Salário deve ser um número positivo'),
  company_price: z
    .number()
    .positive('Valor da empresa deve ser um número positivo'),
})

export function ModalAddCustomer({
  isOpen,
  onClose,
}: Omit<ModalProps, 'children'>) {
  const toast = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    salary: '',
    company_price: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      // Validação e conversão dos dados
      const validatedData = customerSchema.parse({
        name: formData.name,
        salary: parseFloat(formData.salary),
        company_price: parseFloat(formData.company_price),
      })

      setIsSubmitting(true)
      await api.post('/customers', validatedData)

      toast({
        title: 'Cliente criado!',
        description: 'O cliente foi criado com sucesso recarregando pagina...',
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
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Digite o salário:</FormLabel>
            <Input
              placeholder="Digite o salário"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Digite o valor da empresa:</FormLabel>
            <Input
              placeholder="Digite o valor da empresa"
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
