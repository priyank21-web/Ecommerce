import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string = '';

  @IsString()
  description: string = '';

  @IsNumber()
  price: number = 0;

  @IsOptional()
  @IsArray()
  tags?: string[];
}
