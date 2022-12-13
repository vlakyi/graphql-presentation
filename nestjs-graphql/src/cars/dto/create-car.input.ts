import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType({ description: 'Create car input object type.' })
export class CreateCarInput {
  @MinLength(3) // Validation example
  @Field(() => String, { description: 'A new car name' })
  name: string;
  brand: string;
  licenses: string[];
}
