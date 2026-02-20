import { motion } from "framer-motion";
import heroDashboard from "@/assets/hero-dashboard.png";

const channels = [
  {
    emoji: "✈️",
    title: "Telegram",
    description: "Bots completos com mensagens, botões, enquetes, pagamentos e mais.",
  },
  {
    emoji: "💬",
    title: "WhatsApp",
    badge: "BETA",
    description: "WhatsApp Business Cloud API: mensagens, botões interativos e templates.",
  },
  {
    emoji: "🎮",
    title: "Discord",
    badge: "BETA",
    description: "Slash commands, embeds, botões e interações no seu servidor.",
  },
];

const PlatformsSection = () => {
  return (
    <section id="platforms" className="py-24 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Uma Plataforma, <span className="text-gradient">3 Canais</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Mesmo editor, mesmo fluxo. Publique onde seu público está.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {channels.map((ch, i) => (
            <motion.div
              key={ch.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-xl p-8 text-center hover:border-primary/40 transition-all duration-300 hover:shadow-glow group"
            >
              <span className="text-5xl mb-4 block">{ch.emoji}</span>
              <div className="flex items-center justify-center gap-2 mb-3">
                <h3 className="font-display text-xl font-bold text-foreground">{ch.title}</h3>
                {ch.badge && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                    {ch.badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{ch.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Editor Visual <span className="text-gradient">Intuitivo</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Arraste, solte e conecte blocos — sem código, sem complicação.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="absolute -inset-4 rounded-2xl bg-primary/10 blur-3xl" />
          <img
            src={heroDashboard}
            alt="FlowBot Editor Visual - Interface de criação de bots multiplataforma"
            className="relative rounded-xl border border-glow shadow-card w-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformsSection;
