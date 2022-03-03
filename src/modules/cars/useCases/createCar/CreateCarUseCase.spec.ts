import { AppError } from '@shared/errors/AppError';

import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'teste',
      description: 'teste',
      daily_rate: 100,
      license_plate: 'teste',
      fine_amount: 0,
      brand: 'teste',
      category_id: 'teste',
    });

    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a car with the same license plate', async () => {
    await createCarUseCase.execute({
      name: 'teste',
      description: 'teste',
      daily_rate: 100,
      license_plate: 'teste',
      fine_amount: 0,
      brand: 'teste',
      category_id: 'teste',
    });

    await expect(
      createCarUseCase.execute({
        name: 'teste',
        description: 'teste',
        daily_rate: 100,
        license_plate: 'teste',
        fine_amount: 0,
        brand: 'teste',
        category_id: 'teste',
      })
    ).rejects.toEqual(new AppError('Car already exists'));
  });

  it('Should not be able to create a car whit the same license plate', async () => {
    const car = await createCarUseCase.execute({
      name: 'teste',
      description: 'teste',
      daily_rate: 100,
      license_plate: 'teste',
      fine_amount: 0,
      brand: 'teste',
      category_id: 'teste',
    });

    expect(car.available).toBe(true);
  });
});
