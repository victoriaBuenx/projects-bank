export const HASH_SERVICE = 'HASH_SERVICE';

export interface IHashService {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}
