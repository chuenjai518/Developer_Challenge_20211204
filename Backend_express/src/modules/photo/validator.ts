import Joi from 'joi'

const ORDER_BY = ['latest', 'oldest', 'popular', 'relevant']
const COLORS = ['black_and_white', 'black', 'white', 'yellow', 'orange', 'red', 'purple', 'magenta', 'green', 'teal', 'blue']
const CONTENT_FILTER = ['low', 'high']
const ORIENTATION = ['landscape', 'portrait', 'squarish']

const getPhotoSchema = Joi.object({
  page: Joi.number().integer().required(),
  order_by: Joi.string().valid(...ORDER_BY),
  per_page: Joi.number().integer().default(9),
})

const searchPhotoSchema = Joi.object({
  query: Joi.string().alphanum().required(),
  page: Joi.number().integer().required(),
  per_page: Joi.number().integer().default(9),
  order_by: Joi.string().valid(...ORDER_BY),
  content_filter: Joi.string().valid(...CONTENT_FILTER),
  color: Joi.string().valid(...COLORS),
  orientation: Joi.string().valid(...ORIENTATION),
})

const getPhotoValidation = async (query: object) => {
  try {
    await getPhotoSchema.validateAsync(query)
  } catch (err) {
    throw err.details[0].message
  }
}

const searchPhotoValidation = async (query: object) => {
  try {
    await searchPhotoSchema.validateAsync(query)
  } catch (err) {
    throw err.details[0].message
  }
}

export default { getPhotoValidation, searchPhotoValidation }
