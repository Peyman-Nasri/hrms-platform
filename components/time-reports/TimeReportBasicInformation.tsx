"use client";

import { useState } from "react";
import { z } from "zod";
import { UpdateTimeReportSchema } from "@/server/time-report/time-report.schema";
import TimeReportBasicInformationForm from "./form/TimeReportBasicInformationForm";

type UpdateTimeReportInput = z.infer<typeof UpdateTimeReportSchema>;

type TimeReportContract = {
  id: string;
  employeeId: string;
  status: "OPEN" | "CLOSED";
  startDate: Date;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

type TimeReportBasicInformationProps = {
  id: string;
  employeeName: string;
  employeeEmail: string;
  status: UpdateTimeReportInput["status"];
  date: Date;
  hours: number;
  description?: string | null;
  contract?: TimeReportContract | null;
};

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
            <div className="col-12 col-md-4 mb-3">
              <strong>Contract Period</strong>
              <div className="text-muted small">
                {contract
                  ? `${formatDate(contract.startDate)} – ${formatDate(
                      contract.endDate,
                    )}`
                  : "—"}
              </div>
            </div>

            <div className="col-12 col-md-4 mb-3">
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

            <div className="col-12 col-md-4 mb-3">
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
