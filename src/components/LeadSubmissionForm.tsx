"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { SubmissionStatus } from "@/types";

export default function LeadSubmissionForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone }),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      console.log("Lead creation succeeded:", await response.json());
      setStatus("success");
      setEmail("");
      setPhone("");
    } catch (err) {
      console.error("Error submitting form:", err);
      setStatus("error");
    }
  };

  return (
    <Card className="bg-card p-6 rounded-lg">
      <CardHeader className="text-lg font-semibold mb-6">
        <CardTitle>Anmäl intresse</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Skriv in din email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Skriv in ditt telefonnummer"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="bg-background"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Submit
        </Button>
        {status === "success" && (
          <p className="text-secondary text-sm text-center">
            Vi har mottagit din intresseanmälan!
          </p>
        )}
        {status === "error" && (
          <p className="text-accent text-sm text-center">
            Något gick fel. Vänligen försök igen.
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
