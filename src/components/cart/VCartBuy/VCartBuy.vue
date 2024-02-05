<template>
  <div class="cart-buy">
    <div class="cart-buy-info">
      <p class="cart-buy-info__item">
        <span>Товаров: {{ $props.amount }}</span>
      </p>
      <p class="cart-buy-info__item">
        <span>Итого: {{ $props.sum }}</span>
      </p>
    </div>

    <VPrimaryButton class="cart-buy-button" @click="handleBuy">Купить</VPrimaryButton>
  </div>
</template>

<script setup lang="ts">
import '@/components/cart/VCartBuy/style.scss'

import VPrimaryButton from '@/components/ui/buttons/VPrimaryButton/VPrimaryButton.vue'

interface IProps {
  amount: number
  sum: string | number
}

const $props = withDefaults(defineProps<IProps>(), {
  amount: 0,
  sum: 0
})

const $emits = defineEmits<{
  (e: 'buy'): void
}>()

const handleBuy = (): void => {
  $emits('buy')
}
</script>
