import { Handle, Position, NodeProps } from '@xyflow/react';
import { GitBranch } from 'lucide-react';
import { FlowNodeData } from '@/types/flow';

export function ConditionNode({ data }: NodeProps) {
  const nodeData = data as FlowNodeData;
  return (
    <div className="animate-node-enter group relative min-w-[220px] max-w-[280px] rounded-xl border border-node-condition/30 bg-card p-0 shadow-lg shadow-node-condition/10 transition-all hover:shadow-xl hover:shadow-node-condition/20">
      <Handle
        type="target"
        position={Position.Top}
        className="!border-node-condition/50 !bg-node-condition"
      />
      <div className="flex items-center gap-2 rounded-t-xl px-4 py-2.5" style={{ background: 'var(--gradient-condition)' }}>
        <GitBranch className="h-4 w-4 text-primary-foreground" />
        <span className="text-sm font-semibold text-primary-foreground">{nodeData.label}</span>
      </div>
      <div className="px-4 py-3">
        <p className="font-mono text-xs text-muted-foreground">
          {nodeData.condition || 'Sem condição'}
        </p>
        <div className="mt-2 flex gap-2">
          <span className="rounded-full bg-node-start/15 px-2 py-0.5 text-[10px] font-medium text-node-start">
            Sim ✓
          </span>
          <span className="rounded-full bg-node-action/15 px-2 py-0.5 text-[10px] font-medium text-node-action">
            Não ✗
          </span>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="yes"
        style={{ left: '30%' }}
        className="!border-node-start/50 !bg-node-start"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="no"
        style={{ left: '70%' }}
        className="!border-node-action/50 !bg-node-action"
      />
    </div>
  );
}
