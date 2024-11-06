import { useMediaQuery, Flex, FlexProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface BoxContentProps extends FlexProps {
  children: ReactNode
}

function BoxContent({ children, ...rest }: BoxContentProps) {
  const [menorQue400] = useMediaQuery('(max-width: 400px)')

  return (
    <Flex
      direction="column"
      maxHeight="calc(100vh - 216px)"
      minHeight="calc(100vh - 216px)"
      maxWidth="calc(100vw - 160px)"
      borderRadius={10}
      p={{ base: '8px', sm: '8px', md: '8px', lg: '24px' }}
      overflowY="scroll"
      overflowX="scroll"
      bg="#fff"
      boxShadow="0px 5px 14px 0px #0000000D"
      sx={{
        '&::-webkit-scrollbar': {
          width: menorQue400 ? '0px' : '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#ccc',
          borderRadius: '24px',
        },
      }}
      {...rest}
    >
      {children}
    </Flex>
  )
}

export default BoxContent
