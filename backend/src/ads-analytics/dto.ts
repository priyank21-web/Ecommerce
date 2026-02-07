import { IsObject, IsString } from 'class-validator';

export class TrackEventDto {
  @IsString()
  type: string;

  @IsObject()
  payload: Record<string, unknown>;
}
