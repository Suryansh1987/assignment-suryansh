import { z } from 'zod';

// Auth validation schemas
export const signupSchema = z.object({
  name: z.string().min(2, '名前は2文字以上で入力してください').max(255),
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください').max(100),
  city: z.string().min(1).max(100).optional(),
  prefecture: z.string().min(1).max(100).optional(),
});

export const signinSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(1, 'パスワードを入力してください'),
});

// User profile validation schemas
export const updateProfileSchema = z.object({
  name: z.string().min(2).max(255).optional(),
  city: z.string().min(1).max(100).optional(),
  prefecture: z.string().min(1).max(100).optional(),
  farmSize: z.string().max(50).optional(),
  cropTypes: z.array(z.string()).optional(),
  farmingMethods: z.array(z.string()).optional(),
});

// Chat validation schemas
export const createSessionSchema = z.object({
  title: z.string().min(1).max(255).optional(),
});

export const sendMessageSchema = z.object({
  sessionId: z.string().uuid('無効なセッションIDです'),
  content: z.string().min(1, 'メッセージを入力してください').max(5000),
});

export const sessionIdSchema = z.object({
  id: z.string().uuid('無効なセッションIDです'),
});

// Type exports
export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type CreateSessionInput = z.infer<typeof createSessionSchema>;
export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type SessionIdInput = z.infer<typeof sessionIdSchema>;
