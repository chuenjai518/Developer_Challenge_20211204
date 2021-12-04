import { Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'
import url from 'url'

import validator from './validator'
import { PhotoI } from './interfaces'

const UNSPLASH_API_BASE_URL = process.env.UNSPLASH_API_BASE_URL
const UNSPLASH_API_KEY_NAME = process.env.UNSPLASH_API_KEY_NAME
const UNSPLASH_API_KEY_VALUE = process.env.UNSPLASH_API_KEY_VALUE

const getPhoto = async (req: Request, res: Response) => {
  try {
    const query = url.parse(req.url, true).query || {}

    await validator.getPhotoValidation(query)

    const params = new URLSearchParams({
      per_page: '9',
      ...query,
    })
    const apiRes: AxiosResponse = await axios.get(`${UNSPLASH_API_BASE_URL}/photos`, {
      headers: {
        Authorization: `${UNSPLASH_API_KEY_NAME} ${UNSPLASH_API_KEY_VALUE}`,
      },
      params,
    })
    const photoList: [PhotoI] = apiRes.data
    res.status(200).json(photoList)
  } catch (error) {
    res.status(500).json(error)
  }
}

const searchPhoto = async (req: Request, res: Response) => {
  try {
    const query = url.parse(req.url, true).query || {}

    await validator.searchPhotoValidation(query)

    const params = new URLSearchParams({
      per_page: '9',
      ...query,
    })
    const apiRes: AxiosResponse = await axios.get(`${UNSPLASH_API_BASE_URL}/search/photos`, {
      headers: {
        Authorization: `${UNSPLASH_API_KEY_NAME} ${UNSPLASH_API_KEY_VALUE}`,
      },
      params,
    })

    const photoList: [PhotoI] = apiRes.data

    res.status(200).json(photoList)
  } catch (error) {
    res.status(500).json(error)
  }
}

export default { getPhoto, searchPhoto }
