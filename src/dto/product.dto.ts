export class CreateProductDto {
    name: string;
    description: string;
}

export class UpdateProductDto {
    name?: string;
    description?: string;
}