import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { IProduct } from '@/@types/api/products.ts'

import ProductsDataService from '@/api/services/products'

export const useProductsStore = defineStore('products', () => {
  const productsList = ref<IProduct[] | []>([])

  const getProducts = async () => {
    try {
      const data = await ProductsDataService.getProducts()

      productsList.value = data
    } catch (error) {
      console.log(error)
    }
  }

  return { productsList, getProducts }
})
