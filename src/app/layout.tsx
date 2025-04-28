import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Poppins } from "next/font/google";
 

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Umapathi K",
  description: "Tech Upgrades",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark-theme ${poppins.variable}`}>
      <body  className="font-poppins">
        <div className="layout-container">
          <header className="header">
            <div className="content-container">
            <nav>
            <h1>UMAPATHI K</h1>
            <div className="nav-links">
            <i className="bi bi-house-fill"></i>
            <i className="bi bi-envelope-plus-fill"></i>
            <i className="bi bi-puzzle-fill"></i>
            <i className="bi bi-envelope-plus-fill"></i>
              </div>
            </nav>
            </div>

            <div className="player-xp">
            <div className="progress-container">
              <div className="progress-bar" style={{ width: "75%" }}></div>
            </div>
              <p><strong>PLAYER XP: 1,095 Days</strong></p>
              <p>Now level unlocking soon.</p>
            </div>
          </header>
          
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}