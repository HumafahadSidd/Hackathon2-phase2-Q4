import AuthLayout from '@/components/AuthLayout';

export default function AuthRootLayout({ children }) {
  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  );
}