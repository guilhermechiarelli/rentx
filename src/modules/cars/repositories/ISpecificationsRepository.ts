import Specification from '../infra/typeorm/entities/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
  created_at?: Date;
}

interface ISpecificationsRepository {
  create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification>;
  list(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ICreateSpecificationDTO, ISpecificationsRepository };
