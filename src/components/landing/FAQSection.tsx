import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Quais plataformas são suportadas?", a: "Atualmente o FlowBot suporta Telegram, WhatsApp (via Business Cloud API) e Discord. WhatsApp e Discord estão em fase BETA." },
  { q: "Preciso programar?", a: "Não! O FlowBot é 100% no-code. Você cria seus bots arrastando e soltando blocos no editor visual." },
  { q: "Posso usar as 3 plataformas no plano grátis?", a: "Sim! Todos os planos incluem acesso às 3 plataformas. O plano grátis permite 1 bot com blocos básicos." },
  { q: "O bot funciona quando eu não estou online?", a: "Sim! Seus bots rodam 24/7 na nuvem, independente de você estar online ou não." },
  { q: "Posso cancelar a qualquer momento?", a: "Sim, você pode cancelar sua assinatura a qualquer momento sem taxas adicionais." },
  { q: "Como funciona o WhatsApp Business?", a: "Utilizamos a WhatsApp Business Cloud API oficial da Meta. Você conecta seu número e pode enviar mensagens, botões interativos e templates aprovados." },
  { q: "Como funciona o Discord?", a: "Você conecta seu bot do Discord ao FlowBot e pode criar slash commands, embeds, botões e interações personalizadas no seu servidor." },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 border-t border-border">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Perguntas <span className="text-gradient">Frequentes</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-display font-semibold text-foreground text-sm">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
