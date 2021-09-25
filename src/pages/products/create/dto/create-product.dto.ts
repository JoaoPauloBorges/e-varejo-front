export class CreateProductDto {
  productName!: string;

  description!: string;

  value!: number;

  discount: number;

  images?: string[];
}
