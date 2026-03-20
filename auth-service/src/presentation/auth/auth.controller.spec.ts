import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LoginUseCase } from 'src/application/use-cases/login.usecase';
import { LogoutUseCase } from 'src/application/use-cases/logout.usecase';
import { RegisterUserUseCase } from 'src/application/use-cases/registerUser.usecase';
import { RefreshTokenUseCase } from 'src/application/use-cases/refreshToken/refreshToken.usecase';

describe('AuthController', () => {
  let controller: AuthController;
  let loginUseCase: any;
  let logoutUseCase: any;
  let registerUseCase: any;
  let refreshTokenUseCase: any;

  beforeEach(async () => {
    loginUseCase = { execute: jest.fn() };
    logoutUseCase = { execute: jest.fn() };
    registerUseCase = { execute: jest.fn() };
    refreshTokenUseCase = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: LoginUseCase, useValue: loginUseCase },
        { provide: LogoutUseCase, useValue: logoutUseCase },
        { provide: RegisterUserUseCase, useValue: registerUseCase },
        { provide: RefreshTokenUseCase, useValue: refreshTokenUseCase },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should call loginUseCase', async () => {
    loginUseCase.execute.mockResolvedValue({ token: '1' });
    const dto = { email: 'e', password: 'p' };
    const res = await controller.login(dto);
    expect(res).toEqual({ token: '1' });
    expect(loginUseCase.execute).toHaveBeenCalledWith(dto);
  });

  it('should call registerUseCase', async () => {
    registerUseCase.execute.mockResolvedValue({ id: '1' });
    const dto = { email: 'e', password: 'p', name: 'n', lastName: 'l', motherLastName: 'm' };
    const res = await controller.registerAdmin(dto);
    expect(res).toEqual({ id: '1' });
    expect(registerUseCase.execute).toHaveBeenCalledWith(dto);
  });

  it('should call logoutUseCase', async () => {
    logoutUseCase.execute.mockResolvedValue({ message: 'ok' });
    const dto = { userId: '1' };
    const res = await controller.logout(dto);
    expect(res).toEqual({ message: 'ok' });
    expect(logoutUseCase.execute).toHaveBeenCalledWith(dto);
  });

  it('should call refreshTokenUseCase', async () => {
    refreshTokenUseCase.execute.mockResolvedValue({ accessToken: 'newToken' });
    const dto = { refreshToken: 'rt' };
    const res = await controller.refresh(dto);
    expect(res).toEqual({ accessToken: 'newToken' });
    expect(refreshTokenUseCase.execute).toHaveBeenCalledWith(dto);
  });
});
