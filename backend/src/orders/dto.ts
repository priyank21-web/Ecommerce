import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateOrderItemDto {
  @IsString()
  productId: string = '';

  @IsNumber()
  quantity: number = 0;
}

export class CreateOrderDto {
  @IsArray()
  items: CreateOrderItemDto[] = [];
}
