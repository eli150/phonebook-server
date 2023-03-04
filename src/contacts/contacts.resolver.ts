import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { FetchContactsArgs } from './dto/fetch-contacts.input';
import { GetCountArgs } from './dto/get-count.input';

@Resolver(() => Contact)
export class ContactsResolver {
  constructor(private readonly contactsService: ContactsService) {}

  @Mutation(() => Contact)
  createContact(
    @Args('createContactInput') createContactInput: CreateContactInput,
  ) {
    return this.contactsService.create(createContactInput);
  }

  @Query(() => Number, { name: 'count' })
  getCount(@Args() args: GetCountArgs): Promise<number> {
    return this.contactsService.getCount(args);
  }

  @Query(() => [Contact], { name: 'contacts' })
  findAll(@Args() args: FetchContactsArgs): Promise<Contact[]> {
    return this.contactsService.findAll(args);
  }

  @Query(() => Contact, { name: 'contact' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.contactsService.findOne(id);
  }

  @Mutation(() => Contact)
  updateContact(
    @Args('updateContactInput') updateContactInput: UpdateContactInput,
  ) {
    return this.contactsService.update(
      updateContactInput.id,
      updateContactInput,
    );
  }

  @Mutation(() => Contact)
  removeContact(@Args('id', { type: () => Int }) id: number) {
    return this.contactsService.remove(id);
  }
}
