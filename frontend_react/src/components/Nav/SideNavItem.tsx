import React from 'react'
import { Box, Text, HStack, Icon } from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface SideNavItemProps {
  label: string
  icon?: IconType
  handleOnPress?: () => void
}

export const SideNavItem: React.FC<SideNavItemProps> = ({ icon, label }) => {
  return (
    <Box
      w="full"
      alignSelf="flex-start"
      py={2}
      _hover={{
        bg: 'gray.200',
        fontWeight: '500',
        cursor: 'pointer',
      }}
    >
      <HStack w="full" spacing={4}>
        {icon && <Icon as={icon} />}
        <Text>{label}</Text>
      </HStack>
    </Box>
  )
}
