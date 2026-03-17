export class RefreshToken {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly token: string,
    public readonly expiresAt: Date,
    public readonly revoked: boolean,
    public readonly createdAt: Date,
  ) {}

  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  isValid(): boolean {
    return !this.revoked && !this.isExpired();
  }
}