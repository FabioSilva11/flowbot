import { Node, Edge } from '@xyflow/react';

export type NodeType = 'start' | 'message' | 'condition' | 'buttonReply' | 'action' | 'delay';

export interface FlowNodeData {
  label: string;
  type: NodeType;
  content?: string;
  buttons?: { id: string; text: string }[];
  condition?: string;
  action?: string;
  delay?: number;
  delayUnit?: 'seconds' | 'minutes' | 'hours';
  [key: string]: unknown;
}

export type FlowNode = Node<FlowNodeData>;
export type FlowEdge = Edge;

export interface BotCredentials {
  token: string;
  botName: string;
  webhookUrl?: string;
}

export interface DragItem {
  type: NodeType;
  label: string;
  icon: string;
  description: string;
}
