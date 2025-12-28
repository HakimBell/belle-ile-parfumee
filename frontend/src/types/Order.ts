export interface Order {
    commandNumber: string;
    email: string;
    orderDate: string;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    clientFirstName: string;
    clientLastName: string;
    clientPhoneNumber: string;
}

export interface OrderLine {
    productCode: string;
    productName: string;
    productImageUrl: string;
    commandNumber: string;
    quantity: number;
    unitPrice: number;
}
