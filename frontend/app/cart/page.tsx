const items = [
  { name: 'Starter Bundle', quantity: 1, price: '$49' },
  { name: 'Growth Bundle', quantity: 2, price: '$129' },
];

export default function CartPage() {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Cart</p>
          <h1 className="text-4xl font-semibold">Review your selections</h1>
        </header>
        <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          {items.map((item) => (
            <div key={item.name} className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-sm text-slate-400">Quantity: {item.quantity}</p>
              </div>
              <p className="text-lg text-emerald-400">{item.price}</p>
            </div>
          ))}
          <div className="flex items-center justify-between pt-4">
            <span className="text-sm text-slate-400">Estimated total</span>
            <span className="text-2xl font-semibold">$307</span>
          </div>
          <div className="flex justify-end">
            <a
              href="/checkout"
              className="rounded-xl bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-950"
            >
              Continue to checkout
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
