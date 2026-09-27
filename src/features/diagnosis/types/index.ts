export type CategoryId = 
  | "general"
  | "evil-eye"
  | "kids"
  | "magic"
  | "jinn"
  | "waswas"
  | "amulet-guide"
  | "contact";

export interface Option {
  id: string;
  label: string;
  weight: number;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface Prescription {
  level: "low" | "medium" | "high";
  title: string;
  summary: string;
  steps: string[];
  recommendedSurahs: string[];
  audioLinks: { title: string; href: string }[];
}

export interface DiagnosisCategory {
  id: CategoryId;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  badge: string;
  isInteractiveTest: boolean;
  questions?: Question[];
  prescriptions?: Record<"low" | "medium" | "high", Prescription>;
  customRoute?: string;
}
