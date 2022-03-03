import { DayjsDateProvider } from '@shared/containers/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/containers/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '../../repositories/in-memory/UsersTokensReposioryInMemory';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it('Should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    const user = await usersRepositoryInMemory.create({
      driver_license: '123456',
      email: 'teste@teste.com',
      name: 'Test',
      password: '123456',
    });

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to send email if user does not exist', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('fake@email.com')
    ).rejects.toEqual(new AppError('User does not exist'));
  });

  it('Should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create'
    );

    const user = await usersRepositoryInMemory.create({
      driver_license: '1234',
      email: 'teste2@teste.com',
      name: 'Test',
      password: '123456',
    });

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(generateTokenMail).toBeCalled();
  });
});
