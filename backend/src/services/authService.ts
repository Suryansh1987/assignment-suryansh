import { eq } from 'drizzle-orm';
import { db } from '../config/database';
import { users, type User, type NewUser } from '../db/schema';
import { hashPassword, comparePassword } from '../utils/passwordHelper';
import { generateToken } from '../utils/jwtHelper';
import {
  AuthenticationError,
  ConflictError,
  ValidationError,
} from '../utils/errorClasses';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import type { SignupInput, SigninInput } from '../utils/validators';

export interface AuthResponse {
  user: Omit<User, 'passwordHash'>;
  token: string;
}

/**
 * Register a new user
 * @param input - User signup data
 * @returns User object and JWT token
 */
export async function signup(input: SignupInput): Promise<AuthResponse> {
  // Check if user already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, input.email))
    .limit(1);

  if (existingUser.length > 0) {
    throw new ConflictError(ERROR_MESSAGES.auth.emailExists);
  }

  // Hash password
  const passwordHash = await hashPassword(input.password);

  // Create new user
  const newUser: NewUser = {
    name: input.name,
    email: input.email,
    passwordHash,
    city: input.city,
    prefecture: input.prefecture,
  };

  const [createdUser] = await db.insert(users).values(newUser).returning();

  if (!createdUser) {
    throw new Error('ユーザーの作成に失敗しました');
  }

  // Generate JWT token
  const token = generateToken({
    userId: createdUser.id,
    email: createdUser.email,
  });

  // Return user without password hash
  const { passwordHash: _, ...userWithoutPassword } = createdUser;

  return {
    user: userWithoutPassword,
    token,
  };
}

/**
 * Sign in an existing user
 * @param input - User signin data
 * @returns User object and JWT token
 */
export async function signin(input: SigninInput): Promise<AuthResponse> {
  // Find user by email
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, input.email))
    .limit(1);

  if (!user) {
    throw new AuthenticationError(ERROR_MESSAGES.auth.invalidCredentials);
  }

  // Verify password
  const isPasswordValid = await comparePassword(input.password, user.passwordHash);

  if (!isPasswordValid) {
    throw new AuthenticationError(ERROR_MESSAGES.auth.invalidCredentials);
  }

  // Generate JWT token
  const token = generateToken({
    userId: user.id,
    email: user.email,
  });

  // Return user without password hash
  const { passwordHash: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
  };
}

/**
 * Get user by ID
 * @param userId - User ID
 * @returns User object without password
 */
export async function getUserById(userId: string): Promise<Omit<User, 'passwordHash'>> {
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

  if (!user) {
    throw new AuthenticationError(ERROR_MESSAGES.auth.userNotFound);
  }

  const { passwordHash: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
