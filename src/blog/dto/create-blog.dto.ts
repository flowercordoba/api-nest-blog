import { IsString, Length } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @Length(3, 255)
  title: string;

  @IsString()
  content: string;

  
}
