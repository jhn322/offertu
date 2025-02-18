'use client';

import type React from 'react';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ErrorMessages } from '@/lib/errors/app.errors';
import {
  validateEmail,
  validatePhone,
} from '@/lib/validations/lead.validation';

export default function LeadSubmissionForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setIsSuccess(false);

    // Validate on the client side first
    if (!validateEmail(email)) {
      console.error('Validation error:', ErrorMessages.INVALID_EMAIL);
      setErrorMessage(ErrorMessages.INVALID_EMAIL);
      setIsLoading(false);
      return;
    }

    if (!validatePhone(phone)) {
      console.error('Validation error:', ErrorMessages.INVALID_PHONE);
      setErrorMessage(ErrorMessages.INVALID_PHONE);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.toLocaleLowerCase(), phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Response error:', data.error);
        setErrorMessage(data.error);
        return;
      }

      console.log('Lead creation succeeded:', data);
      setIsSuccess(true);
      setEmail('');
      setPhone('');
    } catch (err) {
      console.error('Unexpected error:', err);
      setErrorMessage(ErrorMessages.INTERNAL_SERVER_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='bg-card p-6 rounded-lg'>
      <CardHeader className='text-lg font-semibold mb-6'>
        <CardTitle>Anmäl intresse</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='Skriv in din email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='bg-background'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='phone'>Telefon</Label>
            <Input
              id='phone'
              type='tel'
              placeholder='Skriv in ditt telefonnummer'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className='bg-background'
            />
          </div>
          <Button
            type='submit'
            className='w-full bg-primary text-primary-foreground hover:bg-primary/90'
            disabled={isLoading}
          >
            {isLoading ? 'Skickar...' : 'Skicka'}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        {isSuccess && (
          <p className='text-secondary text-sm text-center'>
            Vi har mottagit din intresseanmälan!
          </p>
        )}
        {errorMessage && (
          <p className='text-red-600 text-sm text-center w-full'>
            {errorMessage || 'Något gick fel. Vänligen försök igen.'}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
