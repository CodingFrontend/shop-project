<template>
  <div class="catalog-card">
    <div class="catalog-card-image">
      <img :src="$props.image" alt="Фото товара" />
    </div>

    <div class="catalog-card-info">
      <p class="catalog-card-info__title">{{ $props.title }}</p>
      <p class="catalog-card-info__brand">{{ $props.brand }}</p>
      <p class="catalog-card-info__price">{{ computedPrice }}</p>
    </div>

    <div class="catalog-card-offers">
      <template v-if="$props.offers">
        <VFilter
          v-if="offersColorOptions.length"
          :model-value="selectedColor"
          :list="offersColorOptions"
          type="color"
          name="color"
          class="catalog-card-offers__filter"
          @select="handleSelectColor"
        />
        <VFilter
          v-if="offersSizesOptions.length"
          :model-value="selectedSize"
          :list="offersSizesOptions"
          type="size"
          name="size"
          class="catalog-card-offers__filter"
          @select="handleSelectSize"
        />
      </template>
    </div>

    <VPrimaryButton
      :class="cardButtonClassList"
      :disabled="isCardButtonDisabled"
      @click="handleAddToCart"
      >{{ cardButtonTitle }}</VPrimaryButton
    >
  </div>
</template>

<script setup lang="ts">
import '@/components/catalog/VCardsList/style.scss'

import type { IProduct as IProps, IOffer } from '@/@types/api/products'

import { computed, ref, watchEffect } from 'vue'

import VPrimaryButton from '@/components/ui/buttons/VPrimaryButton/VPrimaryButton.vue'
import VFilter from '@/components/ui/VFilter/VFilter.vue'

import { useFilter } from '@/composables/useFilter'
import { useCartStore } from '@/stores/cart'

const { colors, sizes } = useFilter()

const { addToCart, cartList } = useCartStore()

// [START] Props
const $props = defineProps<IProps>()
// [END] Props

const selectedColor = ref(null)
const selectedSize = ref(null)
const currentOffersSelected = ref([])
const offersColorOptions = ref([])
const offersSizesOptions = ref([])
const productInCart = ref(false)

const isCardButtonDisabled = computed(
  () =>
    (offersColorOptions.value.length && !selectedColor.value) ||
    (offersSizesOptions.value.length && !selectedSize.value)
)
const isProductHasColorOrSize = computed(() => {
  if (!$props.offers) return false
  return $props.offers.some(
    (offer) => (offer.color && !offer.sizes) || (offer.sizes && !offer.color)
  )
})

const isProductHasColorAndSize = computed(() => {
  if (!$props.offers) return false
  return $props.offers.some((offer) => offer.color && offer.sizes)
})

const cardButtonTitle = computed((): string => (productInCart.value ? 'В корзине' : 'В корзину'))
const computedPrice = computed(
  (): string => `Стоимость ${$props.price.value} ${$props.price.currency}`
)
const cardButtonClassList = computed(() => {
  return ['catalog-card-button', `${productInCart.value ? 'catalog-card-button--added' : ''}`]
})

const allColors = computed(() => {
  if (!$props.offers) return []
  const offersWithColors = $props.offers.filter((item: IOffer) => item.color)
  const uniqueColors = [...new Set(offersWithColors.map((item: IOffer) => item.color))]
  if (!uniqueColors.length) return []
  return uniqueColors.map((item) => item)
})

const initialOffersColorOptions = computed(() => {
  if (!allColors.value) return []
  return allColors.value.map((item) => colors.value.find((color) => color.value === item))
})

const allSizes = computed(() => {
  if (!$props.offers) return []
  const offersWithSizes = $props.offers.filter((item: IOffer) => item.sizes)
  const uniqueSizes = [...new Set(offersWithSizes.map((item: IOffer) => item.sizes))]
  return uniqueSizes.map((item) => item)
})

const initialOffersSizesOptions = computed(() => {
  if (!allSizes.value) return []

  return allSizes.value.map((item) => sizes.value.find((size) => size.value === item))
})

const getOffersSizesOptions = (): void => {
  offersSizesOptions.value = currentOffersSelected.value.map((offer) => {
    const currentInitialOption = initialOffersSizesOptions.value.find(
      (item) => item.value === offer.sizes
    )

    const { value, label } = currentInitialOption
    return {
      value,
      label,
      available: offer.available
    }
  })
}

const getOffersColorOptions = (): void => {
  offersColorOptions.value = currentOffersSelected.value.map((offer) => {
    const currentInitialOption = initialOffersColorOptions.value.find(
      (item) => item.value === offer.color
    )

    const { value, dataValue } = currentInitialOption
    return {
      value,
      dataValue,
      available: offer.available
    }
  })
}

const checkIsProductInCart = (): void => {
  const selectedSizeInCart = cartList.find(
    (item) => item.size && item.size?.value === selectedSize.value?.value
  )

  const selectedColorInCart = cartList.find(
    (item) => item.color && item.color?.value === selectedColor.value?.value
  )

  if (isProductHasColorAndSize.value) {
    productInCart.value = selectedSizeInCart && selectedColorInCart
  } else if (isProductHasColorOrSize.value) {
    productInCart.value = selectedSizeInCart || selectedColorInCart
  } else {
    productInCart.value = cartList.find((item) => item.id === $props.id)
  }
}

const handleSelectColor = (value): void => {
  if (selectedSize.value && selectedColor.value) selectedSize.value = null
  selectedColor.value = colors.value.find((color) => color.value === value)

  if (selectedSize.value?.value) return
  currentOffersSelected.value = $props.offers.filter(
    (offer) => offer.color === selectedColor.value.value
  )

  if ($props.offers?.some((item) => item.sizes)) {
    getOffersSizesOptions()
  }

  checkIsProductInCart()
}

const handleSelectSize = (value): void => {
  if (selectedColor.value && selectedSize.value) selectedColor.value = null
  selectedSize.value = sizes.value.find((size) => size.value === value)

  checkIsProductInCart()

  if (selectedColor.value?.value) return
  currentOffersSelected.value = $props.offers.filter(
    (offer) => offer.sizes === selectedSize.value.value
  )

  if ($props.offers?.some((item) => item.color)) {
    getOffersColorOptions()
  }
}

const handleAddToCart = (): void => {
  if (productInCart.value) return

  const selectedItem = {
    id: isProductHasColorOrSize.value || isProductHasColorAndSize.value ? Math.random() : $props.id,
    image: $props.image,
    brand: $props.brand,
    title: $props.title,
    stock: $props.stock,
    color: selectedColor.value,
    size: selectedSize.value,
    price: $props.price,
    amount: 1
  }

  addToCart(selectedItem)

  checkIsProductInCart()
}

watchEffect(() => {
  offersColorOptions.value = initialOffersColorOptions.value
  offersSizesOptions.value = initialOffersSizesOptions.value

  if (!$props.offers) checkIsProductInCart()
})
</script>
