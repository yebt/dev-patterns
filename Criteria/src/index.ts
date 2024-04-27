import { Criteria } from "./modules/Criteria/Criteria";
import { Item } from "./modules/Item/Item";
import { NewItemCriteria, PrimeItemCriteria } from "./modules/Item/ItemCriteria";

const itemsToFilter: Item[] = [
  { id: "1", name: "Item 1", description: "Item 1 description", price: 10, prime: true, new: false, available: true,},
  { id: "2", name: "Item 2", description: "Item 2 description", price: 20, prime: false, new: true, available: true,},
  { id: "3", name: "Item 3", description: "Item 3 description", price: 30, prime: true, new: true, available: false,},
  { id: "4", name: "Item 4", description: "Item 4 description", price: 40, prime: false, new: false, available: true,},
  { id: "5", name: "Item 5", description: "Item 5 description", price: 50, prime: true, new: true, available: true,},
  { id: "6", name: "Item 6", description: "Item 6 description", price: 60, prime: false, new: false, available: false,},
  { id: "7", name: "Item 7", description: "Item 7 description", price: 70, prime: true, new: true, available: true,},
  { id: "8", name: "Item 8", description: "Item 8 description", price: 80, prime: false, new: false, available: true,},
  { id: "9", name: "Item 9", description: "Item 9 description", price: 90, prime: true, new: true, available: true,},
  { id: "10", name: "Item 10", description: "Item 10 description", price: 100, prime: false, new: false, available: false,},
];


const newItems: Item[] = new NewItemCriteria().meetCriteria(itemsToFilter);
const primeItems: Item[] = new PrimeItemCriteria().meetCriteria(itemsToFilter);
const newPrimeCriteria: Criteria<Item> = new PrimeItemCriteria().and(new NewItemCriteria())
const newOrPrimeCriteria: Criteria<Item> = new PrimeItemCriteria().or(new NewItemCriteria())
const newPrimeItems: Item[] = newPrimeCriteria.meetCriteria(itemsToFilter);
const newOrPrimeItems: Item[] = newOrPrimeCriteria.meetCriteria(itemsToFilter);

console.log(newItems.length)
console.log(primeItems.length)
console.log(newPrimeItems.length)
console.log(newOrPrimeItems.length)
