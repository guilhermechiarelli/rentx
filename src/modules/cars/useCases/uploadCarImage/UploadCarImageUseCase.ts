import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { IStorageProvider } from '@shared/containers/providers/StorageProvider/IStorageProvider';

interface IResquest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
    @inject('StorageProvider')
    private storaeProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: IResquest): Promise<void> {
    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
      await this.storaeProvider.save(image, 'cars');
    });
  }
}

export { UploadCarImageUseCase };
