import { z } from "zod";

export const ContractStatusSchema = z.enum(["OPEN", "CLOSED"]);

export const CreateContractSchema = z.object({
  employeeId: z.string().min(1),
  status: ContractStatusSchema.optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional().nullable(),
});

export const UpdateContractSchema = z.object({
  status: ContractStatusSchema.optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional().nullable(),
});
