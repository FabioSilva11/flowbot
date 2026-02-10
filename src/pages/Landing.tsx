import { Link } from 'react-router-dom';
import { Bot, MessageSquare, GitBranch, Zap, Timer, Shield, Briefcase, Star, ChevronDown, ArrowRight, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const features = [
  { icon: MessageSquare, title: 'Mensagens Dinâmicas', desc: 'Envie textos, imagens e documentos automaticamente.' },
  { icon: GitBranch, title: 'Fluxos Condicionais', desc: 'Crie ramificações inteligentes baseadas nas respostas.' },
  { icon: Zap, title: 'Ações & APIs', desc: 'Conecte com APIs externas e automatize processos.' },
  { icon: Timer, title: 'Atrasos Programados', desc: 'Defina intervalos entre mensagens para melhor UX.' },
  { icon: Shield, title: 'Seguro & Privado', desc: 'Seus tokens e dados ficam protegidos e criptografados.' },
  { icon: Briefcase, title: 'Multi-Bot', desc: 'Gerencie quantos bots quiser em uma única conta.' },
];

const plans = [
  { name: 'Starter', price: 'Grátis', sub: '1 bot', features: ['Editor visual', '100 mensagens/dia', 'Suporte comunidade'], highlight: false },
  { name: 'Pro', price: 'R$ 49/mês', sub: '10 bots', features: ['Tudo do Starter', 'Mensagens ilimitadas', 'APIs externas', 'Suporte prioritário'], highlight: true },
  { name: 'Enterprise', price: 'R$ 149/mês', sub: 'Bots ilimitados', features: ['Tudo do Pro', 'White-label', 'Webhooks avançados', 'Suporte dedicado'], highlight: false },
];

const testimonials = [
  { text: '"Criei meu bot de atendimento em menos de 30 minutos. Incrível!"', name: 'Carlos M.', role: 'Empreendedor Digital', stars: 5 },
  { text: '"Gerencio 5 bots de clientes diferentes em uma única conta. Muito prático."', name: 'Ana P.', role: 'Social Media Manager', stars: 5 },
  { text: '"O editor visual é super intuitivo. Meus clientes adoram os bots que crio aqui."', name: 'Rafael S.', role: 'Dev Freelancer', stars: 5 },
];

const faqs = [
  { q: 'Como funciona o editor de fluxo?', a: 'Você arrasta blocos para o canvas e conecta-os criando o fluxo conversacional do seu bot. É visual e intuitivo, sem necessidade de código.' },
  { q: 'Preciso saber programar?', a: 'Não! O FlowBot foi feito para qualquer pessoa criar bots profissionais sem escrever uma linha de código.' },
  { q: 'Posso criar quantos bots eu quiser?', a: 'Depende do seu plano. O plano gratuito permite 1 bot, o Pro até 10 e o Enterprise é ilimitado.' },
  { q: 'Meus dados estão seguros?', a: 'Sim. Todos os tokens e dados são criptografados e armazenados com segurança em nossa infraestrutura.' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-bold">FlowBot</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="sm">Entrar</Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button size="sm" className="bg-primary text-primary-foreground">Começar Grátis</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="h-4 w-4" /> Novo: Editor visual de fluxos
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Crie bots de Telegram{' '}
            <span className="text-primary">sem código</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Construa fluxos conversacionais poderosos com nosso editor visual drag-and-drop.
            Gerencie múltiplos bots em um só lugar.
          </p>
          <Link to="/auth?mode=signup">
            <Button size="lg" className="gap-2 bg-primary text-primary-foreground">
              Criar Conta Grátis <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold">Tudo que você precisa</h2>
          <p className="mb-12 text-center text-muted-foreground">Ferramentas poderosas para criar bots profissionais</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-3xl font-bold">Planos & Preços</h2>
          <p className="mb-12 text-center text-muted-foreground">Escolha o plano ideal para você</p>
          <div className="grid gap-6 sm:grid-cols-3">
            {plans.map((p) => (
              <div key={p.name} className={`rounded-xl border p-6 ${p.highlight ? 'border-primary bg-card shadow-lg shadow-primary/5' : 'border-border bg-card'}`}>
                <h3 className="font-semibold">{p.name}</h3>
                <div className="mt-2 text-2xl font-bold">{p.price}</div>
                <p className="mb-6 text-sm text-primary">{p.sub}</p>
                <ul className="mb-6 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/auth?mode=signup">
                  <Button className={`w-full ${p.highlight ? 'bg-primary text-primary-foreground' : 'border border-border bg-secondary text-foreground'}`}>
                    {p.highlight ? 'Começar Agora' : 'Selecionar'}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold">O que dizem nossos usuários</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-xl border border-border bg-card p-6">
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mb-4 text-sm text-muted-foreground">{t.text}</p>
                <p className="font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Perguntas Frequentes</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-border bg-card px-6">
                <AccordionTrigger className="text-left text-sm font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 text-center text-xs text-muted-foreground">
        © 2026 FlowBot Builder. Todos os direitos reservados.
      </footer>
    </div>
  );
}
