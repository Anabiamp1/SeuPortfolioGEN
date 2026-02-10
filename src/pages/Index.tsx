import { useState } from "react";
import { PortfolioData } from "@/types/portfolio";
import PortfolioForm from "@/components/PortfolioForm";
import PortfolioPreview from "@/components/PortfolioPreview";
import { generatePortfolioHTML } from "@/lib/generateHTML";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileCode, Zap } from "lucide-react";
import { toast } from "sonner";

const initialData: PortfolioData = {
  name: "",
  bio: "",
  objectives: "",
  photoUrl: "",
  skills: [],
  socialLinks: [],
  theme: "dark",
};

const Index = () => {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const handleDownload = () => {
    if (!data.name.trim()) {
      toast.error("Adicione pelo menos seu nome para gerar o portfólio.");
      return;
    }
    const html = generatePortfolioHTML(data);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.name.toLowerCase().replace(/\s+/g, "-")}-portfolio.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Portfólio baixado com sucesso!");
  };

  const handleOpenPreview = () => {
    if (!data.name.trim()) {
      toast.error("Adicione pelo menos seu nome para gerar o portfólio.");
      return;
    }
    const html = generatePortfolioHTML(data);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(174 72% 56%), hsl(210 80% 55%))" }}
            >
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              Portfolio<span className="text-primary">Gen</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile preview toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMobilePreview(!showMobilePreview)}
              className="md:hidden border-border text-muted-foreground hover:text-primary hover:border-primary"
            >
              <Eye className="w-4 h-4 mr-1" />
              {showMobilePreview ? "Editar" : "Preview"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenPreview}
              className="border-border text-muted-foreground hover:text-primary hover:border-primary"
            >
              <FileCode className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Abrir</span>
            </Button>
            <Button
              size="sm"
              onClick={handleDownload}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Download className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Baixar HTML</span>
              <span className="sm:hidden">Baixar</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border/30 py-12 text-center"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
            Crie seu <span className="gradient-text">Portfólio</span> em segundos
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Preencha suas informações e baixe uma página pronta para publicar!
            Sem login, sem complicação.
          </p>
        </div>
      </section>

      {/* Main */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <div className={`${showMobilePreview ? "hidden md:block" : "block"}`}>
            <div className="bg-card rounded-2xl border border-border p-6 card-shadow">
              <PortfolioForm data={data} onChange={setData} />
            </div>
          </div>

          {/* Preview */}
          <div className={`${showMobilePreview ? "block" : "hidden md:block"}`}>
            <div className="bg-card rounded-2xl border border-border card-shadow sticky top-24 overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border/50">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
                <span className="text-xs text-muted-foreground ml-2 font-mono">preview</span>
              </div>
              <PortfolioPreview data={data} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
