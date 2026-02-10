import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactFlowProvider } from '@xyflow/react';
import { FlowProvider } from '@/contexts/FlowContext';
import { useAuth } from '@/contexts/AuthContext';
import { NodesSidebar } from '@/components/flow/NodesSidebar';
import { FlowCanvas } from '@/components/flow/FlowCanvas';
import { FlowToolbar } from '@/components/flow/FlowToolbar';
import { NodeEditorPanel } from '@/components/flow/NodeEditorPanel';

export default function Editor() {
  const { botId } = useParams<{ botId: string }>();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  if (loading || !user || !botId) return null;

  return (
    <ReactFlowProvider>
      <FlowProvider botId={botId}>
        <div className="flex h-screen w-screen overflow-hidden bg-background">
          <NodesSidebar />
          <div className="flex flex-1 flex-col">
            <FlowToolbar botId={botId} />
            <div className="relative flex-1">
              <FlowCanvas />
              <NodeEditorPanel />
            </div>
          </div>
        </div>
      </FlowProvider>
    </ReactFlowProvider>
  );
}
