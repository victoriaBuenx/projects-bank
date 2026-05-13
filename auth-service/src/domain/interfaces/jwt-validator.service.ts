export const JWT_VALIDATOR_SERVICE = 'JWT_VALIDATOR_SERVICE';

export interface IJwtValidatorService {
  validateToken(token: string): Promise<any>;
}
