import { Box, Flex, Heading, Text, IconButton } from '@chakra-ui/react'
import { FaPlus, FaTrashAlt, FaPen, FaMinus } from 'react-icons/fa'
import { ICustomer } from '../../../types/ICostumer'

type CardProps = {
  id: ICustomer['id']
  name: ICustomer['name']
  salary: ICustomer['salary']
  company_price: ICustomer['company_price']
  onDelete: () => void
  onEdit: () => void
  onSelect: () => void
  isSelected?: boolean
}

export function Card({
  name,
  salary,
  company_price,
  onDelete,
  onEdit,
  onSelect,
  isSelected,
}: CardProps) {
  return (
    <Flex
      shadow="md"
      border="1px solid #ddd"
      borderRadius="md"
      width="300px"
      minHeight="180px"
      direction="column"
      bg="#ffffff"
      color="black"
      p={4}
      justifyContent="space-between"
      align="center"
    >
      <Heading size="md" fontWeight="bold" textAlign="center">
        {name}
      </Heading>

      <Box textAlign="center" mt={2}>
        <Text fontSize="md">
          Salário: R$
          {salary != null
            ? salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
            : '0,00'}
        </Text>
        <Text fontSize="md">
          Empresa: R$
          {Number(company_price).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </Box>

      <Flex mt={4} justify="space-around" width="100%">
        {isSelected ? (
          <IconButton
            icon={<FaMinus />}
            aria-label="Remover"
            fontSize="lg"
            variant="ghost"
            color="red.500"
            onClick={onSelect}
          />
        ) : (
          <>
            <IconButton
              icon={<FaPlus />}
              aria-label="Adicionar"
              fontSize="lg"
              variant="ghost"
              onClick={onSelect}
            />
            <IconButton
              icon={<FaPen />}
              aria-label="Editar"
              fontSize="lg"
              variant="ghost"
              onClick={onEdit}
            />
            <IconButton
              icon={<FaTrashAlt />}
              aria-label="Excluir"
              fontSize="lg"
              variant="ghost"
              color="red.500"
              onClick={onDelete}
            />
          </>
        )}
      </Flex>
    </Flex>
  )
}
