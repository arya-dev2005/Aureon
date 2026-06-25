import { useEffect, useState } from "react";
import { Activity, Database, ShieldCheck, ShieldX } from "lucide-react";

type HealthPayload = {
  status?: string;
  database?: string;
  timestamp?: string;
  error?: string;
};

type MePayload = {
  user?: {
    email: string;
    name: string | null;
  };
  error?: string;
};

export function Diagnostics() {
  const [health, setHealth] = useState<HealthPayload | null>(null);
  const [me, setMe] = useState<MePayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const token = localStorage.getItem("aureon_token");

    Promise.all([
      fetch("/api/health", { credentials: "include" }).then(async response => ({
        ok: response.ok,
        body: await response.json().catch(() => ({ error: "Health response was not JSON" })),
      })),
      fetch("/api/auth/me", {
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }).then(async response => ({
        ok: response.ok,
        body: await response.json().catch(() => ({ error: "Profile response was not JSON" })),
      })),
    ])
      .then(([healthResult, meResult]) => {
        if (!active) return;
        setHealth(healthResult.body as HealthPayload);
        setMe(meResult.body as MePayload);
      })
      .catch(error => {
        if (!active) return;
        setHealth({ status: "offline", database: "unknown", error: error instanceof Error ? error.message : "Request failed" });
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const databaseConnected = health?.database === "connected";
  const authenticated = Boolean(me?.user);

  return (
    <main className="min-h-[70vh] px-6 lg:px-14 py-14" style={{ background: "#0A0A0F" }}>
      <section className="max-w-5xl mx-auto">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-[#C9A96E]">System</p>
          <h1 className="mt-2 text-3xl font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Diagnostics
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <article className="rounded-lg border border-white/[0.06] p-5" style={{ background: "#12121A" }}>
            <Activity className="w-5 h-5 text-[#C9A96E] mb-4" />
            <p className="text-xs uppercase tracking-wider text-[#71717A]">API</p>
            <p className="mt-2 text-xl font-semibold">{loading ? "Checking" : health?.status ?? "Offline"}</p>
          </article>

          <article className="rounded-lg border border-white/[0.06] p-5" style={{ background: "#12121A" }}>
            <Database className="w-5 h-5 text-[#C9A96E] mb-4" />
            <p className="text-xs uppercase tracking-wider text-[#71717A]">Database</p>
            <p className="mt-2 text-xl font-semibold" style={{ color: databaseConnected ? "#22C55E" : "#F59E0B" }}>
              {loading ? "Checking" : health?.database ?? "Unknown"}
            </p>
          </article>

          <article className="rounded-lg border border-white/[0.06] p-5" style={{ background: "#12121A" }}>
            {authenticated ? <ShieldCheck className="w-5 h-5 text-[#22C55E] mb-4" /> : <ShieldX className="w-5 h-5 text-[#71717A] mb-4" />}
            <p className="text-xs uppercase tracking-wider text-[#71717A]">Session</p>
            <p className="mt-2 text-xl font-semibold">{loading ? "Checking" : authenticated ? "Authenticated" : "Guest"}</p>
          </article>
        </div>

        <div className="mt-4 rounded-lg border border-white/[0.06] p-5 text-sm text-[#A1A1AA]" style={{ background: "#12121A" }}>
          <pre className="overflow-auto whitespace-pre-wrap font-mono text-xs leading-relaxed">
            {JSON.stringify({ health, session: me?.user ?? me?.error ?? null }, null, 2)}
          </pre>
        </div>
      </section>
    </main>
  );
}
