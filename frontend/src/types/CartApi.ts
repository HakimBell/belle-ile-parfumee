export interface CartItemDTO {
    productCode: string;
    productName: string;
    brand: string;
    unitPrice: number;
    quantity: number;
    stock: number;
    imageUrl?: string;
    concentrationType: string;
    size: number;
    gender: string;
}

export interface CartResponseDTO {
    commandNumber: string;
    email: string;
    orderDate: string;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    items: CartItemDTO[];
    totalPrice: number;
    totalItems: number;
}

export interface CartItemRequest {
    productCode: string;
    quantity: number;
}
