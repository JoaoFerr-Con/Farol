// Limiares de estágio da Árvore da Saúde Mental (Seção 5.3 da doc técnica)
export interface TreeStage {
  label: string;
  icon: string;
  min: number;
  next: number | null;
}

export const TREE_STAGES: TreeStage[] = [
  { label: 'Plantio', icon: '🌱', min: 0, next: 20 },
  { label: 'Muda', icon: '🌿', min: 20, next: 45 },
  { label: 'Árvore jovem', icon: '🌳', min: 45, next: 75 },
  { label: 'Árvore frondosa', icon: '🌲', min: 75, next: 110 },
  { label: 'Árvore florida e com frutos', icon: '🌸', min: 110, next: null }
];

export function getTreeStage(gotas: number): TreeStage {
  let stage = TREE_STAGES[0];
  for (const s of TREE_STAGES) {
    if (gotas >= s.min) stage = s;
  }
  return stage;
}
