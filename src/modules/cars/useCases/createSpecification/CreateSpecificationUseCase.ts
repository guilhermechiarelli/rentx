import { inject, injectable } from 'tsyringe';

import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';

import { AppError } from '../../../../shared/errors/AppError';
import Specification from '../../infra/typeorm/entities/Specification';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: SpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const specificationExists = await this.specificationRepository.findByName(
      name
    );

    if (specificationExists) {
      throw new AppError('Specification already exists.');
    }

    const specification = await this.specificationRepository.create({
      name,
      description,
    });

    return specification;
  }
}

export { CreateSpecificationUseCase };
