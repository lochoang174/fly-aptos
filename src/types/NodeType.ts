import { GraphNode } from "reagraph";

export interface BaseNode extends GraphNode {
  id: string;
  type: string;
  content?: string;
  url?: string;
  color?: string;
}

// Edge interface
export interface EdgeType {
  id: string;
  source: string;
  target: string;
  label?: string;
}

// API response interface
export interface ResponseType {
  nodes: BaseNode[];
  edges: EdgeType[];
}
