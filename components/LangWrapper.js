"use client";
import { LangProvider } from "@/lib/i18n";

export function LangWrapper({ children }) {
  return <LangProvider>{children}</LangProvider>;
}
