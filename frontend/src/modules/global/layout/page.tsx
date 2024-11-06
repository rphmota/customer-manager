import { ReactNode } from 'react'
import BoxContent from './box-content'
import { Breadcrumb, Breadcrumbs } from './breadcrumbs'
import { Flex } from '@chakra-ui/react'

interface PageProps {
  children: ReactNode
  breadcrumbs: Breadcrumb[]
}

export function Page({ children, breadcrumbs }: PageProps) {
  return (
    <Flex direction="column" gap={8}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <BoxContent>{children}</BoxContent>
    </Flex>
  )
}

export default BoxContent
