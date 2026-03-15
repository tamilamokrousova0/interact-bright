import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const cssVariables = `:root {
  /* Background & Foreground */
  --background: 220 25% 10%;
  --foreground: 210 20% 92%;

  /* Card */
  --card: 220 22% 13%;
  --card-foreground: 210 20% 92%;

  /* Popover */
  --popover: 220 22% 13%;
  --popover-foreground: 210 20% 92%;

  /* Primary (WA Green) */
  --primary: 152 69% 53%;
  --primary-foreground: 220 25% 10%;

  /* Secondary */
  --secondary: 220 20% 18%;
  --secondary-foreground: 210 20% 85%;

  /* Muted */
  --muted: 220 18% 16%;
  --muted-foreground: 215 15% 55%;

  /* Accent */
  --accent: 210 80% 55%;
  --accent-foreground: 210 20% 98%;

  /* Destructive */
  --destructive: 0 72% 55%;
  --destructive-foreground: 210 20% 98%;

  /* Border / Input / Ring */
  --border: 220 15% 20%;
  --input: 220 15% 20%;
  --ring: 152 69% 53%;
  --radius: 0.75rem;

  /* Sidebar */
  --sidebar-bg: 220 28% 8%;
  --sidebar-border: 220 15% 15%;
  --sidebar-item-hover: 220 20% 15%;
  --sidebar-item-active: 220 20% 18%;

  /* WA Brand Colors */
  --wa-green: 152 69% 53%;
  --wa-green-dark: 152 60% 40%;
  --wa-teal: 174 60% 40%;
  --wa-blue: 210 80% 55%;
  --wa-orange: 30 90% 55%;
  --wa-red: 0 72% 55%;
  --wa-purple: 270 60% 55%;

  /* Panel */
  --panel-bg: 220 22% 12%;
  --panel-header: 220 25% 14%;

  /* Effects */
  --shadow-glow: 0 0 20px hsl(152 69% 53% / 0.1);
}`;

const tailwindConfig = `// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        wa: {
          green: "hsl(var(--wa-green))",
          "green-dark": "hsl(var(--wa-green-dark))",
          teal: "hsl(var(--wa-teal))",
          blue: "hsl(var(--wa-blue))",
          orange: "hsl(var(--wa-orange))",
          red: "hsl(var(--wa-red))",
          purple: "hsl(var(--wa-purple))",
        },
        panel: {
          DEFAULT: "hsl(var(--panel-bg))",
          header: "hsl(var(--panel-header))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-bg))",
          border: "hsl(var(--sidebar-border))",
          hover: "hsl(var(--sidebar-item-hover))",
          active: "hsl(var(--sidebar-item-active))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;`;

const scrollbarCSS = `/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: hsl(var(--background));
}
::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}`;

function CopyBlock({ title, code, language }: { title: string; code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = language === "typescript" ? "ts" : "css";
    const filename = title.toLowerCase().replace(/\s+/g, "-") + "." + ext;
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-panel-header border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{title}</span>
          <span className="text-[10px] px-2 py-0.5 bg-secondary rounded-full text-muted-foreground font-mono">{language}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-lg text-xs hover:bg-sidebar-hover transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Скачать
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs hover:opacity-90 transition-opacity font-medium"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Скопировано!" : "Копировать"}
          </motion.button>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed font-mono text-muted-foreground max-h-[400px] overflow-y-auto">
        <code>{code}</code>
      </pre>
    </motion.div>
  );
}

export default function ExportCSS() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Экспорт дизайн-системы WA Deck</h1>
          <p className="text-sm text-muted-foreground mt-1">CSS-переменные и Tailwind конфигурация</p>
        </div>
        <Link to="/" className="px-4 py-2 bg-secondary rounded-xl text-sm hover:bg-sidebar-hover transition-colors">
          ← Назад
        </Link>
      </div>

      {/* Color preview */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 rounded-xl border border-border bg-card p-4"
      >
        <p className="text-xs text-muted-foreground font-medium mb-3">Превью цветов</p>
        <div className="flex flex-wrap gap-2">
          {[
            { name: "primary", color: "bg-primary" },
            { name: "wa-blue", color: "bg-wa-blue" },
            { name: "wa-orange", color: "bg-wa-orange" },
            { name: "wa-red", color: "bg-wa-red" },
            { name: "wa-purple", color: "bg-wa-purple" },
            { name: "wa-teal", color: "bg-wa-teal" },
            { name: "background", color: "bg-background" },
            { name: "card", color: "bg-card" },
            { name: "secondary", color: "bg-secondary" },
            { name: "muted", color: "bg-muted" },
            { name: "sidebar", color: "bg-sidebar" },
            { name: "panel", color: "bg-panel" },
          ].map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-1">
              <div className={`w-10 h-10 rounded-lg ${c.color} border border-border`} />
              <span className="text-[10px] text-muted-foreground">{c.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="space-y-4">
        <CopyBlock title="CSS Variables" code={cssVariables} language="css" />
        <CopyBlock title="Tailwind Config" code={tailwindConfig} language="typescript" />
        <CopyBlock title="Scrollbar Styles" code={scrollbarCSS} language="css" />
      </div>
    </div>
  );
}
