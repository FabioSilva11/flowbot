import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Bot, MessageSquare, Users, TrendingUp, BarChart3, MessageCircle, Hash } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface DailyData {
  date: string;
  incoming: number;
  outgoing: number;
}

interface NodeTypeData {
  name: string;
  value: number;
}

export default function BotAnalytics() {
  const { botId } = useParams<{ botId: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [botName, setBotName] = useState('');
  const [botPlatform, setBotPlatform] = useState('telegram');
  const [totalIncoming, setTotalIncoming] = useState(0);
  const [totalOutgoing, setTotalOutgoing] = useState(0);
  const [uniqueUsers, setUniqueUsers] = useState(0);
  const [todayMessages, setTodayMessages] = useState(0);
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [nodeTypeData, setNodeTypeData] = useState<NodeTypeData[]>([]);
  const [conversionRate, setConversionRate] = useState(0);

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && botId) {
      fetchBotInfo();
      fetchAnalytics();
    }
  }, [user, botId]);

  const fetchBotInfo = async () => {
    const { data } = await supabase.from('bots').select('name, platform').eq('id', botId!).maybeSingle();
    if (data) {
      setBotName(data.name);
      setBotPlatform(data.platform);
    }
  };

  const fetchAnalytics = async () => {
    const { data: messages } = await supabase
      .from('bot_messages')
      .select('direction, telegram_chat_id, created_at, node_type')
      .eq('bot_id', botId!);

    if (!messages || messages.length === 0) return;

    const incoming = messages.filter(m => m.direction === 'incoming');
    const outgoing = messages.filter(m => m.direction === 'outgoing');
    const uniqueChats = new Set(messages.map(m => m.telegram_chat_id)).size;

    setTotalIncoming(incoming.length);
    setTotalOutgoing(outgoing.length);
    setUniqueUsers(uniqueChats);

    // Conversion: users who interacted more than once (returned)
    const chatCounts: Record<number, number> = {};
    incoming.forEach(m => { chatCounts[m.telegram_chat_id] = (chatCounts[m.telegram_chat_id] || 0) + 1; });
    const returning = Object.values(chatCounts).filter(c => c > 1).length;
    setConversionRate(uniqueChats > 0 ? Math.round((returning / uniqueChats) * 100) : 0);

    // Today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setTodayMessages(messages.filter(m => new Date(m.created_at) >= today).length);

    // Daily data - last 14 days
    const daily: Record<string, { incoming: number; outgoing: number }> = {};
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      daily[key] = { incoming: 0, outgoing: 0 };
    }
    messages.forEach(m => {
      const key = m.created_at.split('T')[0];
      if (daily[key]) {
        if (m.direction === 'incoming') daily[key].incoming++;
        else daily[key].outgoing++;
      }
    });
    setDailyData(Object.entries(daily).map(([date, d]) => ({ date, ...d })));

    // Node type distribution
    const nodeTypes: Record<string, number> = {};
    outgoing.forEach(m => {
      const t = m.node_type || 'other';
      nodeTypes[t] = (nodeTypes[t] || 0) + 1;
    });
    setNodeTypeData(Object.entries(nodeTypes).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value));
  };

  if (authLoading || !user) return null;

  const platformLabels: Record<string, { label: string; color: string }> = {
    telegram: { label: 'Telegram', color: 'text-primary' },
    whatsapp: { label: 'WhatsApp', color: 'text-node-start' },
    discord: { label: 'Discord', color: 'text-node-button' },
  };

  const pl = platformLabels[botPlatform] || platformLabels.telegram;

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--node-start))', 'hsl(var(--node-button))', 'hsl(var(--node-message))', 'hsl(var(--node-condition))', '#8884d8'];

  const stats = [
    { label: 'Mensagens Recebidas', value: totalIncoming, icon: MessageSquare, color: 'text-primary' },
    { label: 'Mensagens Enviadas', value: totalOutgoing, icon: MessageCircle, color: 'text-node-message' },
    { label: 'Usuários Únicos', value: uniqueUsers, icon: Users, color: 'text-node-start' },
    { label: 'Hoje', value: todayMessages, icon: TrendingUp, color: 'text-node-condition' },
    { label: 'Taxa de Retorno', value: `${conversionRate}%`, icon: BarChart3, color: 'text-primary' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-bold">Analytics: {botName}</h1>
            <Badge variant="outline" className={`text-[10px] ${pl.color}`}>{pl.label}</Badge>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        {/* Stats Grid */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className={`h-4 w-4 ${s.color}`} />
                <p className="text-[10px] sm:text-xs text-muted-foreground">{s.label}</p>
              </div>
              <p className="text-xl sm:text-2xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          {/* Bar Chart - 14 days */}
          <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
            <h2 className="text-sm font-semibold mb-4">Últimos 14 dias</h2>
            {dailyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dailyData}>
                  <XAxis
                    dataKey="date"
                    tickFormatter={(v) => new Date(v).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip
                    labelFormatter={(v) => new Date(v as string).toLocaleDateString('pt-BR')}
                    contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: 12 }}
                  />
                  <Bar dataKey="outgoing" name="Enviadas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="incoming" name="Recebidas" fill="hsl(var(--primary) / 0.4)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12">
                <BarChart3 className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">Nenhuma interação registrada ainda.</p>
              </div>
            )}
          </div>

          {/* Pie Chart - Node Types */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-sm font-semibold mb-4">Tipos de Bloco Usados</h2>
            {nodeTypeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={nodeTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {nodeTypeData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12">
                <p className="text-sm text-muted-foreground">Sem dados ainda.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
