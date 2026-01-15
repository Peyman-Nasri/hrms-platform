import { z } from "zod";

export const EmployeeStatusSchema = z.enum(["ACTIVE", "INACTIVE"]);

export const CreateEmployeeSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  status: EmployeeStatusSchema.optional(),
  workLocation: z.string().min(1).optional().nullable(),
});

export const UpdateEmployeeSchema = CreateEmployeeSchema.partial();
