"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { CreateContractSchema } from "@/server/contracts/contracts.schemas";
import { useToast } from "../../toast/ToastContext";

type CreateContractInput = z.infer<typeof CreateContractSchema>;

type EmployeeOption = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type ContractCreateFormProps = {
  onCreated: () => void;
  employees: EmployeeOption[];
};

export default function ContractCreateForm({
  onCreated,
  employees,
}: ContractCreateFormProps) {
  const router = useRouter();
  const { showToast } = useToast();

  const [employeeId, setEmployeeId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<CreateContractInput["status"]>("OPEN");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function resetForm() {
    setName("");
    setEmployeeId("");
    setStatus("OPEN");
    setStartDate("");
    setEndDate("");
    setErrors({});
    setError(null);
  }

  function validate() {
    const result = CreateContractSchema.safeParse({
      name,
      employeeId,
      status,
      startDate,
      endDate: endDate || null,
    });

    if (result.success) {
      setErrors({});
      return true;
    }

    const fieldErrors: Record<string, string> = {};

    for (const issue of result.error.issues) {
      const path = issue.path[0];
      if (typeof path === "string" && !fieldErrors[path]) {
        fieldErrors[path] = issue.message;
      }
    }

    setErrors(fieldErrors);
    return false;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/contracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          employeeId,
          status,
          startDate,
          endDate: endDate || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));

        if (data?.fieldErrors && typeof data.fieldErrors === "object") {
          setErrors(data.fieldErrors);
        }

        throw new Error(
          data?.error || "Failed to create contract. Please try again.",
        );
      }

      resetForm();
      router.refresh();
      showToast("Contract created successfully!", "success");

      onCreated();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">Create New Contract</h5>

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="name">
              Contract Name
            </label>
            <input
              id="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((p) => ({ ...p, name: "" }));
              }}
              placeholder="e.g. Full-Time Employment"
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="col-md-4">
            <label className="form-label" htmlFor="employeeId">
              Employee
            </label>
            <select
              id="employeeId"
              className={`form-select ${errors.employeeId ? "is-invalid" : ""}`}
              value={employeeId}
              onChange={(e) => {
                setEmployeeId(e.target.value);
                if (errors.employeeId) {
                  setErrors((p) => ({ ...p, employeeId: "" }));
                }
              }}
            >
              <option value="">Select employee...</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName} ({emp.email})
                </option>
              ))}
            </select>
            {errors.employeeId && (
              <div className="invalid-feedback">{errors.employeeId}</div>
            )}
          </div>

          <div className="col-md-4">
            <label className="form-label" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              className={`form-select ${errors.status ? "is-invalid" : ""}`}
              value={status ?? "OPEN"}
              onChange={(e) => {
                setStatus(e.target.value as CreateContractInput["status"]);
                if (errors.status) setErrors((p) => ({ ...p, status: "" }));
              }}
            >
              <option value="OPEN">OPEN</option>
              <option value="CLOSED">CLOSED</option>
            </select>
            {errors.status && (
              <div className="invalid-feedback">{errors.status}</div>
            )}
          </div>

          <div className="col-md-4">
            <label className="form-label" htmlFor="startDate">
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              className={`form-control ${errors.startDate ? "is-invalid" : ""}`}
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                if (errors.startDate)
                  setErrors((p) => ({ ...p, startDate: "" }));
              }}
            />
            {errors.startDate && (
              <div className="invalid-feedback">{errors.startDate}</div>
            )}
          </div>

          <div className="col-md-4">
            <label className="form-label" htmlFor="endDate">
              End Date (optional)
            </label>
            <input
              id="endDate"
              type="date"
              className={`form-control ${errors.endDate ? "is-invalid" : ""}`}
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                if (errors.endDate) setErrors((p) => ({ ...p, endDate: "" }));
              }}
            />
            {errors.endDate && (
              <div className="invalid-feedback">{errors.endDate}</div>
            )}
          </div>

          {error && (
            <div className="col-12">
              <div className="alert alert-danger py-2 mb-0">{error}</div>
            </div>
          )}

          <div className="col-12 d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-success"
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create Contract"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
