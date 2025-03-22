import { ResponseType, BaseNode, EdgeType } from "../../types/NodeType";
import GraphViewer from "../../components/graph/GraphViewer";
import NodeDetails from "../../components/graph/NodeDetail";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function GraphPage() {
  const [selectedNode, setSelectedNode] = useState<BaseNode | null>(null);
  const [nodes, setNodes] = useState<BaseNode[]>([]);
  const [edges, setEdges] = useState<EdgeType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_API_SERVER_URL}/data`;
      const response = await axios.get(url);
      if (!response.data) return;

      const res: ResponseType = response.data;

      const processedNodes = res.nodes.map((node) => ({
        ...node,
        label: node.id,
        fill: node.type === "keyword" ? "#FF6B6B" : "#4ECDC4",
      }));

      const processedEdges: EdgeType[] = res.edges.map((edge) => ({
        ...edge,
        id: `${edge.source}-${edge.target}`,
      }));

      setNodes(processedNodes);
      setEdges(processedEdges);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-[600px] gap-4">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 z-10 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-medium text-gray-700">
              Loading graph data...
            </p>
          </div>
        </div>
      )}

      <GraphViewer nodes={nodes} edges={edges} onSelectNode={setSelectedNode} />
      <NodeDetails selectedNode={selectedNode} edges={edges} nodes={nodes} />
    </div>
  );
}
