import './globals.css';

export const metadata = {
  title: 'Ecommerce SaaS',
  description: 'Multi-tenant ecommerce platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
