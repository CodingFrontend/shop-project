import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ICartItem } from '@/components/cart/VCartList/types.ts'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<ICartItem[] | []>(JSON.parse(localStorage.getItem('cart') ?? '[]'))

  const cartList = computed(() => cart.value)

  const totalAmount = computed(() => {
    if (!cartList.value.length) return 0

    return cartList.value.map((item) => item.amount).reduce((prev, next) => prev + next)
  })

  const totalSum = computed(() => {
    if (!cartList.value.length) return 0

    return cartList.value
      .map((item) => (item.amount ? item.amount * item.price.value : item.price.value))
      .reduce((prev, next) => Number(prev) + Number(next))
      .toFixed(2)
  })

  const addToCart = (product: ICartItem): void => {
    // if (!cart.value.length) {
    //   cart.value.push(product)
    // } else {
    //   const productInCart = cart.value.find((item) => item.id === product.id)

    //   if (productInCart) {
    //     productInCart.amount++
    //     return
    //   }
    //   cart.value.push(product)
    // }
    cart.value.push(product)
    localStorage.setItem('cart', JSON.stringify(cart.value))
  }

  const removeFromCart = (id: number): void => {
    cart.value = cart.value.filter((item) => item.id !== id)

    localStorage.setItem('cart', JSON.stringify(cart.value))
  }

  const updateQuantity = (id: number, quantity: number): void => {
    const productInCart = cart.value.find((item) => item.id === id)

    if (productInCart) {
      productInCart.amount = quantity
      localStorage.setItem('cart', JSON.stringify(cart.value))
    }
  }

  return { addToCart, cartList, totalAmount, removeFromCart, updateQuantity, totalSum }
})
