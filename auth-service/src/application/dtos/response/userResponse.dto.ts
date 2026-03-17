export class UserResponseDto{
  id: string;
  email: string;
  passwordHash: string;
  isActive: boolean;
  role: 'ADMIN' | 'USER';
}