import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateContactInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  nickName?: string;

  @Field(() => [String], { nullable: true })
  phoneNumbers?: string[];

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  photoUrl?: string;
}
