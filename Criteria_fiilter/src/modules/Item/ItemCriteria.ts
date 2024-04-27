import { Criteria } from "../Criteria/Criteria";
import { Item } from "./Item";

export class PrimeItemCriteria extends Criteria<Item> {
    public meetCriteria(items: Item[]): Item[] {
        return items.filter((item) => item.prime);
    }
}

export class AvailableItemCriteria extends Criteria<Item> {
    public meetCriteria(items: Item[]): Item[] {
        return items.filter((item) => item.available);
    }
}

export class NewItemCriteria extends Criteria<Item> {
    public meetCriteria(items: Item[]): Item[] {
        return items.filter((item) => item.new);
    }
}