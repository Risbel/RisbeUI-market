"use client";

import { Button } from "@/components/ui/button";
import { Code2, Loader2, Lock } from "lucide-react";
import { useFormStatus } from "react-dom";

const UnlockButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      size="3xl"
      className="text-lg bg-gradient-to-br from-blue-600 via-purple-600/50 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all hover:shadow-lg"
    >
      {!pending ? <Lock /> : <Loader2 className="animate-spin" />} Unlock source code <Code2 />
    </Button>
  );
};

export default UnlockButton;
