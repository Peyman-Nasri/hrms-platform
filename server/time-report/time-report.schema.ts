import { z } from "zod";

export const TimeReportStatusSchema = z.enum([
  "DRAFT",
  "SUBMITTED",
  "APPROVED",
  "REJECTED",
]);

export const CreateTimeReportSchema = z.object({
  employeeId: z.string().min(1),
  contractId: z.string().min(1).optional().nullable(),
  date: z.coerce.date(),
  hours: z.coerce.number().min(0).max(24),
  description: z.string().max(1000).optional().nullable(),
  status: TimeReportStatusSchema.default("DRAFT"),
});

export const UpdateTimeReportSchema = z.object({
  date: z.coerce.date().optional(),
  hours: z.coerce.number().min(0).max(24).optional(),
  description: z.string().max(1000).optional().nullable(),
  status: TimeReportStatusSchema.optional(),
});
