const sections = [
  { title: 'Tenant management', description: 'Onboard, suspend, and configure tenant plans.' },
  { title: 'Product catalog', description: 'Curate products, outcomes, and bundles.' },
  { title: 'Orders & payments', description: 'Monitor fulfillment and Stripe status.' },
  { title: 'Campaign analytics', description: 'Attribution and performance metrics.' },
];

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-400">Admin Dashboard</p>
          <h1 className="text-4xl font-semibold text-white">Control plane</h1>
          <p className="text-slate-300">Manage tenants, commerce, and analytics at scale.</p>
        </header>
        <section className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
            >
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{section.description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
