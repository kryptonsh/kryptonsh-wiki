type NodeTreeNode = { _path: string; active: boolean; children: NodeTreeNode[] };

export default function useActiveNode() {
  return useState<NodeTreeNode>('active-node');
}
