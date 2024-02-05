<template>
  <div class="cart-item">
    <div class="cart-item__content">
      <div class="cart-item-info">
        <div class="cart-item-info__image">
          <img :src="$props.image" alt="" />
        </div>

        <div class="cart-item-info__details">
          <p class="cart-item-info__title">{{ title }}</p>
          <div class="cart-item-properties">
            <div class="cart-item-property">
              Цвет:
              <span
                class="cart-item-property__value cart-item-property__value--color"
                :style="styleColor"
              ></span>
            </div>
            <div class="cart-item-properties__item">
              Размер:
              <span class="cart-item-property__value cart-item-property__value--size">{{
                $props.size?.label
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="cart-item-actions">
        <VCounter
          class="cart-item-actions__counter"
          v-model="amount"
          :min-value="1"
          :max-value="stock"
        />

        <div class="cart-item-actions__sum">{{ computedPrice }}</div>

        <button class="cart-item-actions__button-remove" @click="handleDeleteItem">x</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@/components/cart/VCartList/style.scss'
import type { ICartItem as IProps } from './types'

import { computed, ref, watch } from 'vue'

import VCounter from '@/components/ui/VCounter/VCounter.vue'

import { useCartStore } from '@/stores/cart'
const { removeFromCart, updateQuantity } = useCartStore()

// [START] Props
const $props = defineProps<IProps>()
// [END] Props

const stock = ref<number>(0)
const amount = ref<number>(0)

const computedPrice = computed((): string => `${$props.price['value']} ${$props.price['currency']}`)
const styleColor = computed((): string => {
  return $props.color ? `background-color: ${$props.color.dataValue}` : ''
})
const title = computed((): string => `${$props.brand} | ${$props.title}`)

watch(
  () => $props.stock,
  () => {
    stock.value = $props.stock
  },
  { immediate: true }
)

watch(
  () => $props.amount,
  () => {
    amount.value = $props.amount
  },
  { immediate: true }
)

watch(
  () => amount.value,
  () => {
    updateQuantity($props.id, amount.value)
  },
  { immediate: true }
)

const handleDeleteItem = (): void => {
  removeFromCart($props.id)
}
</script>
