import Link from "next/link";

type EmployeeDetailHeaderProps = {
  firstName: string;
  lastName: string;
};

export default function EmployeeDetailHeader({
  firstName,
  lastName,
}: EmployeeDetailHeaderProps) {
  return (
    <>
      {/* ===== Mobile Header ===== */}
      <div className="d-flex d-md-none align-items-center gap-3 mb-3">
        <Link
          href="/employees"
          className="btn btn-light border btn-sm d-flex align-items-center justify-content-center rounded-circle"
          aria-label="Back to Employees"
          style={{ width: "36px", height: "36px" }}
        >
          <i className="bi bi-arrow-left" />
        </Link>

        <h2 className="mb-0 fs-4 text-truncate">
          {firstName} {lastName}
        </h2>
      </div>

      {/* ===== Desktop Header ===== */}
      <div className="d-none d-md-flex align-items-center justify-content-between mb-4">
        <h1 className="mb-0">
          {firstName} {lastName}
        </h1>

        <Link href="/employees" className="btn btn-light border">
          ← Back to Employees
        </Link>
      </div>
    </>
  );
}
