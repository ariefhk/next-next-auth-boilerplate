"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaGithub, FaSpinner } from "react-icons/fa";

interface RegisFormProps extends React.HTMLAttributes<HTMLFormElement> {}

const RegisForm = ({ className, ...props }: RegisFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <form onSubmit={onSubmit} className={cn("grid gap-6", className)} {...props}>
      <article className="grid gap-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Enter your Name"
          type="text"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isLoading}
        />
      </article>
      <article className="grid gap-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="email@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isLoading}
        />
      </article>
      <article className="grid gap-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          placeholder="Enter your Password"
          type="password"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isLoading}
        />
      </article>
      <Button disabled={isLoading}>
        {isLoading && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
        Register
      </Button>
    </form>
  );
};

export default RegisForm;
