import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata = {
  title: 'ToDo App',
  description: 'A simple todo application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>
          <ErrorBoundary>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow container mx-auto px-4 py-6 max-w-6xl">
                {children}
              </main>
            </div>
          </ErrorBoundary>
        </AuthProvider>
      </body>
    </html>
  );
}