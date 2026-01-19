import { z } from "zod";

export const EmployeeStatusSchema = z.enum(["ACTIVE", "INACTIVE"]);

export const CreateEmployeeSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.email(),
  status: EmployeeStatusSchema.default("ACTIVE"),
  workLocation: z.string().min(3),
});

export const UpdateEmployeeBasicSchema = CreateEmployeeSchema.pick({
  status: true,
  workLocation: true,
});

export type UpdateEmployeeBasicInput = z.infer<
  typeof UpdateEmployeeBasicSchema
>;
