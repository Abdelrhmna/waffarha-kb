import "./globals.css";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Waffarha KB",
	description: "Knowledge base dashboard",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ar" dir="rtl" className="h-full bg-gray-50">
			<body className="min-h-screen antialiased text-gray-900">
				{children}
			</body>
		</html>
	);
}

