import { NodesSidebar } from '@/components/flow/NodesSidebar';
import { FlowCanvas } from '@/components/flow/FlowCanvas';
import { FlowToolbar } from '@/components/flow/FlowToolbar';
import { ReactFlowProvider } from '@xyflow/react';

const Index = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <NodesSidebar />
      <div className="flex flex-1 flex-col">
        <FlowToolbar />
        <div className="flex-1">
          <ReactFlowProvider>
            <FlowCanvas />
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
};

export default Index;
