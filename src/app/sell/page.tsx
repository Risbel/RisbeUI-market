import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import SelectCategory from "./components/SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import TipTapEditor from "../components/editor/Editor";

const Sell = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <form action="">
        <Card>
          <CardHeader>
            <CardTitle>Sell your product with easy</CardTitle>
            <CardDescription>Describe your product here in detail so that it can be sold</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-2">
              <Label>Name</Label>
              <Input type="text" placeholder="Name of the product" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Category</Label>
              <SelectCategory />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Price</Label>
              <Input placeholder="$29" type="number" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Small Sumary</Label>
              <Textarea placeholder="Please describe your product shortly right here..." />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Description</Label>
              <TipTapEditor />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button type="submit">Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
};

export default Sell;
