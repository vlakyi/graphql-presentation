import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { License } from './license.entity';

@Entity()
@ObjectType({ description: 'Car model' })
export class Car {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field(() => String, { description: 'car name' })
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany((type) => License, (license) => license.cars, { cascade: true })
  licenses?: License[];
}
