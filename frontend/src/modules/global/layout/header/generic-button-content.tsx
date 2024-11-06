import React from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
} from '@chakra-ui/react'

interface GenericButtonContentProps {
  icon: any
  customContent: React.ReactNode
}

export const GenericButtonContent: React.FC<GenericButtonContentProps> = ({
  icon,
  customContent,
}) => {
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <IconButton
          aria-label="botao"
          size="sm"
          icon={icon}
          backgroundColor={'white'}
          color={'#808b9abf'}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton color={'#fff'} />
        <PopoverBody
          padding={0}
          paddingInlineEnd={0}
          paddingInlineStart={0}
          borderRadius={12}
          shadow="md"
        >
          {customContent}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
