import { type Criteria } from '../../domain/criteria/Criteria'
import { type Filter } from '../../domain/criteria/Filter'

export class CriteriaToSqlConverter {
  convert (
    filedToSelect: string[],
    tableName: string,
    criteria: Criteria
  ): string {
    let nativeQuery = `SELECT ${filedToSelect.join(', ')} FROM ${tableName}`

    if (criteria.hasFilters()) {
      nativeQuery = nativeQuery.concat(' WHERE ')

      const whereQuerys = criteria.filters.value.map((filter) =>
        this.generateWhereQuerys(filter)
      )
      nativeQuery = nativeQuery.concat(whereQuerys.join(' AND '))
    }

    if (criteria.hasOrder()) {
      nativeQuery = nativeQuery.concat(
        ` ORDER BY ${
          criteria.order.orderBy.value
        } ${criteria.order.orderType.value.valueOf()}`
      )
    }

    if (criteria.pageSize !== null) {
      nativeQuery = nativeQuery.concat(` LIMIT ${criteria.pageSize}`)
    }

    if (criteria.pageNumber !== null && criteria.pageSize !== null) {
      nativeQuery = nativeQuery.concat(
        ` OFFSET ${(criteria.pageNumber - 1) * criteria.pageSize}`
      )
    }

    return `${nativeQuery};`
  }

  private generateWhereQuerys (filter: Filter): string {
    if (filter.operator.isContains()) {
      return ` ${filter.field.value} LIKE '%${filter.value.value}%'`
    }

    if (filter.operator.isNotContains()) {
      return ` ${filter.field.value} NOT LIKE '%${filter.value.value}%'`
    }

    if (filter.operator.isNotEqual()) {
      return ` ${filter.field.value} != '${filter.value.value}'`
    }

    return ` ${filter.field.value} ${filter.operator.value} ${filter.value.value}`
  }
}
