import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-vh-100 d-flex align-items-center justify-content-center">
          Loading…
        </div>
      }
    >
      <LoginClient />
    </Suspense>
  );
}
