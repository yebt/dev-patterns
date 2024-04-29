import { Criteria } from '../../domain/criteria/Criteria'
import { type FiltersPrimitives } from '../../domain/criteria/Filter'

export class SearchParamsCriteriaFiltersParser {
  public make (searchParams: URLSearchParams): Criteria {
    return Criteria.fromPrimitives(
      SearchParamsCriteriaFiltersParser.parse(searchParams),
      searchParams.get('orderBy'),
      searchParams.get('orderType'),
      Number(searchParams.get('pageSize')),
      Number(searchParams.get('pageNumber'))
    )
  }

  static parse (searchParams: URLSearchParams): FiltersPrimitives[] {
    const tempFilters: Record<string, Partial<FiltersPrimitives>> = {}

    searchParams.forEach((value, key) => {
      const match = key.match(/filters\[(\d+)]\[(.+)]/)
      if (match != null) {
        const index = match[1]
        const property = match[2] as keyof FiltersPrimitives

        if (
          index === 'orderBy' ||
          index === 'orderType' ||
          index === 'pageSize' ||
          index === 'pageNumber'
        ) {
          return
        }

        if (tempFilters[index] === undefined && tempFilters[index] === null) {
          tempFilters[index] = {}
        }
        tempFilters[index][property] = value
      }
    })

    return Object.values(tempFilters).filter(
      (filter) =>
        filter.field !== undefined &&
        filter.operator !== undefined &&
        filter.value !== undefined
    ) as FiltersPrimitives[]
  }
}
