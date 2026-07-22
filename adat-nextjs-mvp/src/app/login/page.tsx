"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const payload = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(payload.message || "No fue posible iniciar sesión.");
      return;
    }

    router.replace("/admin");
  }

  return (
    <main className="login-page">
      <section className="login-shell">
        <div className="login-card">
          <Link href="/" className="btn-ghost">
            ← Sitio público
          </Link>
          <div className="login-logo">
            <Image
              src="/assets/adat-logo.png"
              alt="ADAT"
              width={220}
              height={120}
              priority
            />
          </div>
          <h1>Acceso administrativo</h1>
          <p>
            Ingresa con una cuenta autorizada para revisar afiliaciones y
            administrar solicitudes.
          </p>
          {error && <div className="alert error">{error}</div>}
          <form className="form-grid" onSubmit={login}>
            <div className="form-field full">
              <label htmlFor="login-email">Correo</label>
              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-field full">
              <label htmlFor="login-password">Contraseña</label>
              <input
                id="login-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-field full">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Validando..." : "Entrar al panel"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
