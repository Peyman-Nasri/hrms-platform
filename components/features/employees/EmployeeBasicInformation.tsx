"use client";

import { useState } from "react";
import EmployeeBasicInformationForm from "./form/EmployeeBasicInformationForm";
import { EmployeeBasicInformationProps } from "@/types/employees";

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
