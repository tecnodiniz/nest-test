import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class userIdDTO {
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
