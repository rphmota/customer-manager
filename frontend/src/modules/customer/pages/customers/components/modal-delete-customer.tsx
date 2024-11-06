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
} from '@chakra-ui/react'

interface ModalDeleteCustomerProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  clienteNome: string
}

export function ModalDeleteCustomer({
  isOpen,
  onClose,
  onConfirm,
  clienteNome,
}: ModalDeleteCustomerProps) {
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
          <Button onClick={onConfirm} colorScheme="orange" width="100%">
            Excluir cliente
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
