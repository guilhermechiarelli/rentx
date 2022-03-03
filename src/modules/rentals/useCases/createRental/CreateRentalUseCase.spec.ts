import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/containers/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create rental', () => {
  const dayAdded24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it('Should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'test',
      description: 'car test',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 40,
      category_id: '1234',
      brand: 'brand',
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '12345',
      expected_return_date: dayAdded24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create a new rental if theres another open to the same user', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '11111',
      user_id: '12345',
      expected_return_date: dayAdded24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: '12345',
        user_id: '12345',
        expected_return_date: dayAdded24Hours,
      })
    ).rejects.toEqual(
      new AppError('There is a rental in progress for the user.')
    );
  });

  it('Should not be able to create a new rental if theres another open to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '11111',
      user_id: '12345',
      expected_return_date: dayAdded24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: '11111',
        user_id: 'teste',
        expected_return_date: dayAdded24Hours,
      })
    ).rejects.toEqual(new AppError('The car is unavailable'));
  });

  it('Should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: '12345',
        user_id: 'teste',
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError('Invalid return time'));
  });
});
