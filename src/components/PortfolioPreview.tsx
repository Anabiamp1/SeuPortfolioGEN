import { PortfolioData } from "@/types/portfolio";
import { ExternalLink } from "lucide-react";

interface PortfolioPreviewProps {
  data: PortfolioData;
}

const themeStyles = {
  dark: { bg: "bg-[#0f1319]", text: "text-[#e2e8f0]", muted: "text-[#94a3b8]", accent: "text-[#2dd4bf]", skillBg: "bg-[#2dd4bf]/10 text-[#2dd4bf] border-[#2dd4bf]/20", socialBg: "bg-white/5 text-[#e2e8f0] border-white/10 hover:border-[#2dd4bf]/40 hover:text-[#2dd4bf]", gradient: "from-[#2dd4bf] to-[#3b82f6]", footer: "text-[#475569]" },
  clean: { bg: "bg-[#f8fafc]", text: "text-[#1e293b]", muted: "text-[#64748b]", accent: "text-[#0ea5e9]", skillBg: "bg-[#0ea5e9]/8 text-[#0ea5e9] border-[#0ea5e9]/20", socialBg: "bg-[#f1f5f9] text-[#334155] border-[#e2e8f0] hover:border-[#0ea5e9]/40 hover:text-[#0ea5e9]", gradient: "from-[#0ea5e9] to-[#6366f1]", footer: "text-[#94a3b8]" },
  modern: { bg: "bg-[#18181b]", text: "text-[#fafafa]", muted: "text-[#a1a1aa]", accent: "text-[#a78bfa]", skillBg: "bg-[#a78bfa]/10 text-[#a78bfa] border-[#a78bfa]/20", socialBg: "bg-white/5 text-[#e4e4e7] border-[#a1a1aa]/15 hover:border-[#a78bfa]/40 hover:text-[#a78bfa]", gradient: "from-[#a78bfa] to-[#f472b6]", footer: "text-[#52525b]" },
};

export default function PortfolioPreview({ data }: PortfolioPreviewProps) {
  const hasContent = data.name || data.bio || data.skills.length > 0;
  const t = themeStyles[data.theme];

  if (!hasContent) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px] text-muted-foreground text-center p-8">
        <div>
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-2xl">✨</span>
          </div>
          <p className="font-display font-medium text-foreground/60">
            Comece a preencher para o preview
          </p>
          <p className="text-sm mt-1 text-muted-foreground">
            Seu portfólio aparecerá aqui em tempo real
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center min-h-[400px] p-8 transition-colors duration-300 ${t.bg}`}>
      <div className={`w-full max-w-md text-center space-y-6 animate-fade-in ${t.text}`}>
        {/* Avatar */}
        {data.photoUrl ? (
          <img
            src={data.photoUrl}
            alt={data.name}
            className={`w-20 h-20 mx-auto rounded-full object-cover border-2 border-transparent bg-gradient-to-br ${t.gradient}`}
            style={{ borderColor: "currentColor" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center font-display text-3xl font-bold bg-gradient-to-br ${t.gradient} text-white`}>
            {data.name.charAt(0).toUpperCase() || "?"}
          </div>
        )}

        {/* Name */}
        <h1 className={`text-3xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r ${t.gradient}`}>
          {data.name || "Seu Nome"}
        </h1>

        {/* Bio */}
        {data.bio && (
          <p className={`${t.muted} leading-relaxed max-w-sm mx-auto`}>
            {data.bio}
          </p>
        )}

        {/* Objectives */}
        {data.objectives && (
          <div className="max-w-sm mx-auto">
            <h2 className={`text-xs font-semibold uppercase tracking-widest ${t.accent} mb-2`}>Objetivos</h2>
            <p className={`${t.muted} text-sm leading-relaxed`}>{data.objectives}</p>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border ${t.skillBg}`}
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Social Links */}
        {data.socialLinks.filter((s) => s.url.trim()).length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center pt-2">
            {data.socialLinks
              .filter((s) => s.url.trim())
              .map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition-all ${t.socialBg}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {s.platform}
                </a>
              ))}
          </div>
        )}

        <p className={`text-xs pt-6 ${t.footer}`}>
          Feito com PortfolioGen
        </p>
      </div>
    </div>
  );
}
