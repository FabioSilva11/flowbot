import { Handle, Position } from '@xyflow/react';
import { QrCode } from 'lucide-react';
import { FlowNodeData } from '@/types/flow';

export function MercadoPagoNode({ data }: { data: FlowNodeData }) {
  return (
    <div className="min-w-[200px] rounded-xl border-2 border-node-mercadoPago/30 bg-card shadow-lg animate-node-enter">
      <Handle type="target" position={Position.Left} className="!bg-node-mercadoPago !border-node-mercadoPago" />
      <div className="flex items-center gap-2 rounded-t-xl bg-node-mercadoPago/10 px-3 py-2">
        <QrCode className="h-4 w-4 text-node-mercadoPago" />
        <span className="text-xs font-bold text-node-mercadoPago">{data.label}</span>
      </div>
      <div className="px-3 py-2">
        <p className="text-[10px] text-foreground/80 truncate">{String(data.mpDescription || 'Pagamento não configurado...')}</p>
        <p className="mt-1 text-[10px] text-muted-foreground">
          {data.mpAmount ? `R$ ${(Number(data.mpAmount) / 100).toFixed(2)}` : 'Valor não definido'} • Pix
        </p>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-node-mercadoPago !border-node-mercadoPago" />
    </div>
  );
}
