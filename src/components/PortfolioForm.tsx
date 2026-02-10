import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PortfolioData, SocialLink, PLATFORM_OPTIONS, ThemeOption } from "@/types/portfolio";
import { Plus, X, Sparkles, Upload, Moon, Sun, Cpu, Trash2 } from "lucide-react";

interface PortfolioFormProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
}

const THEME_OPTIONS: { value: ThemeOption; label: string; desc: string; icon: React.ReactNode }[] = [
  { value: "dark", label: "Dark", desc: "Escuro e elegante", icon: <Moon className="h-4 w-4" /> },
  { value: "clean", label: "Clean", desc: "Claro e minimalista", icon: <Sun className="h-4 w-4" /> },
  { value: "modern", label: "Modern", desc: "Moderno e vibrante", icon: <Cpu className="h-4 w-4" /> },
];

export default function PortfolioForm({ data, onChange }: PortfolioFormProps) {
  const [skillInput, setSkillInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = (partial: Partial<PortfolioData>) => onChange({ ...data, ...partial });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return; // max 5MB

    const reader = new FileReader();
    reader.onload = () => update({ photoUrl: reader.result as string });
    reader.readAsDataURL(file);
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !data.skills.includes(trimmed)) {
      update({ skills: [...data.skills, trimmed] });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => update({ skills: data.skills.filter((s) => s !== skill) });

  const addSocial = () =>
    update({
      socialLinks: [...data.socialLinks, { platform: PLATFORM_OPTIONS[0], url: "" }],
    });

  const updateSocial = (index: number, partial: Partial<SocialLink>) => {
    const updated = data.socialLinks.map((s, i) => (i === index ? { ...s, ...partial } : s));
    update({ socialLinks: updated });
  };

  const removeSocial = (index: number) => update({ socialLinks: data.socialLinks.filter((_, i) => i !== index) });

  return (
    <div className="space-y-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-foreground">Seus dados</h2>
          <p className="text-sm text-muted-foreground">Preencha e veja o preview ao vivo</p>
        </div>
      </div>

      {/* Photo Upload */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
          <Upload className="h-3.5 w-3.5" />
          Foto de Perfil
        </Label>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />

        {data.photoUrl ? (
          <div className="flex items-center gap-3">
            <img
              src={data.photoUrl}
              alt="Preview"
              className="h-16 w-16 rounded-full border-2 border-primary/30 object-cover"
            />

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="border-border hover:border-primary hover:text-primary"
              >
                Trocar
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => update({ photoUrl: "" })}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className={[
              "flex h-20 w-full flex-col gap-1",
              "border-dashed border-border",
              "hover:border-primary hover:text-primary",
            ].join(" ")}
          >
            <Upload className="h-5 w-5" />
            <span className="text-xs">Clique para enviar uma foto</span>
          </Button>
        )}
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Nome</Label>
        <Input
          placeholder="Seu nome completo"
          value={data.name}
          onChange={(e) => update({ name: e.target.value })}
          maxLength={80}
          className="border-border bg-secondary/50 focus:border-primary"
        />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Bio</Label>
        <Textarea
          placeholder="Conte um pouco sobre você..."
          value={data.bio}
          onChange={(e) => update({ bio: e.target.value })}
          maxLength={500}
          rows={3}
          className="resize-none border-border bg-secondary/50 focus:border-primary"
        />
      </div>

      {/* Objectives */}
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Objetivos</Label>
        <Textarea
          placeholder="Descreva seus objetivos profissionais..."
          value={data.objectives}
          onChange={(e) => update({ objectives: e.target.value })}
          maxLength={500}
          rows={3}
          className="resize-none border-border bg-secondary/50 focus:border-primary"
        />
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Skills</Label>

        <div className="flex gap-2">
          <Input
            placeholder="Ex: React, Design, Python..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            maxLength={30}
            className="border-border bg-secondary/50 focus:border-primary"
          />

          <Button
            type="button"
            onClick={addSkill}
            size="icon"
            variant="outline"
            className="shrink-0 border-border hover:border-primary hover:text-primary"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {data.skills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className={[
                  "inline-flex items-center gap-1.5",
                  "rounded-full px-3 py-1",
                  "border border-primary/20",
                  "bg-primary/10 text-sm text-primary",
                ].join(" ")}
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="transition-colors hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Social Links */}
      <div className="space-y-3">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Redes Sociais</Label>

        {data.socialLinks.map((social, i) => (
          <div
            key={i}
            className="flex items-center gap-2 animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <select
              value={social.platform}
              onChange={(e) => updateSocial(i, { platform: e.target.value })}
              className={[
                "h-10 rounded-md px-3 text-sm",
                "border border-border bg-secondary/50 text-foreground",
                "outline-none focus:border-primary",
              ].join(" ")}
            >
              {PLATFORM_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <Input
              placeholder="https://..."
              value={social.url}
              onChange={(e) => updateSocial(i, { url: e.target.value })}
              maxLength={200}
              className="border-border bg-secondary/50 focus:border-primary"
            />

            <Button
              type="button"
              onClick={() => removeSocial(i)}
              size="icon"
              variant="ghost"
              className="shrink-0 text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          onClick={addSocial}
          variant="outline"
          className="w-full border-dashed border-border hover:border-primary hover:text-primary"
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar rede social
        </Button>
      </div>

      {/* Theme Selection */}
      <div className="space-y-3">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Tema do Portfólio</Label>

        <div className="grid grid-cols-3 gap-2">
          {THEME_OPTIONS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => update({ theme: t.value })}
              className={[
                "flex flex-col items-center gap-1.5 p-3 text-center",
                "rounded-xl border transition-all",
                data.theme === t.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/40",
              ].join(" ")}
            >
              {t.icon}
              <span className="text-sm font-medium">{t.label}</span>
              <span className="text-[10px] opacity-70">{t.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
