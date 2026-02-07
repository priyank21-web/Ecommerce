export default function CheckoutPage() {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Checkout</p>
          <h1 className="text-4xl font-semibold">Finalize payment</h1>
          <p className="text-slate-300">Secure Stripe payment flow for tenant storefronts.</p>
        </header>
        <section className="grid gap-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm text-slate-300">
              Cardholder name
              <input
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2"
                placeholder="Jane Doe"
              />
            </label>
            <label className="block text-sm text-slate-300">
              Email
              <input
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2"
                placeholder="jane@example.com"
              />
            </label>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm text-slate-400">Order total</p>
              <p className="text-3xl font-semibold">$307</p>
            </div>
            <button className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950">
              Pay with Stripe (test)
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
