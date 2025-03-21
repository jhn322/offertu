import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Admin Dashboard | OfferTu',
  description: 'Administrera OfferTu-plattformen',
};

export default async function AdminDashboardPage() {
  // Kontrollera om användaren är inloggad och har admin-roll
  const session = await getServerSession(authOptions);

  // Kontrollera om användaren är inloggad och om user-objektet finns
  if (!session || !session.user) {
    redirect('/admin/login');
  }

  // Typeguard för att kontrollera om användaren har admin-roll
  const userRole = (session.user as any).role;
  if (userRole !== 'ADMIN') {
    redirect('/admin/login');
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Användare</CardTitle>
            <CardDescription>Hantera användare i systemet</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Total: 0 användare</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leads</CardTitle>
            <CardDescription>Hantera leads från formulär</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Total: 0 leads</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inställningar</CardTitle>
            <CardDescription>Konfigurera systemet</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Klicka för att ändra inställningar</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
