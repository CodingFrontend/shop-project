export interface IPrice {
  currency: string
  value: number
}

export interface IColor {
  value: string
  dataValue: number
}

export interface ISize {
  value: string
  label: number
}

export interface ICartItem {
  id: number
  image: string
  brand: string
  title: string
  stock: number
  color: IColor
  size: ISize
  price: IPrice
  amount: number
}
