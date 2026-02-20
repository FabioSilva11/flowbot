import { motion } from "framer-motion";
import { Check, Flame } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Grátis",
    subtitle: "1 bot · Todas as plataformas",
    popular: false,
    features: ["Editor visual drag & drop", "1 bot", "Telegram + WhatsApp + Discord", "Blocos básicos", "Suporte comunidade"],
    cta: "Selecionar",
  },
  {
    name: "Pro",
    price: "R$ 49/mês",
    subtitle: "5 bots · Todas as plataformas",
    popular: true,
    features: ["Tudo do Starter", "5 bots", "Todos os blocos", "Telegram + WhatsApp + Discord", "APIs externas & IA", "Suporte prioritário"],
    cta: "Começar Agora",
  },
  {
    name: "Enterprise",
    price: "R$ 149/mês",
    subtitle: "11 bots · Todas as plataformas",
    popular: false,
    features: ["Tudo do Pro", "11 bots", "Webhooks avançados", "Telegram + WhatsApp + Discord", "Suporte dedicado"],
    cta: "Selecionar",
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Planos & <span className="text-gradient">Preços</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Todas as plataformas em todos os planos. Comece grátis.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative glass rounded-2xl p-8 flex flex-col ${
                plan.popular ? "border-primary/50 shadow-glow scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                  <Flame className="h-3 w-3" />
                  Mais Popular
                </div>
              )}

              <h3 className="font-display text-xl font-bold text-foreground mb-1">{plan.name}</h3>
              <div className="font-display text-3xl font-bold text-gradient mb-1">{plan.price}</div>
              <p className="text-xs text-muted-foreground mb-6">{plan.subtitle}</p>

              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-secondary-foreground">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="/auth"
                className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                  plan.popular
                    ? "bg-gradient-primary text-primary-foreground shadow-glow hover:scale-105"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
