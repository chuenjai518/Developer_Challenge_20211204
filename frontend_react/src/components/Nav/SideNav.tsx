import React, { useCallback, useState } from 'react'
import { Container, Flex, VStack, HStack, Heading, Icon, Avatar, Collapse, useBreakpointValue } from '@chakra-ui/react'

import { SideNavItem } from './SideNavItem'
import { MdOutlineExplore } from 'react-icons/md'
import { BsBook, BsBookmark, BsSun } from 'react-icons/bs'
import { FiTwitter, FiMenu } from 'react-icons/fi'

interface SideNavProps {}

export const SideNav: React.FC<SideNavProps> = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)

  const startingHeight = useBreakpointValue({ md: '100%', base: '60px' })

  const toggleMenu = useCallback(() => {
    setIsOpenMenu(!isOpenMenu)
  }, [isOpenMenu])

  return (
    <Container
      maxW={{ md: '300px', base: 'full' }}
      w={{ md: '20%', base: 'full' }}
      h={{ md: 'full', base: 'auto' }}
      overflow="hidden"
      bg="gray.100"
      borderRightColor="gray.200"
      borderRightWidth={1}
      px={2}
      m={0}
    >
      <Collapse startingHeight={startingHeight} in={isOpenMenu} animateOpacity>
        <Flex flexDirection="column" h="full" justifyContent={{ md: 'space-between', base: 'flex-start' }}>
          <HStack w="full" p={3} display={{ md: 'none', base: 'flex' }} justifyContent="space-between" alignItems="center">
            <Icon
              as={FiMenu}
              w={8}
              h={8}
              onClick={toggleMenu}
              _hover={{
                cursor: 'pointer',
              }}
            />
            <Avatar name="Allen Leung" w={10} h={10} />
          </HStack>
          <VStack w="full" p={4}>
            <SideNavItem label="Explore" icon={MdOutlineExplore} />
            <SideNavItem label="Topics" icon={BsBook} />
            <SideNavItem label="Digest" icon={BsBookmark} />
            <SideNavItem label="Bookmarks" icon={BsSun} />
          </VStack>
          <VStack w="full" p={4} alignItems="flex-start">
            <SideNavItem label="Blog" />
            <SideNavItem label="About" />
            <SideNavItem label="Join the Beta group" />
            <HStack w="full" justifyContent="space-between" flexDirection="row">
              <Heading size="md">Curated</Heading>
              <Icon as={FiTwitter} />
            </HStack>
          </VStack>
        </Flex>
      </Collapse>
    </Container>
  )
}
