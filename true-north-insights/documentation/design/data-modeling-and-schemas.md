# Data Modeling & Schemas — Strongly Typed DTOs End‑to‑End

## Shared DTOs (TypeScript)
```ts
// libs/shared/api-interfaces/src/lib/dto.ts
export type Role = 'owner'|'admin'|'analyst'|'viewer'|'auditor';

export interface Tenant { id: string; name: string; createdAt: string; }

export interface UserDTO {
  id: string;
  tenantId: string;
  displayName: string;
  email: string;
  roles: Role[];
  createdAt: string;
}

export interface BoardDTO { id: string; tenantId: string; name: string; }
export interface CardDTO  { id: string; boardId: string; title: string; status: 'todo'|'doing'|'done'; assignees: string[]; }

export interface TimeEntryDTO {
  id: string;
  tenantId: string;
  cardId: string;
  userId: string;
  date: string;    // YYYY-MM-DD
  minutes: number; // <= 960
  note?: string;
  createdAt: string; createdBy: string;
  updatedAt?: string; updatedBy?: string;
}

export interface AuditEvent {
  id: string;
  ts: string;
  tenantId: string;
  userId?: string;
  type:
    | 'auth.login' | 'auth.mfa' | 'auth.logout'
    | 'rbac.role.add' | 'rbac.role.remove'
    | 'card.create' | 'card.update'
    | 'time.create' | 'time.update' | 'time.delete'
    | 'config.update'
  ;
  payload: Record<string, unknown>;
}
```

## Validation (Class‑Validator / Zod)
```ts
// apps/backend/src/validation/time-entry.schema.ts
import { IsString, IsInt, Min, Max, IsDateString } from 'class-validator';

export class CreateTimeEntrySchema {
  @IsString() cardId!: string;
  @IsString() userId!: string;
  @IsDateString() date!: string;
  @IsInt() @Min(1) @Max(960) minutes!: number;
  note?: string;
}
```

## SQL: TypeORM Entities (JPA‑style)
```ts
// apps/backend/src/sql/entities/time-entry.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('time_entries')
@Index(['tenantId', 'date'])
export class TimeEntryEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ type: 'uuid' }) tenantId!: string;
  @Column({ type: 'uuid' }) cardId!: string;
  @Column({ type: 'uuid' }) userId!: string;
  @Column('date') date!: string;
  @Column('int') minutes!: number;
  @Column('text', { nullable: true }) note?: string;
  @Column('timestamptz', { default: () => 'now()' }) createdAt!: string;
  @Column('text') createdBy!: string;
  @Column('timestamptz', { nullable: true }) updatedAt?: string;
  @Column('text', { nullable: true }) updatedBy?: string;
}
```

## Mongo: Mongoose Schemas
```ts
// apps/backend/src/mongo/schemas/time-entry.schema.ts
import { Schema } from 'mongoose';

export const TimeEntrySchema = new Schema({
  tenantId: { type: String, index: true, required: true },
  cardId:   { type: String, index: true, required: true },
  userId:   { type: String, index: true, required: true },
  date:     { type: String, required: true }, // YYYY-MM-DD
  minutes:  { type: Number, min: 1, max: 960, required: true },
  note:     { type: String },
  createdAt:{ type: Date, default: () => new Date() },
  createdBy:{ type: String, required: true },
  updatedAt:{ type: Date },
  updatedBy:{ type: String },
}, { versionKey: false });
```

## Repository Abstraction
```ts
// libs/shared/api-interfaces/src/lib/repositories.ts
import { TimeEntryDTO } from './dto';

export interface TimeEntryRepo {
  create(input: Omit<TimeEntryDTO,'id'|'createdAt'|'updatedAt'|'updatedBy'>): Promise<TimeEntryDTO>;
  update(id: string, patch: Partial<TimeEntryDTO>): Promise<TimeEntryDTO>;
  delete(id: string): Promise<void>;
  findByCard(cardId: string): Promise<TimeEntryDTO[]>;
  summaryByUser(tenantId: string, range: 'today'|'week'): Promise<{userId: string; minutes: number;}[]>;
}
```
