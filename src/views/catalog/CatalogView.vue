<template>
  <div class="catalog">
    <TheHeader class="catalog-header">
      <div class="catalog-header-cart">
        <VIconButton
          iconName="cart"
          iconViewBox="0 0 512 512"
          iconSize="34"
          @click="handlerGoToCartPage"
        >
          <span class="catalog-header-cart__counter">{{ totalAmount }}</span>
        </VIconButton>
      </div>
    </TheHeader>

    <VPageHeader title="Каталог" />

    <div class="catalog-content">
      <TheSidebar :filter="filter" />

      <div class="catalog-list">
        <VCardsList v-if="filteredProductsList.length" :list="filteredProductsList" />

        <p v-else>Нет товаров для выбранных характеристик</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import '@/views/catalog/style.scss'

import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import TheHeader from '@/components/common/TheHeader/TheHeader.vue'
import VIconButton from '@/components/ui/buttons/VIconButton/VIconButton.vue'
import VCardsList from '@/components/catalog/VCardsList/VCardsList.vue'
import TheSidebar from '@/components/common/TheSidebar/TheSidebar.vue'
import VPageHeader from '@/components/common/VPageHeader/VPageHeader.vue'

import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

const router = useRouter()

const productsStore = useProductsStore()
const { getProducts } = useProductsStore()
const { productsList } = storeToRefs(productsStore)

const cartStore = useCartStore()
const { totalAmount } = storeToRefs(cartStore)

const filter = reactive({
  brand: 'all',
  color: null,
  size: null
})

const filteredProductsList = computed(() => {
  return productsList.value
    .filter((product) => {
      if (filter.brand !== 'all') return product.brand === filter.brand
      return true
    })
    .filter((product) => {
      if (filter.color) {
        return product.offers && product.offers.some((item) => item.color === filter.color)
      }
      return true
    })
    .filter((product) => {
      if (filter.size)
        return product.offers && product.offers.some((item) => item.sizes === filter.size)
      return true
    })
})

onMounted(() => {
  getProducts()
})

const handlerGoToCartPage = (): void => {
  router.push({ name: 'cart' })
}
</script>
