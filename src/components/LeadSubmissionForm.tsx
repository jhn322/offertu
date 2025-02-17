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
import type { SubmissionStatus } from '@/types';

export default function LeadSubmissionForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, phone }),
      });

      if (!response.ok) throw new Error('Failed to submit form');

      console.log('Lead creation succeeded:', await response.json());
      setStatus('success');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='phone'>Phone</Label>
            <Input
              id='phone'
              type='tel'
              placeholder='Enter your phone number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        {status === 'success' && (
          <p className='text-green-600 text-sm w-full text-center'>
            Vi har mottagit din intresseanmälan!
          </p>
        )}
        {status === 'error' && (
          <p className='text-red-600 text-sm w-full text-center'>
            Något gick fel. Vänligen försök igen.
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
