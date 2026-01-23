"use client";

import { useState } from "react";
import { z } from "zod";
import { UpdateTimeReportSchema } from "@/server/time-report/time-report.schema";
import TimeReportBasicInformationForm from "./form/TimeReportBasicInformationForm";

type UpdateTimeReportInput = z.infer<typeof UpdateTimeReportSchema>;

type TimeReportBasicInformationProps = {
  id: string;
  employeeName: string;
  employeeEmail: string;
  status: UpdateTimeReportInput["status"];
  date: Date;
  hours: number;
  description?: string | null;
};

export default function TimeReportBasicInformation({
  id,
  employeeName,
  employeeEmail,
  status,
  date,
  hours,
  description,
}: TimeReportBasicInformationProps) {
  const [isEditing, setIsEditing] = useState(false);

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
      </div>
    </div>
  );
}
