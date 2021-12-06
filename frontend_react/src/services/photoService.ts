import axios from 'axios'

import { FilterFormI, PhotoI } from '../interfaces'

const BACKEND_BASE_URL = 'http://localhost:5000/api/photo'

interface searchPhotoI {
  results: PhotoI[]
  total?: number
  total_pages?: number
  success: boolean
}

const getPhoto = async (page: number) => {
  try {
    const apiRes = await axios.get<PhotoI[]>(BACKEND_BASE_URL, { params: { page } })
    return apiRes.data
  } catch (error) {
    alert(error)
    return []
  }
}

const searchPhoto = async (query: string, page: number, filter: FilterFormI) => {
  Object.keys(filter).forEach((key: string) => {
    if (filter[key] === '') {
      delete filter[key]
    }
  })

  try {
    const apiRes = await axios.get<searchPhotoI>(`${BACKEND_BASE_URL}/search`, { params: { query, page, ...filter } })
    apiRes.data.success = true
    return apiRes.data
  } catch (error) {
    alert(error)
    return { success: false, results: [] }
  }
}

export const photoService = { getPhoto, searchPhoto }
