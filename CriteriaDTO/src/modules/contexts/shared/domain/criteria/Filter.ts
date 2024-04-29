export enum Operator {
  EQ = '=',
  NE = '!=',
  GT = '>',
  LT = '<',
  GTE = '>=',
  LTE = '<=',
  LIKE = 'like',
  ILIKE = 'ilike',
  IN = 'in',
  NOTIN = 'not in',
  ISNULL = 'is null',
  CONTAINS = 'contains',
  NOTCONTAINS = 'not contains',
}

export class FilterOperator {
  constructor (public readonly value: Operator) {}
}

export class FilterField {
  constructor (public readonly value: string) {}
}

export class FilterValue {
  constructor (public readonly value: string) {}
}

export interface FiltersPrimitives {
  field: string
  operator: string
  value: string
}

export class Filter {
  readonly field: FilterField
  readonly operator: FilterOperator
  readonly value: FilterValue

  constructor (
    field: FilterField,
    operator: FilterOperator,
    value: FilterValue
  ) {
    this.field = field
    this.operator = operator
    this.value = value
  }

  static fromPrimitives (
    field: string,
    operator: string,
    value: string
  ): Filter {
    return new Filter(
      new FilterField(field),
      new FilterOperator(operator as Operator),
      new FilterValue(value)
    )
  }

  toPrimitives (): FiltersPrimitives {
    return {
      field: this.field.value,
      operator: this.operator.value,
      value: this.value.value
    }
  }
}

export class Filters {
  constructor (public readonly value: Filter[]) {}

  static fromPrimitives (filters: FiltersPrimitives[]): Filters {
    return new Filters(
      filters.map((filter) => Filter.fromPrimitives(filter.field, filter.operator, filter.value))
    )
  }

  toPrimitives (): FiltersPrimitives[] {
    return this.value.map((filter) => filter.toPrimitives())
  }

  isEmpty (): boolean {
    return this.value.length === 0
  }
}
