import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICarsImagesRepository {
  create(car_id: string, imagename: string): Promise<CarImage>;
}

export { ICarsImagesRepository };
