import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "Crie sua conta", description: "Cadastre-se gratuitamente em menos de 30 segundos." },
  { number: "02", title: "Monte seu fluxo", description: "Arraste e solte blocos no editor visual para criar a lógica do bot." },
  { number: "03", title: "Escolha a plataforma", description: "Telegram, WhatsApp ou Discord — configure em poucos cliques." },
  { number: "04", title: "Lucre no automático", description: "Seu bot atende, vende e engaja 24/7 em todas as plataformas." },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Como <span className="text-gradient">Funciona</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            4 passos simples para automatizar seu negócio
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-primary text-primary-foreground font-display text-xl font-bold mb-6 shadow-glow">
                {step.number}
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
