"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

interface iButtonProps {
  title: string;
  variant?: "default" | "ghost" | "outline" | "secondary";
  isDisabled?: boolean;
  loadingText?: string;
}

const SubmitButton = ({ title, variant, isDisabled = false, loadingText = "Loading..." }: iButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button variant={variant ?? "default"} type="submit" disabled={pending || isDisabled}>
      {!pending ? `${title}` : `${loadingText}`}
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
    </Button>
  );
};

export default SubmitButton;
