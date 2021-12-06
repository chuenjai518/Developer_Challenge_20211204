import { FiltersI } from '../interfaces'

export const FILTERS: FiltersI = {
  order_by: [
    { value: 'relevant', label: 'Relevant' },
    { value: 'latest', label: 'Latest' },
  ],
  color: [
    { value: 'black_and_white', label: 'Black and White' },
    { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'orange', label: 'Orange' },
    { value: 'red', label: 'Red' },
    { value: 'purple', label: 'Purple' },
    { value: 'magenta', label: 'Magenta' },
    { value: 'green', label: 'Green' },
    { value: 'teal', label: 'Teal' },
    { value: 'blue', label: 'Blue' },
  ],
  content_filter: [
    { value: 'low', label: 'Low' },
    { value: 'high', label: 'High' },
  ],
  orientation: [
    { value: 'landscape', label: 'Landscape' },
    { value: 'portrait', label: 'Portrait' },
    { value: 'squarish', label: 'Squarish' },
  ],
}

export const FILTER_KEY_TO_LABEL: any = {
  order_by: 'Order By',
  color: 'Color',
  content_filter: 'Content Filter',
  orientation: 'Orientation',
}
