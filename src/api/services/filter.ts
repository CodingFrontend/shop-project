import baseUrl from '@/api/baseUrl'

import type { IFilter } from '@/@types/api/filter'

class FilterDataService {
  getFilter(): Promise<IFilter[]> {
    return baseUrl.get('/filter').then(({ data }) => data)
  }
}

export default new FilterDataService()
