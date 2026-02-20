import { motion } from "framer-motion";
import { MessageSquare, GitBranch, Plug, Timer, Monitor, Sparkles } from "lucide-react";

const tools = [
  { icon: MessageSquare, title: "Mensagens Dinâmicas", description: "Textos, imagens, vídeos, docs e áudios em qualquer plataforma." },
  { icon: GitBranch, title: "Fluxos Condicionais", description: "Ramificações inteligentes baseadas nas respostas do usuário." },
  { icon: Plug, title: "Ações & APIs", description: "Integre CRM, pagamentos, Google Sheets, webhooks e mais." },
  { icon: Timer, title: "Atrasos Programados", description: "Timing perfeito para nutrição de leads e conversão." },
  { icon: Monitor, title: "Multi-Bot & Multi-Plataforma", description: "Gerencie dezenas de bots em Telegram, WhatsApp e Discord." },
  { icon: Sparkles, title: "IA Integrada", description: "ChatGPT, Gemini e Groq direto nos seus fluxos." },
];

const ToolsSection = () => {
  return (
    <section className="relative py-24 overflow-hidden border-t border-border">
      <div className="absolute inset-0 bg-glow opacity-30" />
      <div className="relative container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Ferramentas <span className="text-gradient">Poderosas</span> para Todas as Plataformas
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tudo que você precisa para criar bots profissionais
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-xl p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-glow group"
            >
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                <tool.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{tool.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
