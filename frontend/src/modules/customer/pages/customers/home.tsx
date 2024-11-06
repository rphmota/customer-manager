import { Page } from '../../../global/layout/page.tsx'
import { Breadcrumb } from '../../../global/layout/breadcrumbs.tsx'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { Customer } from './tabs/costumer.tsx'
import { SelectedCustomers } from './tabs/selected-costumers.tsx'
import { useState } from 'react'
import { ICustomer } from '../../types/ICostumer.ts'

const breadcrumbs: Breadcrumb[] = [
  {
    label: 'Dashboard clientes',
    link: '/',
  },
  {
    label: 'Listagem de clientes',
    link: '#',
  },
]

export default function Home() {
  const [clientesSelecionados, setClientesSelecionados] = useState<ICustomer[]>(
    [],
  )

  const handleSelectCliente = (cliente: ICustomer) => {
    setClientesSelecionados((prev) => {
      if (!prev.some((c) => c.id === cliente.id)) {
        return [...prev, cliente]
      }
      return prev
    })
  }

  const handleDeselectCliente = (clienteId: number) => {
    setClientesSelecionados((prev) =>
      prev.filter((cliente) => cliente.id !== clienteId),
    )
  }

  const handleClearSelection = () => {
    setClientesSelecionados([])
  }

  return (
    <Page breadcrumbs={breadcrumbs}>
      <Tabs colorScheme="green">
        <TabList>
          <Tab>Clientes</Tab>
          <Tab>Clientes Selecionados</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Customer onSelectCliente={handleSelectCliente} />
          </TabPanel>
          <TabPanel>
            <SelectedCustomers
              clientesSelecionados={clientesSelecionados}
              onDeselectCliente={handleDeselectCliente}
              onClearSelection={handleClearSelection}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Page>
  )
}
