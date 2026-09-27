import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-black text-[#ccff00]">404</h1>
      <h2 className="text-xl font-bold uppercase mt-2 text-white">PAGE NOT FOUND</h2>
      <p className="text-neutral-400 text-sm mt-1">This workout or route does not exist.</p>
      <Link href="/" className="mt-6 bg-[#ccff00] text-black font-bold px-5 py-2 rounded text-xs">
        Back to Home
      </Link>
    </div>
  );
}