type StatCardProps = {
  title: string;
  value: string | number;
};

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="text-muted small">{title}</div>
        <div className="fs-3 fw-semibold mt-1">{value}</div>
      </div>
    </div>
  );
}
