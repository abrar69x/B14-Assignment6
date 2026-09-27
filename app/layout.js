import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { WorkoutProvider } from '@/context/WorkoutContext';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'FitLog — Workout Library',
  description: 'Train with intent. Log every set.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0f1115] text-white min-h-screen flex flex-col">
        <WorkoutProvider>
          <Toaster position="top-right" />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}