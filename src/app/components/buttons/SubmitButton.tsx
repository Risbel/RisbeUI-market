"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

interface iButtonProps {
  title: string;
  variant?: "default" | "ghost" | "outline" | "secondary";
}

const SubmitButton = ({ title, variant }: iButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button variant={variant ?? "default"} type="submit" disabled={pending ? true : false}>
      {!pending ? `${title}` : "Redirecting to Stripe..."}
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
    </Button>
  );
};

export default SubmitButton;
