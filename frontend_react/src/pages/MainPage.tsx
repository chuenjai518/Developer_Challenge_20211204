import React from 'react'
import { Container, Flex } from '@chakra-ui/react'

import { Content } from '../components/Content'
import { SideNav } from '../components/Nav'

interface MainPageProps {}

export const MainPage: React.FC<MainPageProps> = () => {
  return (
    <Container maxW="full" p={0}>
      <Flex w="full" h="100vh" flexDirection={{ md: 'row', base: 'column' }}>
        <SideNav />
        <Content />
      </Flex>
    </Container>
  )
}
