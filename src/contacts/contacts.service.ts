import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { table } from 'console';
import { Like, Repository } from 'typeorm';
import { CreateContactInput } from './dto/create-contact.input';
import { FetchContactsArgs } from './dto/fetch-contacts.input';
import { GetCountArgs } from './dto/get-count.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact) private contactsRepository: Repository<Contact>,
  ) {}

  create(createContactInput: CreateContactInput) {
    const newContact = this.contactsRepository.create(createContactInput);
    return this.contactsRepository.save(newContact);
  }

  async getCount(args: GetCountArgs): Promise<number> {
    let count: number;
    if (args.searchQuery === '') {
      count = await this.contactsRepository.count();
    } else {
      count = await this.contactsRepository.count({
        where: [
          { firstName: Like(`%${args.searchQuery}%`) },
          { nickName: Like(`%${args.searchQuery}%`) },
        ],
      });
    }

    return count;
  }

  async findAll(args: FetchContactsArgs): Promise<Contact[]> {
    const contacts =
      args.searchQuery === ''
        ? await this.contactsRepository.find({
            skip: args.skip,
            take: args.take,
            order: {
              firstName: 'ASC',
              nickName: 'ASC',
            },
          })
        : await this.contactsRepository.find({
            skip: args.skip,
            take: args.take,
            order: {
              firstName: 'ASC',
              nickName: 'ASC',
            },
            where: [
              { firstName: Like(`%${args.searchQuery}%`) },
              { nickName: Like(`%${args.searchQuery}%`) },
            ],
          });

    return contacts;
  }

  findOne(id: number) {
    return this.contactsRepository.findOneBy({ id });
  }

  async update(id: number, updateContactInput: UpdateContactInput) {
    const contact = await this.findOne(id);
    return this.contactsRepository.save({ ...contact, ...updateContactInput });
  }

  async remove(id: number) {
    const foundContact = await this.findOne(id);
    return this.contactsRepository.remove(foundContact);
  }
}
