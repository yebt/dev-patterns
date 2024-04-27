import { CriteriaDTO } from "../CriteriaDTO/CriteriaDTO";
import { Item } from "./Item";

interface ItemRepository {
    all(): Item[];
    matching: (criteria: CriteriaDTO<Item>) => Item[];
}