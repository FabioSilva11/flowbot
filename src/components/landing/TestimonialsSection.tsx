import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { quote: "Criei bots para Telegram e WhatsApp ao mesmo tempo. Meu faturamento subiu 3x!", name: "Carlos M.", role: "Empreendedor Digital" },
  { quote: "Gerencio 8 bots em 3 plataformas diferentes. Economia de tempo absurda.", name: "Ana P.", role: "Social Media Manager" },
  { quote: "Editor visual incrível. Comecei grátis e migrei pro Pro na semana.", name: "Rafael S.", role: "Dev Freelancer" },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            O Que Estão <span className="text-gradient">Dizendo</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-xl p-8"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-6">"{t.quote}"</p>
              <div>
                <p className="font-display font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
