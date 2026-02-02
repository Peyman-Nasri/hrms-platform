"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginClient() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl,
        redirect: false,
      });

      if (!res) {
        setError("Unexpected error. Try again.");
        setLoading(false);
        return;
      }

      if (res.error) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      window.location.href = res.url ?? callbackUrl;
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border mb-3" role="status" />
          <div>Signing you in…</div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center min-vh-100 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-md-4">
                <h1 className="h4 mb-3 text-center">Sign in to HRMS</h1>

                <form onSubmit={onSubmit} className="mt-2">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {error && (
                    <div className="alert alert-danger py-2">{error}</div>
                  )}

                  <button type="submit" className="btn btn-primary w-100">
                    Sign In
                  </button>
                </form>

                <p className="text-muted small mt-3 mb-0 text-center">
                  Use these credentials:
                  <br />
                  <code>admin@email.com</code> / <code>AdminPassword</code>
                </p>
              </div>
            </div>

            <div className="d-block d-md-none mb-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
