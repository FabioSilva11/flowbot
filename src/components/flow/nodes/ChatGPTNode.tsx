import { Handle, Position } from '@xyflow/react';
import { Bot } from 'lucide-react';
import { FlowNodeData } from '@/types/flow';

export function ChatGPTNode({ data }: { data: FlowNodeData }) {
  return (
    <div className="min-w-[200px] rounded-xl border-2 border-node-chatgpt/30 bg-card shadow-lg animate-node-enter">
      <Handle type="target" position={Position.Left} className="!bg-node-chatgpt !border-node-chatgpt" />
      <div className="flex items-center gap-2 rounded-t-xl bg-node-chatgpt/10 px-3 py-2">
        <Bot className="h-4 w-4 text-node-chatgpt" />
        <span className="text-xs font-bold text-node-chatgpt">{data.label}</span>
      </div>
      <div className="px-3 py-2">
        <p className="text-[10px] text-foreground/80 truncate">{String(data.aiPrompt || 'Prompt não definido...')}</p>
        <p className="mt-1 text-[10px] text-muted-foreground">Modelo: {String(data.aiModel || 'gpt-4')}</p>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-node-chatgpt !border-node-chatgpt" />
    </div>
  );
}
