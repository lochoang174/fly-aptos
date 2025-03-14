import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { GraphCanvas, GraphCanvasRef, GraphNode, useSelection } from "reagraph";

// Basic node interface that all node types extend from
interface BaseNode extends GraphNode {
  id: string;
  type: string;
  content?: string;
  url?: string;
  color?: string;
}

// Edge interface
interface EdgeType {
  id: string;
  source: string;
  target: string;
  label?: string;
}

// API response interface
interface ResponseType {
  nodes: BaseNode[];
  edges: EdgeType[];
}

export default function GraphPage() {
  const [selectedNode, setSelectedNode] = useState<BaseNode | null>(null);
  const [nodes, setNodes] = useState<BaseNode[]>([]);
  const [edges, setEdges] = useState<EdgeType[]>([]);
  const [loading, setLoading] = useState(false);
  const graphRef = useRef<GraphCanvasRef | null>(null);
  const {
    selections,
    actives,
    onNodeClick,
    onCanvasClick,
    onNodePointerOver,
    onNodePointerOut,
  } = useSelection({
    ref: graphRef,
    nodes: nodes,
    edges: edges,
    pathSelectionType: 'in',
    pathHoverType: 'in'

  });
  useEffect(() => {
    console.log("Selected Node:", edges);
    nodes.map((e) => {
      if (e.type === "keyword") {
        console.log(e);
      }
    });
  }, [nodes]);

  useEffect(() => {
    console.log("Fetching data...");
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const url = `${import.meta.env.VITE_API_SERVER_URL}/data`;
      const response = await axios.get(url);
      if (!response.data) return;

      const res: ResponseType = response.data;
      console.log(res.nodes);

      // Process nodes and add colors based on type
      const processedNodes = res.nodes.map((node) => ({
        ...node,
        label: node.id,
        // Set different colors for keyword and post nodes
        fill: node.type === "keyword" ? "#FF6B6B" : "#4ECDC4",
        activeFill: "#1DE9AC",
        opacity: 1,
        selectedOpacity: 1,
        inactiveOpacity: 0.2,
        // You can also use different colors like:
        // color: node.type === "keyword" ? "#FFD700" : "#4ECDC4", // Gold for keywords
        // or
        // color: node.type === "keyword" ? "#9370DB" : "#4ECDC4", // Purple for keywords
      }));
      const fetchEdge: EdgeType[] = res.edges.map((item) => {
        return {
          ...item,
          id: `{ ${item.source}-${item.target}}`,
          activeFill: "#1DE9AC",
          opacity: 1,
          selectedOpacity: 1,
          inactiveOpacity: 0.1,
        };
      });
      setNodes(processedNodes);
      setEdges(fetchEdge);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNodeClick = (node: BaseNode) => {
    setSelectedNode(node);
  };

  return (
    <div className="flex w-full h-[600px] gap-4">
      {/* Graph Column */}
      <div className="flex-1 border rounded-lg shadow-sm relative">
        {loading ? (
          <span>Loading...</span>
        ) : (
          // <GraphCanvas
          //   nodes={nodes}
          //   edges={edges}

          //   onNodeClick={handleNodeClick}
          //   labelType="all"
          //   draggable={true}

          //   // renderNode={({ node, color, size, opacity }) => (
          //   //   <group>
          //   //     <mesh>
          //   //       <torusKnotGeometry attach="geometry" args={[size, 1.25, 50, 8]} />
          //   //       <meshBasicMaterial
          //   //         attach="material"
          //   //         color={node.type === "keyword" ? "#FF6B6B" : "#4ECDC4"}
          //   //         opacity={opacity}
          //   //         transparent
          //   //       />
          //   //     </mesh>
          //   //   </group>
          //   // )}
          // />
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
              onNodeClick(node); // Gọi sự kiện từ `useSelection`
              handleNodeClick(node); // Cập nhật state của `selectedNode`
            }}            
            cameraMode="pan"
          />
        )}
      </div>

      {/* Information Column */}
      <div className="flex-1 border rounded-lg shadow-sm p-4 z-10 overflow-y-scroll">
        {selectedNode ? (
          <div>
            <h2 className="text-xl font-bold mb-4">
              {selectedNode.type === "keyword" ? (
                <div className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "#FF6B6B" }}
                  />
                  Keyword: {selectedNode.id}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: "#4ECDC4" }}
                  />
                  Post: {selectedNode.id}
                </div>
              )}
            </h2>

            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              {selectedNode.type === "keyword" ? (
                <>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Related Posts
                  </h3>
                  <div className="space-y-2">
                    {edges
                      .filter(
                        (edge) =>
                          edge.source === selectedNode.id ||
                          edge.target === selectedNode.id
                      )
                      .map((edge) => {
                        const relatedPost = nodes.find(
                          (node) =>
                            node.type === "post" &&
                            (node.id === edge.source || node.id === edge.target)
                        );
                        if (!relatedPost) return null;

                        return (
                          <div
                            key={relatedPost.id}
                            className="p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-sm font-medium text-gray-500">
                                {relatedPost.id}
                              </span>
                            </div>
                            <p className="text-gray-700">
                              {relatedPost.content}
                            </p>
                            <span>
                            Url: <a href={relatedPost.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">{relatedPost.url}</a>

                            </span>
                          </div>
                        );
                      })}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Post Content
                  </h3>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedNode.content}
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-3">
                    Related Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {edges
                      .filter(
                        (edge) =>
                          edge.source === selectedNode.id ||
                          edge.target === selectedNode.id
                      )
                      .map((edge) => {
                        const keyword = nodes.find(
                          (node) =>
                            node.type === "keyword" &&
                            (node.id === edge.source || node.id === edge.target)
                        );
                        if (!keyword) return null;

                        return (
                          <span
                            key={keyword.id}
                            className="px-3 py-1 rounded-full text-sm text-white"
                            style={{ backgroundColor: "#FF6B6B" }}
                          >
                            {keyword.id}
                          </span>
                        );
                      })}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p className="text-lg">No node selected</p>
            <p className="text-sm mt-2">Click on a node to view its details</p>
          </div>
        )}
      </div>
    </div>
  );
}
