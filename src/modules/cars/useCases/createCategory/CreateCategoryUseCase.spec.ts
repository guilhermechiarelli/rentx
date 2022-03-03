import { AppError } from '../../../../shared/errors/AppError';
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('Should be able to create a new category', async () => {
    await createCategoryUseCase.execute({
      name: 'Category test',
      description: 'Category description test',
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      'Category test'
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('Should not be able to create a new category if the name already exists', async () => {
    await createCategoryUseCase.execute({
      name: 'Category test',
      description: 'Category description test',
    });

    await expect(
      createCategoryUseCase.execute({
        name: 'Category test',
        description: 'Category description test',
      })
    ).rejects.toEqual(new AppError('Category already exists.'));
  });
});
