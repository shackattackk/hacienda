import { pgTable, text, decimal, date, jsonb, timestamp, uuid } from 'drizzle-orm/pg-core';

export const farms = pgTable('farms', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  size: decimal('size', { precision: 10, scale: 2 }),
  cropType: text('crop_type').notNull(),
  plantingDate: date('planting_date'),
  harvestDate: date('harvest_date'),
  notes: text('notes'),
  boundaries: jsonb('boundaries'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  userId: text('user_id').notNull(),
});
