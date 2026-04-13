export interface Point {
  x: number;
  y: number;
}

export interface Node extends Point {
  g: number;
  h: number;
  f: number;
  parent: Node | null;
}

export function aStar(
  start: Point,
  goal: Point,
  grid: number[][],
  rows: number,
  cols: number
): Point[] {
  const openList: Node[] = [];
  const closedList: Set<string> = new Set();

  const startNode: Node = { ...start, g: 0, h: 0, f: 0, parent: null };
  openList.push(startNode);

  const getH = (p1: Point, p2: Point) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);

  while (openList.length > 0) {
    // Get node with lowest f
    let lowIdx = 0;
    for (let i = 0; i < openList.length; i++) {
      if (openList[i].f < openList[lowIdx].f) lowIdx = i;
    }
    const currentNode = openList[lowIdx];

    // Check if goal reached
    if (currentNode.x === goal.x && currentNode.y === goal.y) {
      let curr: Node | null = currentNode;
      const path: Point[] = [];
      while (curr) {
        path.push({ x: curr.x, y: curr.y });
        curr = curr.parent;
      }
      return path.reverse();
    }

    // Move from open to closed
    openList.splice(lowIdx, 1);
    closedList.add(`${currentNode.x},${currentNode.y}`);

    // Neighbors
    const neighbors = [
      { x: 0, y: -1 }, { x: 0, y: 1 },
      { x: -1, y: 0 }, { x: 1, y: 0 }
    ];

    for (const rel of neighbors) {
      const nx = currentNode.x + rel.x;
      const ny = currentNode.y + rel.y;

      if (nx < 0 || nx >= cols || ny < 0 || ny >= rows || grid[ny][nx] === 1) continue;
      if (closedList.has(`${nx},${ny}`)) continue;

      const gScore = currentNode.g + 1;
      let gScoreIsBest = false;

      let neighborNode = openList.find(n => n.x === nx && n.y === ny);

      if (!neighborNode) {
        gScoreIsBest = true;
        neighborNode = { x: nx, y: ny, g: gScore, h: getH({ x: nx, y: ny }, goal), f: 0, parent: currentNode };
        neighborNode.f = neighborNode.g + neighborNode.h;
        openList.push(neighborNode);
      } else if (gScore < neighborNode.g) {
        gScoreIsBest = true;
      }

      if (gScoreIsBest) {
        neighborNode!.parent = currentNode;
        neighborNode!.g = gScore;
        neighborNode!.f = neighborNode!.g + neighborNode!.h;
      }
    }
  }

  return [];
}
