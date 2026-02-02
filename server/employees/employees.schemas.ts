import { z } from "zod";

export const EmployeeStatusSchema = z.enum(["ACTIVE", "INACTIVE"]);

export const CreateEmployeeSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters."),
  lastName: z.string().min(3, "Last name must be at least 3 characters."),
  email: z.email(),
  status: EmployeeStatusSchema.default("ACTIVE"),
  workLocation: z
    .string()
    .min(3, "Work location must be at least 3 characters."),
});

export const UpdateEmployeeBasicSchema = CreateEmployeeSchema.pick({
  status: true,
  workLocation: true,
});

export type UpdateEmployeeBasicInput = z.infer<
  typeof UpdateEmployeeBasicSchema
>;
