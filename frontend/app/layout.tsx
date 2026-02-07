import './globals.css';

export const metadata = {
  title: 'Ecommerce SaaS',
  description: 'Multi-tenant ecommerce platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        <nav className="border-b border-slate-800 bg-slate-950/80 px-6 py-4">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
              Ecommerce SaaS
            </span>
            <div className="flex gap-4 text-sm text-slate-300">
              <a href="/" className="hover:text-white">Home</a>
              <a href="/catalog" className="hover:text-white">Catalog</a>
              <a href="/cart" className="hover:text-white">Cart</a>
              <a href="/checkout" className="hover:text-white">Checkout</a>
              <a href="/admin" className="hover:text-white">Admin</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
