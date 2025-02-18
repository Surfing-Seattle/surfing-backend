export interface User {
  walletAddress: string;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface UserCreationAttributes {
  walletAddress: string;
}
