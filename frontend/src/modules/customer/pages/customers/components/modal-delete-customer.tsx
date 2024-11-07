import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react'
import { api } from '../../../../global/api/api'
import { useState } from 'react'

interface ModalDeleteCustomerProps {
  isOpen: boolean
  onClose: () => void
  clienteId: number
  clienteNome: string
}

export function ModalDeleteCustomer({
  isOpen,
  onClose,
  clienteId,
  clienteNome,
}: ModalDeleteCustomerProps) {
  const toast = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDelete = async () => {
    try {
      setIsSubmitting(true)
      await api.delete(`/customers/${clienteId}`)

      toast({
        title: 'Cliente excluído!',
        description: 'O cliente foi excluído com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      onClose()

      setTimeout(() => {
        window.location.href = '/home'
      }, 2000)
    } catch (error) {
      toast({
        title: 'Erro ao excluir cliente.',
        description: 'Ocorreu um erro ao tentar excluir o cliente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Excluir cliente:</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Você está prestes a excluir o cliente:{' '}
            <strong>{clienteNome}</strong>
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleDelete}
            colorScheme="orange"
            isLoading={isSubmitting}
            loadingText="Excluindo..."
            width="100%"
          >
            Excluir cliente
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
