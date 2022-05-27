import { NodeTreeNode } from "./useNodeTree";

export default function useActiveNode() {
  return useState<NodeTreeNode>('active-node');
}
