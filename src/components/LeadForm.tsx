'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';

interface SignupFormProps {
  category: 'career' | 'news' | 'template' | 'api';
  showEmail?: boolean;
  showPhone?: boolean;
  // onSubmit?: (data: SignupFormData) => void;
}

interface SignupFormData {
  email?: string;
  phone?: string;
  category: string;
}

const createFormSchema = (showEmail: boolean, showPhone: boolean) => {
  const schemaFields: Record<string, z.ZodTypeAny> = {
    category: z.string(),
  };

  if (showEmail) {
    schemaFields.email = z.string().email('Please enter a valid email address');
  }

  if (showPhone) {
    schemaFields.phone = z
      .string()
      .min(10, 'Phone number must be at least 10 digits');
  }

  return z.object(schemaFields);
};

export default function LeadForm({
  category,
  showEmail = true,
  showPhone = true,
}: // onSubmit,
SignupFormProps) {
  const formSchema = createFormSchema(showEmail, showPhone);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category,
      email: '',
      phone: '',
    },
  });

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      // Log the data we're about to send
      console.log('Sending form data:', formData);

      // Send a POST request to the server with the form data
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email, // Use the email from formData
          phone: formData.phone, // Use the phone from formData
          category: formData.category, // Use the category from formData
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.error || 'Failed to submit form');
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  return (
    <Card className="bg-card p-6 rounded-lg">
      <CardHeader className="text-lg font-semibold mb-6">
        <CardTitle>Anmäl intresse</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
            // Important: Add this to prevent default form submission
            method="POST"
          >
            {showEmail && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Skriv in din email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {showPhone && (
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Skriv in ditt telefonnummer"
                        type="tel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="w-full">
              Skicka
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
