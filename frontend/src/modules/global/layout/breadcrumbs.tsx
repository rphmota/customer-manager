import BoxContent from './box-content'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  FlexProps,
} from '@chakra-ui/react'
import { HiMiniChevronRight } from 'react-icons/hi2'
import { IoHome } from 'react-icons/io5'
import { Link } from 'react-router-dom'

export type Breadcrumb = {
  label: string
  link: string
}

interface PageProps extends FlexProps {
  breadcrumbs: Breadcrumb[]
}

export function Breadcrumbs({ breadcrumbs = [], ...rest }: PageProps) {
  return (
    <Flex
      padding={2}
      background="#fff"
      borderRadius={10}
      {...rest}
      boxShadow="0px 5px 14px 0px #0000000D"
      maxWidth="max-content"
    >
      <Breadcrumb
        spacing="4px"
        separator={<HiMiniChevronRight color="#667085" />}
        fontSize="12px"
        fontWeight="600"
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            <IoHome color="#667085" size={14} />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.slice(0, breadcrumbs.length - 1).map((bread) => (
          <BreadcrumbItem key={bread.link} color="#667085">
            <BreadcrumbLink as={Link} to={bread.link}>
              {bread.label.toUpperCase()}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}

        {breadcrumbs.slice(-1).map((bread) => (
          <BreadcrumbItem key={bread.link} isCurrentPage color="#667085">
            <BreadcrumbLink href="#">
              {bread.label.toUpperCase()}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </Flex>
  )
}

export default BoxContent
