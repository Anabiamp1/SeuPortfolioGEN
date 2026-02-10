export type ThemeOption = "dark" | "clean" | "modern";

export interface PortfolioData {
  name: string;
  bio: string;
  objectives: string;
  photoUrl: string;
  skills: string[];
  socialLinks: SocialLink[];
  theme: ThemeOption;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export const PLATFORM_OPTIONS = [
  "GitHub",
  "LinkedIn",
  "Twitter / X",
  "Instagram",
  "Behance",
  "Website",
  "YouTube",
  "Email",
] as const;
