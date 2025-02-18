import { UserModel, UserDocument } from '../models/user.model';

export class UserService {
  /**
   * Find or create a user by wallet address
   */
  static async findOrCreateByWallet(walletAddress: string): Promise<UserDocument> {
    try {
      let user = await UserModel.findOne({ walletAddress });
      
      if (!user) {
        // Create new user if not found
        user = await UserModel.create({
          walletAddress,
          lastLogin: new Date()
        });
      } else {
        // Update last login
        await user.updateLastLogin();
      }

      return user;
    } catch (error) {
      console.error('Error in findOrCreateByWallet:', error);
      throw error;
    }
  }

  /**
   * Get user by wallet address
   */
  static async getByWallet(walletAddress: string): Promise<UserDocument | null> {
    try {
      return await UserModel.findOne({ walletAddress });
    } catch (error) {
      console.error('Error in getByWallet:', error);
      throw error;
    }
  }

  /**
   * Deactivate user
   */
  static async deactivateUser(walletAddress: string): Promise<boolean> {
    try {
      const result = await UserModel.updateOne(
        { walletAddress },
        { isActive: false }
      );
      return result.modifiedCount > 0;
    } catch (error) {
      console.error('Error in deactivateUser:', error);
      throw error;
    }
  }
}
