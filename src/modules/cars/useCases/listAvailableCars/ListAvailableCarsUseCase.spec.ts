import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List available cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'teste',
      description: 'teste',
      daily_rate: 100,
      license_plate: 'teste',
      fine_amount: 0,
      brand: 'teste',
      category_id: 'teste',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'name_test',
      description: 'teste',
      daily_rate: 100,
      license_plate: 'teste',
      fine_amount: 0,
      brand: 'teste',
      category_id: 'teste',
    });

    const cars = await listAvailableCarsUseCase.execute({ name: car.name });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'name_test',
      description: 'teste',
      daily_rate: 100,
      license_plate: 'teste',
      fine_amount: 0,
      brand: 'car_brand_test',
      category_id: 'teste',
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: car.brand });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'name_test',
      description: 'teste',
      daily_rate: 100,
      license_plate: 'teste',
      fine_amount: 0,
      brand: 'car_brand_test',
      category_id: '12345',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: car.category_id,
    });

    expect(cars).toEqual([car]);
  });
});
