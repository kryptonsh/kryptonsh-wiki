export type NodeTreeNode = {
  _path: string;
  title: string;
  navTitle?: string;
  active: boolean;
  children?: NodeTreeNode[];
};

export default function useNodeTree() {
  return useState<NodeTreeNode[]>('node-tree');
}
