import './globals.css';

export const metadata = {
  title: 'Instagram Demo — Next.js & DRF',
  description: 'Component-Based Instagram web application built with Next.js and Django REST Framework',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
