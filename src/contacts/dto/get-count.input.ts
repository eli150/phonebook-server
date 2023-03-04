import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetCountArgs {
  @Field()
  searchQuery?: string = '';
}
