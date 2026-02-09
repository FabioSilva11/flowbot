import { Handle, Position, NodeProps } from '@xyflow/react';
import { Timer } from 'lucide-react';
import { FlowNodeData } from '@/types/flow';

export function DelayNode({ data }: NodeProps) {
  const nodeData = data as FlowNodeData;
  const unitLabels: Record<string, string> = {
    seconds: 'segundos',
    minutes: 'minutos',
    hours: 'horas',
  };

  return (
    <div className="animate-node-enter group relative min-w-[200px] rounded-xl border border-node-delay/30 bg-card p-0 shadow-lg shadow-node-delay/10 transition-all hover:shadow-xl hover:shadow-node-delay/20">
      <Handle
        type="target"
        position={Position.Top}
        className="!border-node-delay/50 !bg-node-delay"
      />
      <div className="flex items-center gap-2 rounded-t-xl px-4 py-2.5" style={{ background: 'var(--gradient-delay)' }}>
        <Timer className="h-4 w-4 text-primary-foreground" />
        <span className="text-sm font-semibold text-primary-foreground">{nodeData.label}</span>
      </div>
      <div className="px-4 py-3">
        <p className="text-xs text-muted-foreground">
          Aguardar{' '}
          <span className="font-semibold text-node-delay">
            {nodeData.delay || 0} {unitLabels[nodeData.delayUnit || 'seconds']}
          </span>
        </p>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!border-node-delay/50 !bg-node-delay"
      />
    </div>
  );
}
