import { RejectionReasonCatalogItem } from "./types/type";

export const REJECTION_REASONS_CATALOG: RejectionReasonCatalogItem[] = [
  {
    code: "voice_unclear",
    label: "Audio Quality Unclear / Muffled",
    isTerminal: false,
    description:
      "Background noise, low volume, or distortion prevents voice evaluation. User can resubmit after 24h.",
  },
  {
    code: "language_mismatch",
    label: "Language Mismatch",
    isTerminal: false,
    description:
      "The spoken sample doesn't match the selected primary language declared in profile.",
  },
  {
    code: "other",
    label: "Other Non-Terminal Issue",
    isTerminal: false,
    description:
      "Custom compliance criteria issue. Detailed auditor note is required.",
  },
  {
    code: "ai_voice",
    label: "AI Synthetic / Cloned Voice",
    isTerminal: true,
    description:
      "CRITICAL: Generative AI / TTS voice detected. Account will be terminated immediately.",
  },
  {
    code: "abusive_content",
    label: "Abusive / Explicit Content",
    isTerminal: true,
    description:
      "CRITICAL: Severe terms of service breach. Account will be permanently suspended.",
  },
  {
    code: "suspended",
    label: "Identity / Profile Impersonation",
    isTerminal: true,
    description:
      "CRITICAL: Fraudulent submission or identity mismatch. Locks account permanently.",
  },
];

export const STATUS_BADGE_STYLES: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  rejected: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};
