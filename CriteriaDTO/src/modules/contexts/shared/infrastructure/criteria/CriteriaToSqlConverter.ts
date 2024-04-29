import { type Criteria } from '../../domain/criteria/Criteria'

export class CriteriaToSqlConverter {
  convert (
    filedToSelect: string[],
    tableName: string,
    criteria: Criteria
  ): string {
    let nativeQuery = `SELECT ${filedToSelect.join(', ')} FROM ${tableName}`

    if (criteria.hasFilters()) {
      nativeQuery = nativeQuery.concat(' WHERE ')
      const whereQuerys = criteria.filters.value.map(filter => {
        return `${filter.field.value} ${filter.operator.value} ${filter.value.value}`
      })
      nativeQuery = nativeQuery.concat(whereQuerys.join(' AND '))
    }

    if (criteria.hasOrder()) {
      nativeQuery = nativeQuery.concat(
        ` ORDER BY ${criteria.order.orderBy.value} ${criteria.order.orderType.value.valueOf()}`
      )
    }

    return `${nativeQuery};`
  }
}
