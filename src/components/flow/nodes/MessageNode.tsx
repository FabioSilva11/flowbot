import { Handle, Position, NodeProps } from '@xyflow/react';
import { MessageSquare } from 'lucide-react';
import { FlowNodeData } from '@/types/flow';

export function MessageNode({ data }: NodeProps) {
  const nodeData = data as FlowNodeData;
  return (
    <div className="animate-node-enter group relative min-w-[220px] max-w-[280px] rounded-xl border border-node-message/30 bg-card p-0 shadow-lg shadow-node-message/10 transition-all hover:shadow-xl hover:shadow-node-message/20">
      <Handle
        type="target"
        position={Position.Top}
        className="!border-node-message/50 !bg-node-message"
      />
      <div className="flex items-center gap-2 rounded-t-xl px-4 py-2.5" style={{ background: 'var(--gradient-message)' }}>
        <MessageSquare className="h-4 w-4 text-primary-foreground" />
        <span className="text-sm font-semibold text-primary-foreground">{nodeData.label}</span>
      </div>
      <div className="px-4 py-3">
        <p className="text-xs leading-relaxed text-secondary-foreground">
          {nodeData.content || 'Mensagem vazia...'}
        </p>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!border-node-message/50 !bg-node-message"
      />
    </div>
  );
}
