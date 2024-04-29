export enum OrderTypes {
    ASC = "asc",
    DESC = "desc",
    NONE = "none",
}

export class OrderType {
    constructor(public readonly value: OrderTypes) {}
}

export class OrderBy {
    constructor(public readonly value: string) {}
}

export class Order {
    constructor(
        public readonly orderBy: OrderBy,
        public readonly orderType: OrderType
    ){}

    static none(): Order {
        return new Order(
            new OrderBy(""),
            new OrderType(OrderTypes.NONE)
        )
    }

    static fromPrimitives(orderBy: string | null, orderType: string | null): Order {
        return OrderBy !== null 
            ? new Order(new OrderBy(orderBy), new OrderType(orderType as OrderTypes))
            : Order.none()
    }
}