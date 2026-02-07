import { IsObject, IsString } from 'class-validator';

export class CreateCustomizationDto {
  @IsString()
  outcomeId: string;

  @IsObject()
  answers: Record<string, unknown>;
}
