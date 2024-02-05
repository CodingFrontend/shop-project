export interface IFilterValue {
  id: number
  title: string
  sort?: number
  value?: string
}

export interface IFilterInfo {
  id: number
  title: string
  sort: number
  value: IFilterValue[]
}

export interface IFilter {
  [key: string]: IFilterInfo
}
