"use client";

import { categoryItems } from "@/app/lib/categoryItems";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const SelectCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
      <input type="hidden" name="category" value={selectedCategory || ""} />
      {categoryItems.map((item) => {
        return (
          <div key={item.id} className="cursor-pointer">
            <Card
              className={cn(selectedCategory === item.name ? "border-primary border-2" : "border-primary/10 border-2")}
              onClick={() => setSelectedCategory(item.name)}
            >
              <CardHeader>{item.image}</CardHeader>
              <CardContent>{item.name}</CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default SelectCategory;
