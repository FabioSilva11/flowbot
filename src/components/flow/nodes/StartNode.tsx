import { Handle, Position, NodeProps } from '@xyflow/react';
import { Play } from 'lucide-react';
import { FlowNodeData } from '@/types/flow';

export function StartNode({ data }: NodeProps) {
  const nodeData = data as FlowNodeData;
  return (
    <div className="animate-node-enter group relative min-w-[200px] rounded-xl border border-node-start/30 bg-card p-0 shadow-lg shadow-node-start/10 transition-all hover:shadow-xl hover:shadow-node-start/20">
      <div className="flex items-center gap-2 rounded-t-xl px-4 py-2.5" style={{ background: 'var(--gradient-start)' }}>
        <Play className="h-4 w-4 text-primary-foreground" />
        <span className="text-sm font-semibold text-primary-foreground">{nodeData.label}</span>
      </div>
      <div className="px-4 py-3">
        <p className="font-mono text-xs text-muted-foreground">
          Trigger: <span className="text-node-start">{nodeData.content || '/start'}</span>
        </p>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!border-node-start/50 !bg-node-start"
      />
    </div>
  );
}
