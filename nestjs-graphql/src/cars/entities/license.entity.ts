import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './car.entity';

@Entity()
@ObjectType({ description: 'License model' })
export class License {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  licenseNo: string;

  @ManyToMany((type) => Car, (car) => car.licenses)
  cars: Car[];
}
