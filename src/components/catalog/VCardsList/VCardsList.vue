<template>
  <ul v-if="$props.list.length" class="cards-list">
    <li v-for="item in $props.list" :key="item.id" class="cards-list__item">
      <VCardsListItem v-bind="item" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import '@/components/catalog/VCardsList/style.scss'
import type { IProduct } from '@/@types/api/products'

import VCardsListItem from '@/components/catalog/VCardsList/VCardsListItem.vue'

interface IProps {
  list: IProduct[] | []
}

const $props = withDefaults(defineProps<IProps>(), {
  list: () => []
})
</script>
