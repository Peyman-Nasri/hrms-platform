"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { CreateTimeReportSchema } from "@/server/time-report/time-report.schema";
import {
  CreateTimeReportInput,
  TimeReportCreateFormProps,
} from "@/types/time-reports";
import { useToast } from "@/components/toast/ToastContext";

export default function TimeReportCreateForm({
  onCreated,
  employeesWithContracts,
}: TimeReportCreateFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const currentYear = new Date().getFullYear();
  const [employeeId, setEmployeeId] = useState<string>("");
  const [contractId, setContractId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] =
    useState<CreateTimeReportInput["status"]>("DRAFT");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedEmployee = useMemo(
    () => employeesWithContracts.find((e) => e.id === employeeId),
    [employeesWithContracts, employeeId],
  );

  const availableContracts = selectedEmployee?.contracts ?? [];

  function resetForm() {
    setEmployeeId("");
    setContractId("");
    setDate("");
    setHours("");
    setDescription("");
    setStatus("DRAFT");
    setErrors({});
    setError(null);
  }

  function validate() {
    const result = CreateTimeReportSchema.safeParse({
      employeeId,
      contractId: contractId || null,
      date,
      hours,
      description: description || null,
      status,
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
      const res = await fetch("/api/time-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId,
          contractId: contractId || null,
          date,
          hours,
          description: description || null,
          status,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));

        if (data?.fieldErrors && typeof data.fieldErrors === "object") {
          setErrors(data.fieldErrors);
        }

        throw new Error(
          data?.error || "Failed to create time report. Please try again.",
        );
      }

      resetForm();
      router.refresh();
      showToast("Time report created successfully!", "success");

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
        <h5 className="card-title mb-3">Create New Time Report</h5>

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="employeeId">
              Employee
            </label>
            <select
              id="employeeId"
              className={`form-select ${errors.employeeId ? "is-invalid" : ""}`}
              value={employeeId}
              onChange={(e) => {
                const newEmployeeId = e.target.value;
                setEmployeeId(newEmployeeId);
                setContractId("");
                if (errors.employeeId) {
                  setErrors((p) => ({ ...p, employeeId: "" }));
                }
                if (errors.contractId) {
                  setErrors((p) => ({ ...p, contractId: "" }));
                }
              }}
            >
              <option value="">Select employee...</option>
              {employeesWithContracts.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName} ({emp.email})
                </option>
              ))}
            </select>
            {errors.employeeId && (
              <div className="invalid-feedback">{errors.employeeId}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="contractId">
              Contract
            </label>
            <select
              id="contractId"
              className={`form-select ${errors.contractId ? "is-invalid" : ""}`}
              value={contractId}
              onChange={(e) => {
                setContractId(e.target.value);
                if (errors.contractId) {
                  setErrors((p) => ({ ...p, contractId: "" }));
                }
              }}
              disabled={!employeeId || availableContracts.length === 0}
            >
              {!employeeId && (
                <option value="">Select an employee first...</option>
              )}
              {employeeId && availableContracts.length === 0 && (
                <option value="">No contracts for this employee</option>
              )}
              {employeeId && availableContracts.length > 0 && (
                <>
                  <option value="">Select contract...</option>
                  {availableContracts.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </>
              )}
            </select>
            {errors.contractId && (
              <div className="invalid-feedback">{errors.contractId}</div>
            )}
          </div>

          <div className="col-md-4">
            <label className="form-label" htmlFor="date">
              Month
            </label>
            <select
              id="date"
              className={`form-select ${errors.date ? "is-invalid" : ""}`}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                if (errors.date) setErrors((p) => ({ ...p, date: "" }));
              }}
            >
              <option value="">Select month...</option>
              {Array.from({ length: 12 }).map((_, i) => {
                const month = String(i + 1).padStart(2, "0");
                const value = `${currentYear}-${month}`;
                const label = new Date(currentYear, i).toLocaleString(
                  undefined,
                  { month: "long" },
                );

                return (
                  <option key={value} value={value}>
                    {label}
                  </option>
                );
              })}
            </select>
            {errors.date && (
              <div className="invalid-feedback">{errors.date}</div>
            )}
          </div>

          <div className="col-md-4">
            <label className="form-label" htmlFor="hours">
              Hours
            </label>
            <input
              id="hours"
              type="number"
              step="0.25"
              min="0"
              max="200"
              className={`form-control ${errors.hours ? "is-invalid" : ""}`}
              value={hours}
              onChange={(e) => {
                setHours(e.target.value);
                if (errors.hours) setErrors((p) => ({ ...p, hours: "" }));
              }}
              placeholder="e.g. 144"
            />
            {errors.hours && (
              <div className="invalid-feedback">{errors.hours}</div>
            )}
          </div>

          <div className="col-md-4">
            <label className="form-label" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              className={`form-select ${errors.status ? "is-invalid" : ""}`}
              value={status}
              onChange={(e) => {
                setStatus(e.target.value as CreateTimeReportInput["status"]);
                if (errors.status) setErrors((p) => ({ ...p, status: "" }));
              }}
            >
              <option value="DRAFT">DRAFT</option>
              <option value="SUBMITTED">SUBMITTED</option>
              <option value="APPROVED">APPROVED</option>
              <option value="REJECTED">REJECTED</option>
            </select>
            {errors.status && (
              <div className="invalid-feedback">{errors.status}</div>
            )}
          </div>

          <div className="col-md-12">
            <label className="form-label" htmlFor="description">
              Description (optional)
            </label>
            <textarea
              id="description"
              className={`form-control ${
                errors.description ? "is-invalid" : ""
              }`}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description)
                  setErrors((p) => ({ ...p, description: "" }));
              }}
              rows={2}
              placeholder="What did they work on?"
            />
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
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
              {submitting ? "Creating..." : "Create Time Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
