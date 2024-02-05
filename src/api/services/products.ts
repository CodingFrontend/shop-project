import baseUrl from '@/api/baseUrl'

import type { IProduct } from '@/@types/api/products'

class ProductsDataService {
  getProducts(): Promise<IProduct[]> {
    return baseUrl.get('/products').then(({ data }) => data)
  }
}

export default new ProductsDataService()
