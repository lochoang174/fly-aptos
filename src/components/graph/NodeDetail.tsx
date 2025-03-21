import React from "react";
import { BaseNode, EdgeType } from "../types";

interface NodeDetailsProps {
  selectedNode: BaseNode | null;
  edges: EdgeType[];
  nodes: BaseNode[];
}

export default function NodeDetails({ selectedNode, edges, nodes }: NodeDetailsProps) {
  if (!selectedNode) {
    return (
      <div className="text-center text-gray-500">
        <p className="text-lg">No node selected</p>
        <p className="text-sm mt-2">Click on a node to view its details</p>
      </div>
    );
  }

  return (
    <div className="flex-1 border rounded-lg shadow-sm p-4 overflow-y-scroll">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: selectedNode.type === "keyword" ? "#FF6B6B" : "#4ECDC4" }}
        />
        {selectedNode.type === "keyword" ? `Keyword: ${selectedNode.id}` : `Post: ${selectedNode.id}`}
      </h2>

      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        {selectedNode.type === "keyword" ? (
          <>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Related Posts</h3>
            <div className="space-y-2">
              {edges
                .filter((edge) => edge.source === selectedNode.id || edge.target === selectedNode.id)
                .map((edge) => {
                  const relatedPost = nodes.find(
                    (node) => node.type === "post" && (node.id === edge.source || node.id === edge.target)
                  );
                  if (!relatedPost) return null;

                  return (
                    <div key={relatedPost.id} className="p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-500">{relatedPost.id}</span>
                      <p className="text-gray-700">{relatedPost.content}</p>
                      {relatedPost.url && (
                        <a href={relatedPost.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                          {relatedPost.url}
                        </a>
                      )}
                    </div>
                  );
                })}
            </div>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Post Content</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{selectedNode.content}</p>

            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-3">Related Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {edges
                .filter((edge) => edge.source === selectedNode.id || edge.target === selectedNode.id)
                .map((edge) => {
                  const keyword = nodes.find(
                    (node) => node.type === "keyword" && (node.id === edge.source || node.id === edge.target)
                  );
                  if (!keyword) return null;

                  return (
                    <span key={keyword.id} className="px-3 py-1 rounded-full text-sm text-white" style={{ backgroundColor: "#FF6B6B" }}>
                      {keyword.id}
                    </span>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
