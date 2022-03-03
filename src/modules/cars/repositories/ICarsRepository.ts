import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { IListCarsDTO } from '../dtos/IListCarsDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(licence_plate: string): Promise<Car>;
  findAvailable(data: IListCarsDTO): Promise<Car[]>;
  findById(car_id: string): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
