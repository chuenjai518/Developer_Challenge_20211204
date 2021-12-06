export interface OptionI {
  value: string
  label: string
}

export interface FiltersI {
  [key: string]: OptionI[]
  order_by: OptionI[]
  color: OptionI[]
  content_filter: OptionI[]
  orientation: OptionI[]
}

export interface FilterFormI {
  [key: string]: string
  order_by: string
  color: string
  content_filter: string
  orientation: string
}
