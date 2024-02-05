import type { IFilterInfo, IFilterValue } from '@/@types/api/filter'
import { computed } from 'vue'

import { storeToRefs } from 'pinia'
import { useFilterStore } from '@/stores/filter'

export const useFilter = () => {
  const store = useFilterStore()
  const { filterList } = storeToRefs(store)

  const colorFilter = computed(() => {
    const colorFilterData = filterList.value.find((item) => item.color)
    return colorFilterData ? colorFilterData['color'] : null
  })

  const colors = computed(() => {
    if (!colorFilter.value) return []
    return colorFilter.value.value.map((item) => {
      return {
        value: item.id,
        dataValue: item.value
      }
    })
  })

  const brandsFilter = computed((): IFilterInfo | null => {
    const brandsFilterData = filterList.value.find((item) => item.brands)
    return brandsFilterData ? brandsFilterData['brands'] : null
  })

  const brandsFilterValuesSorted = computed((): IFilterValue[] | [] => {
    if (!brandsFilter.value) return []
    return brandsFilter.value.value.length
      ? [...brandsFilter.value.value].sort((a, b) => parseFloat(a.sort) - parseFloat(b.sort))
      : []
  })

  const brandsFilterRadioset = computed(() => {
    if (!brandsFilterValuesSorted.value.length) return []
    const processedItems = brandsFilterValuesSorted.value.map((item) => {
      return {
        value: item.id,
        label: item.title
      }
    })

    const allBrandsFilterItem = {
      value: 'all',
      label: 'Все бренды'
    }

    return [allBrandsFilterItem, ...processedItems]
  })

  const sizeFilter = computed((): IFilterInfo | null => {
    const sizeFilterData = filterList.value.find((item) => item.size)
    return sizeFilterData ? sizeFilterData['size'] : null
  })

  const sizes = computed(() => {
    if (!sizeFilter.value) return []
    return sizeFilter.value.value.map((item) => {
      return {
        value: item.id,
        label: item.title
      }
    })
  })

  return {
    colorFilter,
    brandsFilter,
    sizeFilter,
    colors,
    brandsFilterRadioset,
    sizes
  }
}
