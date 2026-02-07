const features = [
  'Tenant-aware catalog, orders, and payments',
  'Outcome-driven customization and dynamic pricing',
  'Ads attribution and analytics dashboard',
  'Admin controls for tenants and roles',
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-emerald-400">Production SaaS</p>
          <h1 className="text-4xl font-semibold md:text-6xl">Multi-tenant ecommerce platform</h1>
          <p className="text-lg text-slate-300">
            Launch storefronts, manage outcomes, and track conversions with a cloud-native stack.
          </p>
        </header>
        <section className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <div key={feature} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <p className="text-base text-slate-200">{feature}</p>
            </div>
          ))}
        </section>
        <section className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900 p-8 md:grid-cols-3">
          <div>
            <p className="text-sm text-slate-400">Active tenants</p>
            <p className="text-3xl font-semibold">128</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Monthly GMV</p>
            <p className="text-3xl font-semibold">$2.4M</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Conversion rate</p>
            <p className="text-3xl font-semibold">4.8%</p>
          </div>
        </section>
      </div>
    </main>
  );
}
