import React, { useCallback, useState } from 'react'
import { Container, Box, Input, Button, HStack, Icon, Text, Collapse, Select, SimpleGrid, GridItem } from '@chakra-ui/react'

import { BiFilterAlt, BiSearch } from 'react-icons/bi'

import { FILTERS, FILTER_KEY_TO_LABEL } from '../../definition/Filter'
import { OptionI, FiltersI, FilterFormI } from '../../interfaces'

interface SearchBarProps {
  data: {
    keyword: string
    setKeyword: React.Dispatch<React.SetStateAction<string>>
    filterForm: FilterFormI
    setFilterForm: React.Dispatch<React.SetStateAction<FilterFormI>>
    isFilterOpen: boolean
    setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>
  }
  handleOnSearch: (pageNum: number) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ data, handleOnSearch }) => {
  const { keyword, setKeyword, filterForm, setFilterForm, isFilterOpen, setIsFilterOpen } = data

  const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }, [])

  const handleSearchPhoto = useCallback(() => {
    handleOnSearch(1)
  }, [handleOnSearch])

  const handleOnKeyPressSearch = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const keyCode = event.key || event.code
      if (keyCode === 'Enter') {
        handleOnSearch(1)
      }
    },
    [handleOnSearch]
  )

  const toggleFilter = useCallback(() => {
    setIsFilterOpen(!isFilterOpen)
  }, [isFilterOpen])

  const handleOnSelectChange = (key: string, value: string) => {
    setFilterForm({ ...filterForm, [key]: value })
  }

  const renderFilter = useCallback(() => {
    return Object.keys(FILTERS).map((filterKey: string) => {
      if (filterKey) {
        const filterOptions: OptionI[] = FILTERS[filterKey]
        return (
          <GridItem colSpan={{ base: 4, md: 2, xl: 1 }} key={`${filterKey}_filter`}>
            <Select
              placeholder={FILTER_KEY_TO_LABEL[filterKey]}
              value={filterForm[filterKey]}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                handleOnSelectChange(filterKey, event.target.value)
              }}
            >
              {filterOptions.map((option: OptionI, index: number) => {
                const { value, label } = option
                return (
                  <option value={value} key={`${filterKey}_${value}_option`}>
                    {label}
                  </option>
                )
              })}
            </Select>
          </GridItem>
        )
      }
    })
  }, [filterForm])

  return (
    <>
      <Box h="auto" mx="auto" my={4} w="80%" borderRadius={8} bg="gray.100" display="flex">
        <HStack w="full" mx={4}>
          <Button bg="white" h={8} size="sm" color="gray.600" onClick={toggleFilter}>
            <HStack>
              <Icon as={BiFilterAlt} />
              <Text>Filter</Text>
            </HStack>
          </Button>
          <Input
            flex="1"
            alignSelf="center"
            w="80%"
            placeholder="Search"
            variant="filled"
            textAlign="center"
            value={keyword}
            onChange={handleOnChange}
            onKeyPress={handleOnKeyPressSearch}
          />
          <Button bg="white" size="sm" color="gray.600" onClick={handleSearchPhoto}>
            <Icon as={BiSearch} />
          </Button>
        </HStack>
      </Box>
      <Collapse in={isFilterOpen}>
        <Container bg="gray.100" borderRadius={5} maxW="90%">
          <SimpleGrid columns={4} columnGap={2} rowGap={2} p={4} w="full">
            {renderFilter()}
          </SimpleGrid>
        </Container>
      </Collapse>
    </>
  )
}
