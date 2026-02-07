const products = [
  { id: 'starter', name: 'Starter Bundle', price: '$49' },
  { id: 'growth', name: 'Growth Bundle', price: '$129' },
  { id: 'scale', name: 'Scale Bundle', price: '$299' },
];

export default function CatalogPage() {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Catalog</p>
          <h1 className="text-4xl font-semibold">Product bundles</h1>
          <p className="text-slate-300">Outcome-based offers tailored for tenant storefronts.</p>
        </header>
        <section className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="mt-2 text-3xl font-semibold text-emerald-400">{product.price}</p>
              <button className="mt-4 w-full rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950">
                Add to cart
              </button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
