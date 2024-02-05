<template>
  <ul class="cart-list">
    <li v-for="item in $props.list" :key="item.id" class="cart-list__item">
      <VCartListItem v-bind="item" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import '@/components/cart/VCartList/style.scss'
import type { ICartItem } from './types'

import VCartListItem from '@/components/cart/VCartList/VCartListItem.vue'

interface IProps {
  list: ICartItem[] | []
}

const $props = withDefaults(defineProps<IProps>(), {
  list: () => []
})
</script>
