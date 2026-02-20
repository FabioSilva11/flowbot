import { Bot, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Plataformas", href: "#platforms" },
  { label: "Recursos", href: "#features" },
  { label: "Como Funciona", href: "#how-it-works" },
  { label: "Preços", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <Bot className="h-7 w-7 text-primary" />
          FlowBot
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
            Entrar
          </Link>
          <a href="#pricing" className="inline-flex items-center rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:opacity-90">
            Começar Grátis
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground">Entrar</Link>
          <a href="#pricing" className="inline-flex items-center justify-center rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            Começar Grátis
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
