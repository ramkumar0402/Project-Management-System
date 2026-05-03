import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').default('user'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(new Date()),
});

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  ownerId: text('owner_id').references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(new Date()),
});

export const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey(),
  projectId: text('project_id').references(() => projects.id),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status').default('To Do'),
  priority: text('priority').default('Medium'),
  assigneeId: text('assignee_id').references(() => users.id),
  dueDate: text('due_date'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(new Date()),
});
