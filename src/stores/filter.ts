import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { IFilter } from '@/@types/api/filter.ts'

import FilterDataService from '@/api/services/filter'

export const useFilterStore = defineStore('filter', () => {
  const filterList = ref<IFilter[] | []>([])

  const getFilter = async () => {
    try {
      const data = await FilterDataService.getFilter()

      filterList.value = data
    } catch (error) {
      console.log(error)
    }
  }

  return { filterList, getFilter }
})
