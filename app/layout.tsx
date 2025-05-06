'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { Amplify } from 'aws-amplify';
import config from '../amplify_outputs.json';

const inter = Inter({ subsets: ['latin'] });

Amplify.configure(config, { ssr: true });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
