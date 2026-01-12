import Link from "next/link";

type QuickActionProps = {
  title: string;
  description: string;
  href: string;
};

export default function QuickAction({
  title,
  description,
  href,
}: QuickActionProps) {
  return (
    <Link href={href} className="text-decoration-none text-reset">
      <div className="card h-100" style={{ width: 260, cursor: "pointer" }}>
        <div className="card-body">
          <h6 className="fw-semibold">{title}</h6>
          <p className="text-muted small mb-0">{description}</p>
        </div>
      </div>
    </Link>
  );
}
