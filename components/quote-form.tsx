"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/quotes";

const formSchema = z.object({
  topic: z.string().min(1, "Please enter a topic to get inspired").max(50, "Topic must be less than 50 characters"),
});

interface QuoteFormProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
}

export function QuoteForm({ onSubmit, isLoading }: QuoteFormProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values.topic);
  }

  function handleCategoryClick(category: string) {
    setSelectedCategory(category);
    form.setValue("topic", category);
    onSubmit(category);
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  What inspires you today?
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Enter a topic like 'success', 'motivation', 'leadership'..."
                      {...field}
                      className="pl-10 h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-all duration-200 rounded-lg shadow-sm"
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Finding Quotes...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Get Inspired
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Popular topics:</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              disabled={isLoading}
              className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 hover:scale-105 ${
                selectedCategory === category
                  ? "bg-blue-500 text-white border-blue-500 shadow-md"
                  : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50 shadow-sm"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}