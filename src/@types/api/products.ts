export interface IPrice {
  currency: string
  value: number
}

export interface IOffer {
  id: number
  color?: string
  sizes?: string
  available: number
}

export interface IProductInfo {
  title: string
  price: IPrice
  image: string
  brand: string
  stock: number
  offers?: IOffer[]
}

export interface IProduct extends IProductInfo {
  id: number
}
