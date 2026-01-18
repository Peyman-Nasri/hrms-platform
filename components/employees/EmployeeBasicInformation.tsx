type EmployeeBasicInformationProps = {
  email: string;
  status: string;
  workLocation?: string | null;
};

export default function EmployeeBasicInformation({
  email,
  status,
  workLocation,
}: EmployeeBasicInformationProps) {
  const isActive = status === "ACTIVE";

  return (
    <>
      {/* Desktop / tablet layout */}
      <div className="d-none d-md-block">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-3">Basic Information</h5>

            <div className="row">
              <div className="col-md-4">
                <strong>Email</strong>
                <div>{email}</div>
              </div>

              <div className="col-md-4">
                <strong>Status</strong>
                <div>
                  <span
                    className={`badge ${isActive ? "bg-success" : "bg-secondary"}`}
                  >
                    {status}
                  </span>
                </div>
              </div>

              <div className="col-md-4">
                <strong>Work Location</strong>
                <div>{workLocation ?? "—"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="d-block d-md-none">
        <div className="card mb-3">
          <div className="card-body">
            <div className="mb-3">
              <strong>Email</strong>
              <div className="text-muted">{email}</div>
            </div>

            <div className="mb-3">
              <strong>Status</strong>
              <div>
                <span
                  className={`badge ${isActive ? "bg-success" : "bg-secondary"}`}
                >
                  {status}
                </span>
              </div>
            </div>

            <div>
              <strong>Work Location</strong>
              <div className="text-muted">{workLocation ?? "—"}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
