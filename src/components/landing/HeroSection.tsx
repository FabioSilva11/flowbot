import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Stars = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 50 }).map((_, i) => (
      <div
        key={i}
        className="star"
        style={{
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          "--delay": `${Math.random() * 5}s`,
          "--duration": `${Math.random() * 3 + 2}s`,
        } as React.CSSProperties}
      />
    ))}
  </div>
);

const platforms = [
  { emoji: "✈️", label: "Telegram", badge: null },
  { emoji: "💬", label: "WhatsApp", badge: "BETA" },
  { emoji: "🎮", label: "Discord", badge: "BETA" },
];

const stats = [
  { value: "3", label: "Plataformas Suportadas" },
  { value: "98%", label: "Taxa de abertura" },
  { value: "24/7", label: "Atendimento na nuvem" },
  { value: "3x", label: "Aumento médio em vendas" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-glow" />
      <Stars />

      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-glow bg-secondary/60 px-4 py-1.5 text-xs font-medium text-primary mb-6"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Plataforma No-Code para Bots
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl mb-6"
        >
          Bots para <span className="text-gradient">Telegram, WhatsApp</span> e{" "}
          <span className="text-gradient">Discord</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-base sm:text-lg max-w-2xl mb-10"
        >
          Crie bots profissionais para 3 plataformas com editor visual drag & drop.
          Automatize atendimento, vendas e engajamento 24/7 sem escrever código.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          {platforms.map((p) => (
            <div key={p.label} className="glass rounded-xl px-5 py-3 flex items-center gap-3">
              <span className="text-2xl">{p.emoji}</span>
              <span className="font-display font-semibold text-foreground">{p.label}</span>
              {p.badge && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                  {p.badge}
                </span>
              )}
            </div>
          ))}
        </motion.div>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          href="#pricing"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-glow transition-all hover:scale-105 mb-16"
        >
          Criar Minha Conta Grátis
          <ArrowRight className="h-4 w-4" />
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-5 text-center">
              <div className="font-display text-3xl font-bold text-gradient mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
