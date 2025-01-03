"use client";

import { categoryItems } from "@/app/lib/categoryItems";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const SelectCategory = ({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: any;
  setSelectedCategory: any;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
      <input type="hidden" name="category" value={selectedCategory || ""} />
      {categoryItems.map((item) => {
        return (
          <div key={item.id} className="cursor-pointer">
            <Card
              className={cn(
                selectedCategory === item.name ? "border-primary border-2" : "border-primary/10 border-2",
                "hover:shadow-md hover:shadow-blue-500 transition-shadow"
              )}
              onClick={() => setSelectedCategory(item.name)}
            >
              <CardHeader>{item.image}</CardHeader>
              <CardContent>{item.title}</CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default SelectCategory;
