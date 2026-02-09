import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Bot, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { BotCredentials } from '@/types/flow';

interface BotSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BotSettingsDialog({ open, onOpenChange }: BotSettingsDialogProps) {
  const [credentials, setCredentials] = useState<BotCredentials>({
    token: '',
    botName: '',
    webhookUrl: '',
  });
  const [showToken, setShowToken] = useState(false);
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  const handleTest = async () => {
    if (!credentials.token) return;
    setStatus('testing');

    try {
      const res = await fetch(`https://api.telegram.org/bot${credentials.token}/getMe`);
      const data = await res.json();

      if (data.ok) {
        setCredentials((prev) => ({
          ...prev,
          botName: data.result.first_name + (data.result.username ? ` (@${data.result.username})` : ''),
        }));
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleSave = () => {
    localStorage.setItem('bot_credentials', JSON.stringify(credentials));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Bot className="h-5 w-5 text-primary" />
            Credenciais do Bot
          </DialogTitle>
          <DialogDescription>
            Insira o token do seu bot do Telegram obtido via @BotFather
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Token */}
          <div className="space-y-2">
            <Label htmlFor="token" className="text-xs text-muted-foreground">
              Bot Token
            </Label>
            <div className="relative">
              <Input
                id="token"
                type={showToken ? 'text' : 'password'}
                placeholder="123456789:ABCdefGHIjklMNOpqrSTUvwxYZ"
                value={credentials.token}
                onChange={(e) => {
                  setCredentials((prev) => ({ ...prev, token: e.target.value }));
                  setStatus('idle');
                }}
                className="border-border bg-secondary pr-10 font-mono text-xs"
              />
              <button
                type="button"
                onClick={() => setShowToken(!showToken)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Bot Name (auto-filled) */}
          {credentials.botName && (
            <div className="flex items-center gap-2 rounded-lg border border-node-start/30 bg-node-start/10 px-3 py-2">
              <CheckCircle2 className="h-4 w-4 text-node-start" />
              <span className="text-sm text-node-start">{credentials.botName}</span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-2 rounded-lg border border-node-action/30 bg-node-action/10 px-3 py-2">
              <AlertCircle className="h-4 w-4 text-node-action" />
              <span className="text-sm text-node-action">Token inválido. Verifique e tente novamente.</span>
            </div>
          )}

          {/* Webhook URL (optional) */}
          <div className="space-y-2">
            <Label htmlFor="webhook" className="text-xs text-muted-foreground">
              Webhook URL <span className="text-muted-foreground/50">(opcional)</span>
            </Label>
            <Input
              id="webhook"
              placeholder="https://seu-servidor.com/webhook"
              value={credentials.webhookUrl}
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, webhookUrl: e.target.value }))
              }
              className="border-border bg-secondary font-mono text-xs"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={handleTest}
              disabled={!credentials.token || status === 'testing'}
              className="flex-1 border-border"
            >
              {status === 'testing' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testando...
                </>
              ) : (
                'Testar Conexão'
              )}
            </Button>
            <Button
              onClick={handleSave}
              disabled={status !== 'success'}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
