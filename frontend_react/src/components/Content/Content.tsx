import React, { useCallback, useEffect, useState } from 'react'
import { Container, SimpleGrid, GridItem, Text, Avatar, Modal, ModalOverlay, ModalContent, Image, Spinner, Center } from '@chakra-ui/react'

import { SearchBar } from './SearchBar'
import { ContentItem } from './ContentItem'
import { Pagination } from './Pagination'

import { photoService } from '../../services/photoService'
import { PhotoI, FilterFormI } from '../../interfaces'

interface ContentProps {}

const INIT_FILTER_FORM = {
  order_by: '',
  color: '',
  content_filter: '',
  orientation: '',
}

export const Content: React.FC<ContentProps> = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [itemList, setItemList] = useState<PhotoI[]>([])

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const [filterForm, setFilterForm] = useState<FilterFormI>({ ...INIT_FILTER_FORM })

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [photoSrc, setPhotoSrc] = useState<string>('')
  const [isModalLoad, setIsModalLoad] = useState<boolean>(false)

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setIsModalLoad(false)
  }, [setIsModalOpen])

  useEffect(() => {
    if (page) {
      getPhoto(page)
    }
  }, [page])

  const renderItemCard = useCallback(() => {
    if (itemList.length > 0) {
      return itemList.map((item, index) => {
        return (
          <GridItem colSpan={{ base: 6, md: 3, xl: 2 }} key={`${item.id}_${index}_item`} className="fadeIn">
            <ContentItem item={item} data={{ setIsModalOpen, setPhotoSrc }} />
          </GridItem>
        )
      })
    } else {
      return (
        <GridItem colSpan={6} my={20}>
          <Text textAlign="center">Sorry, there is no result.</Text>
        </GridItem>
      )
    }
  }, [itemList])

  const getPhoto = useCallback(
    async (pageNum: number) => {
      if (keyword === '') {
        //Get Photo List
        const apiResData = await photoService.getPhoto(pageNum)
        setTotalPage(0)
        setItemList(apiResData)
      } else {
        //Search Photo by keyword
        if (totalPage !== 0 && pageNum > totalPage) {
          pageNum = totalPage
        }
        const apiResData = await photoService.searchPhoto(keyword, pageNum, filterForm)
        setItemList(apiResData.results)
        setTotalPage(apiResData.total_pages!)
      }
      setPage(pageNum)
    },
    [keyword, filterForm]
  )

  return (
    <Container flex="1" p={0} m={0} maxW="full" h="auto" overflowY="scroll">
      <Container maxW="container.lg">
        <Avatar display={{ md: 'flex', base: 'none' }} name="Allen Leung" w={10} h={10} position="absolute" right={5} top={5} />
        <SearchBar data={{ keyword, setKeyword, filterForm, setFilterForm, isFilterOpen, setIsFilterOpen }} handleOnSearch={getPhoto} />

        <SimpleGrid columns={6} rowGap={8} my={8} w="full">
          {renderItemCard()}
        </SimpleGrid>
        <Pagination data={{ page, setPage, totalPage }} />
      </Container>
      <Modal isCentered isOpen={isModalOpen} onClose={onCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          {!!!isModalLoad && <Spinner />}
          <Image
            w="full"
            h="full"
            src={photoSrc}
            objectFit="fill"
            onLoad={() => {
              setIsModalLoad(true)
            }}
          />
        </ModalContent>
      </Modal>
    </Container>
  )
}
