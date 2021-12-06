import React, { useCallback } from 'react'
import { Box, Image, VStack, Text, HStack, Icon } from '@chakra-ui/react'
import { FaUserCircle } from 'react-icons/fa'

import { PhotoI } from '../../interfaces'

interface ContentItemProps {
  item: PhotoI
  data: {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setPhotoSrc: React.Dispatch<React.SetStateAction<string>>
  }
}

export const ContentItem: React.FC<ContentItemProps> = ({ item, data }) => {
  const { setIsModalOpen, setPhotoSrc } = data

  const openPhoto = useCallback(() => {
    setPhotoSrc(item.urls.full)
    setIsModalOpen(true)
  }, [])

  return (
    <Box h={{ base: 440, md: 300, xl: 220 }} borderRadius="10" overflow="hidden" mx={{ base: 6, md: 6, xl: 4 }}>
      <VStack>
        <Box
          display="flex"
          w="full"
          h={{ base: 400, md: 260, xl: 180 }}
          borderRadius="10"
          overflow="hidden"
          alignItems="center"
          _hover={{ cursor: 'pointer' }}
        >
          <Image w="full" h="full" src={item.urls.small} alt={item.alt_description!} objectFit="cover" onClick={openPhoto} />
        </Box>
        <HStack alignSelf="flex-start" px={2}>
          <Icon as={FaUserCircle} width={4} height={4} />
          <Text py={2}>{item.user.username}</Text>
        </HStack>
      </VStack>
    </Box>
  )
}
