import { eq } from 'drizzle-orm';
import { db } from '../config/database';
import { users, type User } from '../db/schema';
import { NotFoundError } from '../utils/errorClasses';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import type { UpdateProfileInput } from '../utils/validators';

/**
 * Get user profile by ID
 * @param userId - User ID
 * @returns User profile without password
 */
export async function getUserProfile(userId: string): Promise<Omit<User, 'passwordHash'>> {
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

  if (!user) {
    throw new NotFoundError(ERROR_MESSAGES.user.notFound);
  }

  const { passwordHash: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Update user profile
 * @param userId - User ID
 * @param input - Profile update data
 * @returns Updated user profile
 */
export async function updateUserProfile(
  userId: string,
  input: UpdateProfileInput
): Promise<Omit<User, 'passwordHash'>> {
  // Check if user exists
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!existingUser) {
    throw new NotFoundError(ERROR_MESSAGES.user.notFound);
  }

  // Update user
  const [updatedUser] = await db
    .update(users)
    .set({
      ...input,
      updatedAt: new Date(),
    } as any)
    .where(eq(users.id, userId))
    .returning();

  if (!updatedUser) {
    throw new Error(ERROR_MESSAGES.user.updateFailed);
  }

  const { passwordHash: _, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
}

/**
 * Delete user account
 * @param userId - User ID
 */
export async function deleteUserAccount(userId: string): Promise<void> {
  const result = await db.delete(users).where(eq(users.id, userId)).returning();

  if (result.length === 0) {
    throw new NotFoundError(ERROR_MESSAGES.user.notFound);
  }
}
