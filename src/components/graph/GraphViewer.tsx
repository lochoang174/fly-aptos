import React, { useRef } from "react";
import { GraphCanvas, GraphCanvasRef, useSelection } from "reagraph";
import { BaseNode, EdgeType } from "../../types/NodeType";

interface GraphViewerProps {
  nodes: BaseNode[];
  edges: EdgeType[];
  onSelectNode: (node: BaseNode) => void;
}

export default function GraphViewer({ nodes, edges, onSelectNode }: GraphViewerProps) {
  const graphRef = useRef<GraphCanvasRef | null>(null);

  const { selections, actives, onNodeClick, onCanvasClick, onNodePointerOver, onNodePointerOut } =
    useSelection({
      ref: graphRef,
      nodes,
      edges,
      pathSelectionType: "in",
      pathHoverType: "in",
    });

  return (
    <div className="flex-1 border rounded-lg shadow-sm relative">
      <GraphCanvas
        ref={graphRef}
        nodes={nodes}
        edges={edges}
        selections={selections}
        actives={actives}
        onNodePointerOver={onNodePointerOver}
        onNodePointerOut={onNodePointerOut}
        onCanvasClick={onCanvasClick}
        onNodeClick={(node) => {
          onNodeClick(node);
          onSelectNode(node);
        }}
        cameraMode="pan"
      />
    </div>
  );
}
