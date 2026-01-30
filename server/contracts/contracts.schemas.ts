import { z } from "zod";

export const ContractStatusSchema = z.enum(["OPEN", "CLOSED"]);

export const CreateContractSchema = z
  .object({
    name: z.string().trim().min(1, "Contract name is required."),
    employeeId: z.string().min(1, "Employee is required."),
    status: ContractStatusSchema.default("OPEN"),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.endDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End date cannot be earlier than start date.",
      });
    }
  });

export const UpdateContractSchema = z
  .object({
    name: z.string().trim().min(1, "Contract name is required.").optional(),
    status: ContractStatusSchema.optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.startDate && data.endDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End date cannot be earlier than start date.",
      });
    }
  });
