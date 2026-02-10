import { PortfolioData, ThemeOption } from "@/types/portfolio";

const themes: Record<ThemeOption, { bg: string; cardBg: string; text: string; muted: string; accent: string; accentAlt: string; border: string; skillBg: string; skillText: string; socialBg: string; socialText: string; socialBorder: string; footerColor: string; fontBody: string; fontDisplay: string; fontImport: string }> = {
  dark: {
    bg: "#0f1319",
    cardBg: "transparent",
    text: "#e2e8f0",
    muted: "#94a3b8",
    accent: "#2dd4bf",
    accentAlt: "#3b82f6",
    border: "rgba(255,255,255,0.08)",
    skillBg: "rgba(45,212,191,0.12)",
    skillText: "#2dd4bf",
    socialBg: "rgba(255,255,255,0.05)",
    socialText: "#e2e8f0",
    socialBorder: "rgba(255,255,255,0.08)",
    footerColor: "#475569",
    fontBody: "'Inter', system-ui, sans-serif",
    fontDisplay: "'Space Grotesk', sans-serif",
    fontImport: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap",
  },
  clean: {
    bg: "#f8fafc",
    cardBg: "#ffffff",
    text: "#1e293b",
    muted: "#64748b",
    accent: "#0ea5e9",
    accentAlt: "#6366f1",
    border: "#e2e8f0",
    skillBg: "rgba(14,165,233,0.08)",
    skillText: "#0ea5e9",
    socialBg: "#f1f5f9",
    socialText: "#334155",
    socialBorder: "#e2e8f0",
    footerColor: "#94a3b8",
    fontBody: "'Inter', system-ui, sans-serif",
    fontDisplay: "'Inter', system-ui, sans-serif",
    fontImport: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
  },
  modern: {
    bg: "#18181b",
    cardBg: "transparent",
    text: "#fafafa",
    muted: "#a1a1aa",
    accent: "#a78bfa",
    accentAlt: "#f472b6",
    border: "rgba(161,161,170,0.15)",
    skillBg: "rgba(167,139,250,0.12)",
    skillText: "#a78bfa",
    socialBg: "rgba(250,250,250,0.05)",
    socialText: "#e4e4e7",
    socialBorder: "rgba(161,161,170,0.15)",
    footerColor: "#52525b",
    fontBody: "'DM Sans', system-ui, sans-serif",
    fontDisplay: "'Sora', sans-serif",
    fontImport: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap",
  },
};

export function generatePortfolioHTML(data: PortfolioData): string {
  const t = themes[data.theme];

  const avatarHTML = data.photoUrl
    ? `<img src="${data.photoUrl}" alt="${data.name}" style="width:96px;height:96px;border-radius:50%;object-fit:cover;border:3px solid ${t.accent};" />`
    : `<div style="width:96px;height:96px;border-radius:50%;background:linear-gradient(135deg,${t.accent},${t.accentAlt});display:flex;align-items:center;justify-content:center;font-family:${t.fontDisplay};font-size:36px;font-weight:700;color:${t.bg};">${data.name.charAt(0).toUpperCase()}</div>`;

  const skillsHTML = data.skills
    .map(
      (skill) =>
        `<span style="display:inline-block;padding:6px 16px;border-radius:999px;background:${t.skillBg};color:${t.skillText};font-size:14px;font-weight:500;border:1px solid ${t.skillText}33;">${skill}</span>`
    )
    .join("\n            ");

  const socialsHTML = data.socialLinks
    .filter((s) => s.url.trim())
    .map(
      (s) =>
        `<a href="${s.url}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:12px;background:${t.socialBg};color:${t.socialText};text-decoration:none;font-size:14px;border:1px solid ${t.socialBorder};transition:all 0.2s;" onmouseover="this.style.borderColor='${t.accent}';this.style.color='${t.accent}'" onmouseout="this.style.borderColor='${t.socialBorder}';this.style.color='${t.socialText}'">${s.platform}</a>`
    )
    .join("\n            ");

  const objectivesHTML = data.objectives.trim()
    ? `<div style="margin-bottom:40px;max-width:480px;margin-left:auto;margin-right:auto;">
        <h2 style="font-family:${t.fontDisplay};font-size:18px;font-weight:600;color:${t.accent};margin-bottom:12px;letter-spacing:1px;text-transform:uppercase;">Objetivos</h2>
        <p style="font-size:15px;line-height:1.7;color:${t.muted};">${data.objectives}</p>
      </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${data.name} — Portfólio</title>
  <meta name="description" content="${data.bio.slice(0, 155)}" />
  <link href="${t.fontImport}" rel="stylesheet" />
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: ${t.fontBody};
      background: ${t.bg};
      color: ${t.text};
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      max-width: 640px;
      width: 100%;
      padding: 60px 32px;
      text-align: center;
      ${t.cardBg !== "transparent" ? `background:${t.cardBg};border-radius:24px;margin:32px;box-shadow:0 4px 24px rgba(0,0,0,0.06);` : ""}
    }
    .avatar { margin: 0 auto 24px; }
    h1 {
      font-family: ${t.fontDisplay};
      font-size: 40px;
      font-weight: 700;
      background: linear-gradient(135deg, ${t.accent}, ${t.accentAlt});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 16px;
    }
    .bio {
      font-size: 16px;
      line-height: 1.7;
      color: ${t.muted};
      margin-bottom: 40px;
      max-width: 480px;
      margin-left: auto;
      margin-right: auto;
    }
    .skills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 40px; }
    .socials { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
    .footer { margin-top: 60px; font-size: 12px; color: ${t.footerColor}; }
  </style>
</head>
<body>
  <div class="container">
    <div class="avatar">${avatarHTML}</div>
    <h1>${data.name}</h1>
    <p class="bio">${data.bio}</p>
    ${objectivesHTML}
    ${data.skills.length > 0 ? `<div class="skills">${skillsHTML}</div>` : ""}
    ${socialsHTML ? `<div class="socials">${socialsHTML}</div>` : ""}
    <p class="footer">Feito com PortfolioGen</p>
  </div>
</body>
</html>`;
}
