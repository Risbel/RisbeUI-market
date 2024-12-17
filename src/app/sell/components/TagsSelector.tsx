import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export interface Tag {
  id: string;
  name: string;
  icon?: string;
}

export function TagsSelector({ tags, setTags }: { tags: Tag[]; setTags: React.Dispatch<React.SetStateAction<Tag[]>> }) {
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [suggestedTags, setSuggestedTags] = useState<Tag[]>([]);
  const [isLoadingTags, setIsLoadingTags] = useState(true);

  const [inputValue, setInputValue] = useState<string>("");
  const [draggedTag, setDraggedTag] = useState<Tag | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/tags");
        const data = await response.json();
        setAllTags([...data]);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      } finally {
        setIsLoadingTags(false);
      }
    };
    fetchData();
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    if (!inputValue) {
      setSuggestedTags([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      const filteredTags = allTags.filter((tag) => tag.name.toLowerCase().includes(inputValue.toLowerCase()));
      setSuggestedTags(filteredTags);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [inputValue, allTags]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      const existingTag = allTags.find((tag) => tag.name === inputValue);
      if (existingTag) {
        addTag(existingTag);
      }
    }
  };

  const addTag = useCallback(
    (tagInput: Tag) => {
      if (!tags.some((existingTag) => existingTag.name === tagInput.name)) {
        setTags([...tags, tagInput]);
      }

      setInputValue("");
      setSuggestedTags([]);
    },
    [tags, setTags]
  );

  const removeTag = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, tag: Tag) => {
    setDraggedTag(tag);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", tag.id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const container = containerRef.current;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      const containerWidth = containerRect.width;
      const tagWidth = 100; // Approximate width of a tag
      const index = Math.min(Math.floor(mouseX / tagWidth), tags.length);
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (draggedTag && dragOverIndex !== null) {
      const updatedTags = tags.filter((tag) => tag.id !== draggedTag.id);
      updatedTags.splice(dragOverIndex, 0, draggedTag);
      setTags(updatedTags);
    }
    setDraggedTag(null);
    setDragOverIndex(null);
  };

  const handleTagClick = (tag: Tag) => {
    addTag(tag);
  };

  if (isLoadingTags) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-12 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-1/6" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <div
        ref={containerRef}
        className="mb-2 p-2 border rounded min-h-[50px]"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex gap-2 flex-wrap items-start relative">
          {tags.length > 0 &&
            tags.map((tag, index) => (
              <React.Fragment key={tag.id}>
                {dragOverIndex === index && (
                  <motion.div
                    className="w-[2px] bg-blue-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ height: "100%" }}
                  />
                )}

                <motion.div
                  className="flex items-center bg-blue-100 text-blue-950 font-semibold pl-2 pr-1 py-1 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
                  draggable
                  onDragStart={(e: any) => handleDragStart(e, tag)}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <span>{tag.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="ml-3 p-0 h-auto"
                    onClick={() => removeTag(tag.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              </React.Fragment>
            ))}

          {dragOverIndex === tags.length && (
            <motion.div
              className="w-[2px] bg-blue-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ height: "100%" }}
            />
          )}
        </div>
      </div>

      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Type tags that identify your product."
          className="w-1/3"
        />
        {suggestedTags.length > 0 && (
          <div className="flex p-2 gap-2 absolute top-full mt-1 min-w-max bg-white border rounded shadow z-10">
            {suggestedTags.map((tag) => (
              <button
                type="button"
                key={tag.id}
                className="p-2 hover:bg-blue-100 border cursor-pointer flex gap-2 items-center"
                onClick={() => handleTagClick(tag)}
              >
                {tag.name}
                <Plus height={15} width={15} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
