import React from "react";
import { cn } from "@/lib/utils";  // Ensure you have the cn util

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div className={cn("bg-gray-300 dark:bg-gray-700 animate-pulse rounded", className)}></div>
  );
};
