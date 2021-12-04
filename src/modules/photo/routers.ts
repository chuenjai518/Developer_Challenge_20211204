import express from 'express'
import apicache from 'apicache'

import photoController from './controller'

let cache = apicache.middleware

const photoRouter = express.Router()

photoRouter.get('/', cache('5 minutes'), photoController.getPhoto)
photoRouter.get('/search', cache('5 minutes'), photoController.searchPhoto)

export default photoRouter
