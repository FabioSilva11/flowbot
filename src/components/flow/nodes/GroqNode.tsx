import { Handle, Position } from '@xyflow/react';
import { Cpu } from 'lucide-react';
import { FlowNodeData } from '@/types/flow';

export function GroqNode({ data }: { data: FlowNodeData }) {
  return (
    <div className="min-w-[200px] rounded-xl border-2 border-node-groq/30 bg-card shadow-lg animate-node-enter">
      <Handle type="target" position={Position.Left} className="!bg-node-groq !border-node-groq" />
      <div className="flex items-center gap-2 rounded-t-xl bg-node-groq/10 px-3 py-2">
        <Cpu className="h-4 w-4 text-node-groq" />
        <span className="text-xs font-bold text-node-groq">{data.label}</span>
      </div>
      <div className="px-3 py-2">
        <p className="text-[10px] text-foreground/80 truncate">{String(data.aiPrompt || 'Prompt não definido...')}</p>
        <p className="mt-1 text-[10px] text-muted-foreground">Modelo: {String(data.aiModel || 'llama3-70b')}</p>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-node-groq !border-node-groq" />
    </div>
  );
}
