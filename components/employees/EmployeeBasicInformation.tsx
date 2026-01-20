"use client";

import { useState } from "react";
import { z } from "zod";
import { UpdateEmployeeBasicSchema } from "@/server/employees/employees.schemas";
import EmployeeBasicInformationForm from "./form/EmployeeBasicInformationForm";

type UpdateEmployeeBasicInput = z.infer<typeof UpdateEmployeeBasicSchema>;

type EmployeeBasicInformationProps = {
  id: string;
  email: string;
  status: UpdateEmployeeBasicInput["status"];
  workLocation?: UpdateEmployeeBasicInput["workLocation"] | null;
};

export default function EmployeeBasicInformation({
  id,
  email,
  status,
  workLocation,
}: EmployeeBasicInformationProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <EmployeeBasicInformationForm
          id={id}
          email={email}
          initialStatus={status}
          initialWorkLocation={workLocation}
          isEditing={isEditing}
          onStartEdit={() => setIsEditing(true)}
          onStopEdit={() => setIsEditing(false)}
        />
      </div>
    </div>
  );
}
