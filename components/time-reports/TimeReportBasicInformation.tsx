"use client";

import { useState } from "react";
import TimeReportBasicInformationForm from "./form/TimeReportBasicInformationForm";
import { TimeReportBasicInformationProps } from "@/types/time-reports";

export default function TimeReportBasicInformation({
  id,
  employeeName,
  employeeEmail,
  status,
  date,
  hours,
  description,
  contract,
}: TimeReportBasicInformationProps) {
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (value: Date | string | null | undefined) =>
    value ? new Date(value).toLocaleDateString() : "—";

  return (
    <div className="card mb-4">
      <div className="card-body">
        <TimeReportBasicInformationForm
          id={id}
          employeeName={employeeName}
          employeeEmail={employeeEmail}
          initialStatus={status}
          initialDate={date}
          initialHours={hours}
          initialDescription={description ?? ""}
          isEditing={isEditing}
          onStartEdit={() => setIsEditing(true)}
          onStopEdit={() => setIsEditing(false)}
        />
        <hr className="my-3" />
        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">Contract Information</h5>
          </div>
          <div className="row">
            <div className="col-12 col-md-3 mb-3">
              <strong>Name</strong>
              <div>{contract?.name ?? "—"}</div>
            </div>

            <div className="col-12 col-md-3 mb-3">
              <strong>Contract Period</strong>
              <div className="text-muted small">
                {contract
                  ? `${formatDate(contract.startDate)} – ${formatDate(
                      contract.endDate,
                    )}`
                  : "—"}
              </div>
            </div>

            <div className="col-12 col-md-3 mb-3">
              <strong>Status</strong>
              <div>
                <span
                  className={`badge ${
                    contract?.status === "OPEN" ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {contract?.status ?? "—"}
                </span>
              </div>
            </div>

            <div className="col-12 col-md-3 mb-3">
              <strong>Created</strong>
              <div className="text-muted small">
                {contract
                  ? `${formatDate(contract.createdAt)} – ${formatDate(
                      contract.createdAt,
                    )}`
                  : "—"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
