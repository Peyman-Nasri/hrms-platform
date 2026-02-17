"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { UpdateEmployeeBasicSchema } from "@/server/employees/employees.schemas";

import {
  EmployeeBasicInformationFormProps,
  UpdateEmployeeBasicInput,
} from "@/types/employees";
import { useToast } from "@/components/toast/ToastContext";

export default function EmployeeBasicInformationForm({
  id,
  email,
  initialStatus,
  initialWorkLocation,
  isEditing,
  onStartEdit,
  onStopEdit,
}: EmployeeBasicInformationFormProps) {
  const router = useRouter();
  const { showToast } = useToast();

  const [status, setStatus] =
    useState<UpdateEmployeeBasicInput["status"]>(initialStatus);
  const [workLocation, setWorkLocation] = useState<
    UpdateEmployeeBasicInput["workLocation"]
  >(initialWorkLocation ?? "");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isActive = useMemo(() => status === "ACTIVE", [status]);

  function resetForm() {
    setStatus(initialStatus);
    setWorkLocation(initialWorkLocation ?? "");
    setErrors({});
    setError(null);
  }

  function validate() {
    const result = UpdateEmployeeBasicSchema.safeParse({
      status,
      workLocation,
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
      const res = await fetch(`/api/employees/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          workLocation,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data?.fieldErrors && typeof data.fieldErrors === "object") {
          setErrors(data.fieldErrors);
        }
        throw new Error(data?.error || "Failed to update employee.");
      }

      onStopEdit();
      setErrors({});
      router.refresh();
      showToast("Employee updated successfully!", "success");
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

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="card-title mb-0">Basic Information</h5>

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
              aria-label="Edit"
            >
              <i className="bi bi-pencil-square"></i>
            </button>
          </>
        )}
      </div>

      <form onSubmit={handleSave}>
        <div className="row">
          <div className="col-12 col-md-4 mb-3">
            <strong>Email</strong>
            <div className="text-muted">{email}</div>
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
                    value={status}
                    onChange={(e) =>
                      setStatus(
                        e.target.value as UpdateEmployeeBasicInput["status"],
                      )
                    }
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                  {errors.status && (
                    <div className="invalid-feedback">{errors.status}</div>
                  )}
                </>
              ) : (
                <span
                  className={`badge ${isActive ? "bg-success" : "bg-secondary"}`}
                >
                  {status}
                </span>
              )}
            </div>
          </div>

          <div className="col-12 col-md-4 mb-3">
            <strong>Work Location</strong>
            <div>
              {isEditing ? (
                <>
                  <input
                    className={`form-control form-control-sm ${
                      errors.workLocation ? "is-invalid" : ""
                    }`}
                    value={workLocation ?? ""}
                    onChange={(e) => {
                      setWorkLocation(e.target.value);
                      if (errors.workLocation) {
                        setErrors((prev) => ({ ...prev, workLocation: "" }));
                      }
                    }}
                    placeholder="e.g. Stockholm"
                  />
                  {errors.workLocation && (
                    <div className="invalid-feedback">
                      {errors.workLocation}
                    </div>
                  )}
                </>
              ) : (
                <span className="text-muted">{workLocation || "—"}</span>
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
