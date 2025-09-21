export default function LoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="w-full max-w-md bg-white rounded-lg shadow p-8">
				<h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">تسجيل الدخول</h1>
				<form className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
						<input
							type="email"
							className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="you@example.com"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
						<input
							type="password"
							className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="••••••••"
						/>
					</div>
					<button
						type="button"
						className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
					>
						دخول
					</button>
				</form>
			</div>
		</div>
	);
}

