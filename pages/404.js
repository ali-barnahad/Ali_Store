import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/">
        <span className="text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 cursor-pointer">
          Go Back to Home
        </span>
      </Link>
      <img
        src="/uploads/404.webp" // Use a custom image or illustration
        alt="404 Illustration"
        className="mt-8 max-w-md"
      />
    </div>
  );
}
