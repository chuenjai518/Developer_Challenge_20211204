import React, { useCallback, useEffect, useState } from 'react'
import { Container, HStack, Icon, Input } from '@chakra-ui/react'

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

interface PaginationProps {
  data: {
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    totalPage: number
  }
}

export const Pagination: React.FC<PaginationProps> = ({ data }) => {
  const { page, setPage, totalPage } = data

  const [pageNum, setPageNum] = useState<number>(page)

  useEffect(() => {
    setPageNum(page)
  }, [page])

  const handlePrevPage = useCallback(() => {
    setPage(page - 1)
  }, [page])

  const handleNextPage = useCallback(() => {
    setPage(page + 1)
  }, [page])

  const handleOnChangePageNum = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPageNum(parseInt(event.target.value))
    },
    [pageNum]
  )

  const handleOnBlurChangePage = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const tempPageNum = parseInt(event.target.value)
      if (!isNaN(tempPageNum)) {
        setPage(tempPageNum)
      }
    },
    [page]
  )
  const handleOnKeyPressChangePage = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const keyCode = event.key || event.code
      if (keyCode === 'Enter') {
        const tempPageNum = parseInt(event.currentTarget.value)
        if (!isNaN(tempPageNum)) {
          setPage(tempPageNum)
        }
      }
    },
    [page]
  )

  return (
    <Container w={200} h={12} mt={12} mb={12}>
      <HStack display="flex" justifyContent="center" alignItems="center" h="full">
        <Icon
          as={BsChevronLeft}
          w={6}
          h={6}
          onClick={handlePrevPage}
          _hover={{
            cursor: 'pointer',
          }}
        />
        <Input
          textAlign="center"
          value={pageNum || ''}
          onChange={handleOnChangePageNum}
          onBlur={handleOnBlurChangePage}
          type="number"
          min={1}
          max={totalPage ? totalPage : undefined}
          onKeyPress={handleOnKeyPressChangePage}
        />
        <Icon
          as={BsChevronRight}
          w={6}
          h={6}
          onClick={handleNextPage}
          _hover={{
            cursor: 'pointer',
          }}
        />
      </HStack>
    </Container>
  )
}
