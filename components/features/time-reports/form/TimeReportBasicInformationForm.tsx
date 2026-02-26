"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UpdateTimeReportSchema } from "@/server/time-report/time-report.schema";
import {
  TimeReportBasicInformationFormProps,
  UpdateTimeReportInput,
} from "@/types/time-reports";
import { useToast } from "@/components/toast/ToastContext";

export default function TimeReportBasicInformationForm({
  id,
  employeeName,
  employeeEmail,
  initialStatus,
  initialDate,
  initialHours,
  initialDescription,
  isEditing,
  onStartEdit,
  onStopEdit,
}: TimeReportBasicInformationFormProps) {
  const router = useRouter();
  const { showToast } = useToast();

  const [status, setStatus] =
    useState<UpdateTimeReportInput["status"]>(initialStatus);
  const [date, setDate] = useState<string>(
    initialDate.toISOString().slice(0, 7),
  );
  const [hours, setHours] = useState<string>(initialHours.toString());
  const [description, setDescription] = useState<string>(initialDescription);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function resetForm() {
    setStatus(initialStatus);
    setDate(initialDate.toISOString().slice(0, 7));
    setHours(initialHours.toString());
    setDescription(initialDescription);
    setErrors({});
    setError(null);
  }

  function validate() {
    const result = UpdateTimeReportSchema.safeParse({
      status,
      date,
      hours,
      description,
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

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setErrors({});

    if (!validate()) return;

    setSubmitting(true);

    try {
      const res = await fetch(`/api/time-reports/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          date,
          hours,
          description,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data?.fieldErrors && typeof data.fieldErrors === "object") {
          setErrors(data.fieldErrors);
        }
        throw new Error(data?.error || "Failed to update time report.");
      }

      onStopEdit();
      setErrors({});
      router.refresh();
      showToast("Time report updated successfully!", "success");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleCancel() {
    resetForm();
    onStopEdit();
  }

  const formattedDate = new Date(initialDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
  });

  const statusBadgeClass =
    status === "APPROVED"
      ? "bg-success"
      : status === "REJECTED"
        ? "bg-danger"
        : status === "SUBMITTED"
          ? "bg-primary"
          : "bg-secondary";

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="card-title mb-0">Time Report Information</h5>

        {!isEditing && (
          <>
            {/* Desktop / tablet */}
            <button
              type="button"
              className="btn btn-primary px-4 d-none d-md-inline-block"
              onClick={onStartEdit}
            >
              Edit
            </button>

            {/* Mobile */}
            <button
              type="button"
              className="btn btn-primary btn-sm d-inline-flex d-md-none align-items-center gap-1"
              onClick={onStartEdit}
              aria-label="Edit time report"
            >
              <i className="bi bi-pencil-square"></i>
            </button>
          </>
        )}
      </div>

      <form onSubmit={handleSave}>
        <div className="row">
          <div className="col-12 col-md-4 mb-3">
            <strong>Employee</strong>
            <div className="text-muted">{employeeName}</div>
            {employeeEmail && (
              <div className="text-muted small">{employeeEmail}</div>
            )}
          </div>

          <div className="col-12 col-md-4 mb-3">
            <strong>Month</strong>
            <div>
              {isEditing ? (
                <>
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
                      return (
                        <option
                          key={month}
                          value={`${new Date().getFullYear()}-${month}`}
                        >
                          {new Date(0, i).toLocaleString("default", {
                            month: "long",
                          })}
                        </option>
                      );
                    })}
                  </select>
                  {errors.date && (
                    <div className="invalid-feedback">{errors.date}</div>
                  )}
                </>
              ) : (
                <span className="text-muted">{formattedDate}</span>
              )}
            </div>
          </div>

          <div className="col-12 col-md-4 mb-3">
            <strong>Hours</strong>
            <div>
              {isEditing ? (
                <>
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    max="200"
                    className={`form-control form-control-sm ${
                      errors.hours ? "is-invalid" : ""
                    }`}
                    value={hours}
                    onChange={(e) => {
                      setHours(e.target.value);
                      if (errors.hours) {
                        setErrors((prev) => ({ ...prev, hours: "" }));
                      }
                    }}
                    placeholder="e.g. 144"
                  />
                  {errors.hours && (
                    <div className="invalid-feedback">{errors.hours}</div>
                  )}
                </>
              ) : (
                <span className="text-muted">{hours} h</span>
              )}
            </div>
          </div>

          <div className="col-12 col-md-4 mb-3">
            <strong>Status</strong>
            <div>
              {isEditing ? (
                <>
                  <select
                    className={`form-select form-select-sm ${
                      errors.status ? "is-invalid" : ""
                    }`}
                    value={status ?? "DRAFT"}
                    onChange={(e) =>
                      setStatus(
                        e.target.value as UpdateTimeReportInput["status"],
                      )
                    }
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                  {errors.status && (
                    <div className="invalid-feedback">{errors.status}</div>
                  )}
                </>
              ) : (
                <span className={`badge ${statusBadgeClass}`}>{status}</span>
              )}
            </div>
          </div>

          <div className="col-12 col-md-8 mb-3">
            <strong>Description</strong>
            <div>
              {isEditing ? (
                <>
                  <textarea
                    className={`form-control form-control-sm ${
                      errors.description ? "is-invalid" : ""
                    }`}
                    rows={3}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (errors.description) {
                        setErrors((prev) => ({ ...prev, description: "" }));
                      }
                    }}
                    placeholder="What did they work on?"
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </>
              ) : (
                <span className="text-muted">
                  {description ? description : "—"}
                </span>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger py-2 mb-0 mb-3">{error}</div>
        )}

        {isEditing && (
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleCancel}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success btn-sm"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </form>
    </>
  );
}
