<template>
  <div class="cart">
    <TheHeader class="catalog-header" />

    <VPageHeader title="Корзина" />

    <div class="cart-content">
      <div v-if="cartList.length" class="cart-content-inner">
        <VCartList :list="cartList" class="cart-list" />

        <VCartBuy :amount="totalAmount" :sum="totalSum" class="cart-list-buy" @buy="handleBuy" />
      </div>

      <div class="cart-list__empty" v-else>
        <p>В корзине пока нет товаров</p>
        <p>Перейти в <router-link :to="{ name: 'catalog' }">каталог</router-link></p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import '@/views/cart/style.scss'

import TheHeader from '@/components/common/TheHeader/TheHeader.vue'
import VCartList from '@/components/cart/VCartList/VCartList.vue'
import VPageHeader from '@/components/common/VPageHeader/VPageHeader.vue'
import VCartBuy from '@/components/cart/VCartBuy/VCartBuy.vue'

import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

const store = useCartStore()

const { cartList, totalAmount, totalSum } = storeToRefs(store)

const handleBuy = (): void => {
  console.log(cartList.value)
}
</script>
