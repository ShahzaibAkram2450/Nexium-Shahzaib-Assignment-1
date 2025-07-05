"use client";

import { useState } from "react";
import { Copy, Check, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote as QuoteType } from "@/data/quotes";

interface QuoteCardProps {
  quote: QuoteType;
  index: number;
}

export function QuoteCard({ quote, index }: QuoteCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `"${quote.text}" - ${quote.author}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Card 
      className="group relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] animate-in slide-in-from-bottom-4"
      style={{ 
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'both'
      }}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <CardContent className="relative p-6 space-y-4">
        {/* Quote icon */}
        <div className="flex justify-between items-start">
          <Quote className="h-8 w-8 text-blue-500 opacity-60 flex-shrink-0" />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-gray-500" />
            )}
          </Button>
        </div>

        {/* Quote text */}
        <blockquote className="text-lg font-medium leading-relaxed text-gray-800 dark:text-gray-200 italic">
          "{quote.text}"
        </blockquote>

        {/* Author and category */}
        <div className="space-y-2">
          <p className="text-right text-base font-semibold text-gray-700 dark:text-gray-300">
            — {quote.author}
          </p>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {quote.category.charAt(0).toUpperCase() + quote.category.slice(1)}
            </span>
            {copied && (
              <span className="text-sm text-green-600 font-medium">Copied!</span>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 pt-2">
          {quote.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}