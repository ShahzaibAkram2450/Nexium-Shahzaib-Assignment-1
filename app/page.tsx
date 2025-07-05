"use client";

import { useState } from "react";
import { QuoteForm } from "@/components/quote-form";
import { QuoteCard } from "@/components/quote-card";
import { getQuotesByTopic, Quote } from "@/data/quotes";
import { Lightbulb, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTopic, setCurrentTopic] = useState("");

  const handleTopicSubmit = async (topic: string) => {
    setIsLoading(true);
    setCurrentTopic(topic);
    
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundQuotes = getQuotesByTopic(topic);
    setQuotes(foundQuotes);
    setIsLoading(false);
  };

  const handleRefresh = () => {
    if (currentTopic) {
      handleTopicSubmit(currentTopic);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
            <Lightbulb className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Quote Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover inspiring quotes tailored to your interests. Enter a topic and let wisdom guide your day.
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8">
            <QuoteForm onSubmit={handleTopicSubmit} isLoading={isLoading} />
          </div>
        </div>

        {/* Results Section */}
        {quotes.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Inspiring Quotes
                  {currentTopic && (
                    <span className="text-blue-600 dark:text-blue-400"> about "{currentTopic}"</span>
                  )}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Found {quotes.length} quotes to inspire you
                </p>
              </div>
              <Button
                onClick={handleRefresh}
                variant="outline"
                disabled={isLoading}
                className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {quotes.map((quote, index) => (
                <QuoteCard key={quote.id} quote={quote} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && quotes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400">Finding the perfect quotes for you...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && quotes.length === 0 && (
          <div className="text-center py-12 space-y-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
              <Lightbulb className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400">
              Ready to get inspired?
            </h3>
            <p className="text-gray-500 dark:text-gray-500 max-w-md mx-auto">
              Enter a topic above to discover motivational quotes that resonate with your interests and goals.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}