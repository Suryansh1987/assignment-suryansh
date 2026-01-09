import { pgTable, uuid, varchar, text, timestamp, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const roleEnum = pgEnum('role', ['user', 'assistant']);
export const weatherConditionEnum = pgEnum('weather_condition', [
  'clear',
  'clouds',
  'rain',
  'snow',
  'thunderstorm',
  'drizzle',
  'mist',
  'fog',
]);

// Users Table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),

  // Location information for weather
  city: varchar('city', { length: 100 }),
  prefecture: varchar('prefecture', { length: 100 }),

  // Farm details
  farmSize: varchar('farm_size', { length: 50 }), // e.g., "0.5ha", "2ha"
  cropTypes: jsonb('crop_types').$type<string[]>(), // ["rice", "tomato", "cucumber"]
  farmingMethods: jsonb('farming_methods').$type<string[]>(), // ["organic", "greenhouse"]

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Chat Sessions Table
export const chatSessions = pgTable('chat_sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(), // Auto-generated from first message
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Messages Table
export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionId: uuid('session_id')
    .notNull()
    .references(() => chatSessions.id, { onDelete: 'cascade' }),
  role: roleEnum('role').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Weather Logs Table (optional but valuable for analytics)
export const weatherLogs = pgTable('weather_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  city: varchar('city', { length: 100 }).notNull(),
  prefecture: varchar('prefecture', { length: 100 }),
  temperature: varchar('temperature', { length: 20 }), // "25°C"
  humidity: varchar('humidity', { length: 20 }), // "60%"
  rainfall: varchar('rainfall', { length: 20 }), // "0mm"
  weatherCondition: weatherConditionEnum('weather_condition'),
  description: varchar('description', { length: 255 }), // "partly cloudy"
  fetchedAt: timestamp('fetched_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  chatSessions: many(chatSessions),
}));

export const chatSessionsRelations = relations(chatSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [chatSessions.userId],
    references: [users.id],
  }),
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  session: one(chatSessions, {
    fields: [messages.sessionId],
    references: [chatSessions.id],
  }),
}));

// Type exports for use in application
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type ChatSession = typeof chatSessions.$inferSelect;
export type NewChatSession = typeof chatSessions.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type WeatherLog = typeof weatherLogs.$inferSelect;
export type NewWeatherLog = typeof weatherLogs.$inferInsert;
