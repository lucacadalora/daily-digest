import React from "react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocumentsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-16 px-4 md:px-8 max-w-[1200px] mx-auto">
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/data">Data</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-gray-800 dark:text-gray-200">Official Documents</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Official Documents</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mb-8">
            This feature is coming soon. We're developing an archive of government and corporate official documents.
          </p>
          
          <Link href="/data">
            <Button variant="outline">
              Back to Data Resources
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}