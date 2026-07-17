import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { QuickAnswer } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // ensures consistency on dates
  });
}

/**
 * Returns the current origin dynamically in the client, 
 * or the default site url if server-side (for build compatibility)
 */
export function getSiteUrl() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "https://returnpolicyfind.com";
}

export interface GradeInfo {
  grade: string;
  score: number;
  label: string;
  colorClass: string;
  bgClass: string;
}

export function calculatePolicyGrade(quickAnswer: QuickAnswer): GradeInfo {
  let score = 75; // Baseline C
  
  // Return window assessment
  const windowStr = (quickAnswer.returnWindow || "").toLowerCase();
  if (windowStr.includes("365") || windowStr.includes("1 year")) {
    score += 20;
  } else if (windowStr.includes("90")) {
    score += 15;
  } else if (windowStr.includes("60")) {
    score += 10;
  } else if (windowStr.includes("30") || windowStr.includes("month")) {
    score += 5;
  } else if (windowStr.includes("14") || windowStr.includes("7")) {
    score -= 10;
  }

  // Receipt assessment
  if (quickAnswer.receiptRequired === false) {
    score += 10; // lookup is easy
  } else {
    score -= 10; // receipts mandatory
  }

  // Restocking fee assessment
  if (quickAnswer.restockingFee === false) {
    score += 5; // no restocking fee
  } else {
    score -= 15; // penalize restocking fees
  }

  // Channel flexibility
  if (quickAnswer.onlineReturns && quickAnswer.inStoreReturns) {
    score += 5; // high flexibility
  }

  // Cap score between 0 and 100
  score = Math.max(0, Math.min(100, score));

  let grade = "C";
  let label = "Standard Policy";
  let colorClass = "text-amber-600 border-amber-200";
  let bgClass = "bg-amber-50";

  if (score >= 95) {
    grade = "A+";
    label = "Ultra Shopper Friendly";
    colorClass = "text-emerald-700 border-emerald-300";
    bgClass = "bg-emerald-50";
  } else if (score >= 88) {
    grade = "A";
    label = "Very Shopper Friendly";
    colorClass = "text-emerald-600 border-emerald-200";
    bgClass = "bg-emerald-50/50";
  } else if (score >= 80) {
    grade = "B+";
    label = "Highly Reasonable";
    colorClass = "text-teal-700 border-teal-200";
    bgClass = "bg-teal-50/30";
  } else if (score >= 70) {
    grade = "B";
    label = "Fair & Standard";
    colorClass = "text-teal-600 border-teal-100";
    bgClass = "bg-teal-50/10";
  } else if (score >= 60) {
    grade = "C+";
    label = "Average Policy";
    colorClass = "text-amber-700 border-amber-200";
    bgClass = "bg-amber-50/40";
  } else if (score >= 50) {
    grade = "C";
    label = "Some Restrictions";
    colorClass = "text-amber-600 border-amber-200";
    bgClass = "bg-amber-50/20";
  } else {
    grade = "D";
    label = "Strict Policy";
    colorClass = "text-rose-600 border-rose-200";
    bgClass = "bg-rose-50/30";
  }

  return { grade, score, label, colorClass, bgClass };
}
