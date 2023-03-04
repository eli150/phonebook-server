import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class FetchContactsArgs {
  @Field(() => Int)
  @Min(0)
  skip: number;

  @Field(() => Int)
  @Min(1)
  take: number;

  @Field()
  searchQuery?: string = '';
}
