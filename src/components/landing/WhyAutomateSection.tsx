import { motion } from "framer-motion";
import { Clock, ShoppingCart, TrendingUp, DollarSign, Shield, Layers } from "lucide-react";

const reasons = [
  { icon: Clock, title: "Atendimento 24/7 em 3 plataformas", description: "Bots respondem no Telegram, WhatsApp e Discord simultaneamente." },
  { icon: ShoppingCart, title: "Vendas no piloto automático", description: "Capture leads, envie catálogos e feche vendas em qualquer chat." },
  { icon: TrendingUp, title: "Engajamento altíssimo", description: "Taxas de abertura muito maiores que email ou redes sociais." },
  { icon: DollarSign, title: "Custo baixo, retorno rápido", description: "Comece grátis com todas as plataformas, escale por R$49/mês." },
  { icon: Shield, title: "Segurança total", description: "Tokens criptografados, dados protegidos por RLS." },
  { icon: Layers, title: "Multiplataforma nativo", description: "Um editor, três plataformas. Mesmo fluxo, alcance máximo." },
];

const WhyAutomateSection = () => {
  return (
    <section id="features" className="relative py-24 overflow-hidden border-t border-border">
      <div className="absolute inset-0 bg-glow opacity-50" />
      <div className="relative container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Por que Você <span className="text-gradient">PRECISA</span> Automatizar Hoje?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Quem não automatiza, perde clientes para quem automatiza.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-xl p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-glow group"
            >
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                <reason.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{reason.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAutomateSection;
