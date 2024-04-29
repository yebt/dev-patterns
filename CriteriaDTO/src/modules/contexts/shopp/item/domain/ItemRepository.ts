import { type Criteria } from '../../../shared/domain/criteria/Criteria'
import { type Item } from './Item'

export interface ItemRepository {
  save: (item: Item) => Promise<void>
  match: (criteria: Criteria) => Promise<Item[]>
}
