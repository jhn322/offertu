'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { leadSchema, type LeadFormData } from '@/lib/validations/lead.schema';
import { LeadFormProps } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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

export default function LeadForm({
  category,
  referenceId,
  showEmail = true,
  showPhone = true,
}: LeadFormProps) {
  // Initialize form with Zod validation
  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      category,
      referenceId,
      email: '',
      phone: '',
    },
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  // Handle form submission
  const handleSubmit = async (formData: LeadFormData) => {
    setIsLoading(true); // Set loading to true when submission starts
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.error || 'Failed to submit form');
      }

      const responseData = await response.json();
      console.log('Success:', responseData);

      // Clear form after successful submission
      form.reset();
      // Redirect to thank you page with lead ID
      router.push(`/tack?id=${responseData.id}`);
    } catch (err) {
      console.error('Form submission error:', err);
    } finally {
      setIsLoading(false); // Reset loading state after submission attempt
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4"
        method="POST"
        autoComplete="on"
        name="lead-form"
      >
        {/* Email Field */}
        {showEmail && (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Skriv in din email"
                    spellCheck="false"
                    autoCapitalize="none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Phone Field */}
        {showPhone && (
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="phone">Telefon</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Skriv in ditt telefonnummer"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Hidden fields for category and referenceId */}
        <input type="hidden" {...form.register('category')} />
        {referenceId && (
          <input type="hidden" {...form.register('referenceId')} />
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Skickar...' : 'Skicka'}
        </Button>
      </form>
    </Form>
  );
}
