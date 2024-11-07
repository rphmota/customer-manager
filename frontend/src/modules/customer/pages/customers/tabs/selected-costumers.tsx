import { Box, Heading, Flex, Button } from '@chakra-ui/react'
import { Card } from '../components/card'
import { ICustomer } from '../../../types/ICostumer'

type SelectedCustomersProps = {
  clientesSelecionados: ICustomer[]
  onDeselectCliente: (clienteId: number) => void
  onClearSelection: () => void
}

export const SelectedCustomers = ({
  clientesSelecionados,
  onDeselectCliente,
  onClearSelection,
}: SelectedCustomersProps) => {
  return (
    <Box p={5}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h2" size="md">
          Clientes Selecionados: {clientesSelecionados.length}
        </Heading>

        <Button
          colorScheme="orange"
          variant="outline"
          size="md"
          onClick={onClearSelection}
        >
          Limpar Seleção
        </Button>
      </Flex>

      <Flex
        gap={{ base: 5, md: 10 }}
        direction={{ base: 'column', md: 'row' }}
        wrap="wrap"
        justifyContent="center"
        align="stretch"
      >
        {clientesSelecionados.map((cliente) => (
          <Card
            key={cliente.id}
            id={cliente.id}
            name={cliente.name}
            salary={cliente.salary}
            company_price={cliente.company_price}
            onDelete={() => {}}
            onEdit={() => {}}
            onSelect={() => onDeselectCliente(cliente.id)}
            isSelected={true}
          />
        ))}
      </Flex>
    </Box>
  )
}
