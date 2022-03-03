import { inject, injectable } from 'tsyringe';

import Specification from '../../infra/typeorm/entities/Specification';
import { SpecificationsRepository } from '../../infra/typeorm/repositories/SpecificationsRepository';

@injectable()
class ListSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: SpecificationsRepository
  ) {}

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationRepository.list();

    return specifications;
  }
}

export { ListSpecificationUseCase };
