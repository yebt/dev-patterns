export abstract class Criteria<T> {
  public abstract meetCriteria(items: T[]): T[];

  public or(other: Criteria<T>): Criteria<T> {
    return new OrCriteria(this, other);
  }

  public and(other: Criteria<T>): Criteria<T> {
    return new AndCriteria(this, other);
  }
}

class OrCriteria<T> extends Criteria<T> {
  constructor(
    private criteria: Criteria<T>,
    private otherCriteria: Criteria<T>
  ) {
    super();
  }

  public meetCriteria(items: T[]): T[] {
    const firstCriteriaItems = this.criteria.meetCriteria(items);
    const otherCriteriaItems = this.otherCriteria.meetCriteria(items);
    return [...firstCriteriaItems, ...otherCriteriaItems];  
  }
}

class AndCriteria<T> extends Criteria<T> {
  constructor(
    private criteria: Criteria<T>,
    private otherCriteria: Criteria<T>
  ) {
    super();
  }

  public meetCriteria(items: T[]): T[] {
    return this.otherCriteria.meetCriteria(this.criteria.meetCriteria(items));
  }
}
