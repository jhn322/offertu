import { Metadata } from 'next';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Admin Login | OfferTu',
  description: 'Logga in för att administrera OfferTu-plattformen',
};

export default function AdminLoginPage() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col space-y-6 text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Admin Portal</h1>
          <p className="text-muted-foreground">
            Ange dina inloggningsuppgifter för att få tillgång till
            administratörspanelen
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
