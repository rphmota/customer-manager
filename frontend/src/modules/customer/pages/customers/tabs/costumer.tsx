import { useEffect, useState } from 'react'
import {
  Flex,
  Heading,
  Button,
  Select,
  Box,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { Card } from '../components/card'
import { ModalAddCustomer } from '../components/modal-add-customer'
import { ModalDeleteCustomer } from '../components/modal-delete-customer'
import { ModalEditCustomer } from '../components/modal-edit-curtomer'
import { ICustomer } from '../../../types/ICostumer'
import { api } from '../../../../global/api/api'

type CustomerProps = {
  onSelectCliente: (cliente: ICustomer) => void
}

export const Customer = ({ onSelectCliente }: CustomerProps) => {
  const [clientes, setClientes] = useState<ICustomer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [clientesPorPagina, setClientesPorPagina] = useState(16)
  const [paginaAtual, setPaginaAtual] = useState(1)

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [clienteSelecionado, setClienteSelecionado] =
    useState<ICustomer | null>(null)

  const fetchClientes = async () => {
    try {
      setLoading(true)
      const response = await api.get<ICustomer[]>('/customers')
      setClientes(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      setError('Erro ao carregar clientes.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClientes()
  }, [])

  const handleClientesPorPaginaChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setClientesPorPagina(Number(event.target.value))
    setPaginaAtual(1)
  }

  const indexInicial = (paginaAtual - 1) * clientesPorPagina
  const clientesExibidos = Array.isArray(clientes)
    ? clientes.slice(indexInicial, indexInicial + clientesPorPagina)
    : []

  const totalPaginas = Math.ceil(clientes.length / clientesPorPagina)
  const handlePageChange = (page: number) => setPaginaAtual(page)

  const handleEditClick = (cliente: ICustomer) => {
    setClienteSelecionado(cliente)
    setIsEditModalOpen(true)
  }

  const handleDeleteClick = (cliente: ICustomer) => {
    setClienteSelecionado(cliente)
    setIsDeleteModalOpen(true)
  }

  if (loading) {
    return <Spinner size="xl" />
  }

  if (error) {
    return <Text color="red.500">{error}</Text>
  }

  return (
    <Box p={5}>
      <Heading as="h2" size="md" mb={4}>
        <Flex justify="space-between" align="center" mb={5}>
          <p>
            Clientes encontrados: <strong>{clientes.length}</strong>
          </p>
          <Flex gap={2} alignItems="center">
            <p>Clientes por página: </p>
            <Select
              maxW="120px"
              value={clientesPorPagina}
              onChange={handleClientesPorPaginaChange}
              placeholder="Clientes por página"
            >
              {[8, 16, 24, 32].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </Select>
          </Flex>
        </Flex>
      </Heading>

      <Flex
        gap={{ base: 5, md: 10 }}
        direction={{ base: 'column', md: 'row' }}
        wrap="wrap"
        justifyContent="center"
        align="stretch"
      >
        {clientesExibidos.map((cliente) => (
          <Card
            key={cliente.id}
            id={cliente.id}
            name={cliente.name}
            salary={cliente.salary}
            company_price={cliente.company_price}
            onDelete={() => handleDeleteClick(cliente)}
            onEdit={() => handleEditClick(cliente)}
            onSelect={() => onSelectCliente(cliente)}
          />
        ))}
      </Flex>

      <Flex justify="center" mt={8}>
        <Button
          colorScheme="orange"
          variant="outline"
          size="md"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Criar cliente
        </Button>
      </Flex>

      <Flex justify="center" mt={8} gap={2}>
        {[...Array(totalPaginas)].map((_, index) => (
          <Button
            key={index}
            size="sm"
            variant={paginaAtual === index + 1 ? 'solid' : 'outline'}
            colorScheme="orange"
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </Flex>

      <ModalAddCustomer
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {clienteSelecionado && (
        <ModalDeleteCustomer
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          clienteId={clienteSelecionado.id}
          clienteNome={clienteSelecionado.name}
        />
      )}

      {clienteSelecionado && (
        <ModalEditCustomer
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          cliente={clienteSelecionado}
        />
      )}
    </Box>
  )
}
