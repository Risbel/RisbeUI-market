"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { UpdateUserSettings } from "@/server/actions/user";
import { State } from "@/types/state";
import { useEffect } from "react";
import { useFormState } from "react-dom";

interface iAppProps {
  name: string;
  email: string;
}

const SettingsForm = ({ name, email }: iAppProps) => {
  const initialState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(UpdateUserSettings, initialState);

  useEffect(() => {
    if (state.status === "error") {
      toast({
        variant: "destructive",
        title: "Erros",
        description: `There was an error! ${state.message}`,
      });
    } else if (state.status === "success") {
      toast({
        variant: "default",
        title: "Successful",
        description: `${state.message}`,
      });
    }
  }, [state]);

  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Here you will find settings regarding to your acount</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label className="pl-2">Name</Label>
          <Input name="name" type="text" defaultValue={name} />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="pl-2">Email</Label>
          <Input name="email" type="email" disabled defaultValue={email} />
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit">Update your settings</Button>
      </CardFooter>
    </form>
  );
};

export default SettingsForm;
