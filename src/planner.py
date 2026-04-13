import numpy as np
import heapq

class AStarPlanner:
    def __init__(self, grid_size):
        self.grid_size = grid_size

    def heuristic(self, a, b):
        return np.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2)

    def get_path(self, start, goal, obstacles):
        neighbors = [(0, 1), (0, -1), (1, 0), (-1, 0), (1, 1), (1, -1), (-1, 1), (-1, -1)]
        
        close_set = set()
        came_from = {}
        gscore = {start: 0}
        fscore = {start: self.heuristic(start, goal)}
        oheap = []

        heapq.heappush(oheap, (fscore[start], start))
        
        while oheap:
            current = heapq.heappop(oheap)[1]

            if current == goal:
                data = []
                while current in came_from:
                    data.append(current)
                    current = came_from[current]
                return data[::-1]

            close_set.add(current)
            for i, j in neighbors:
                neighbor = current[0] + i, current[1] + j
                tentative_g_score = gscore[current] + self.heuristic(current, neighbor)
                
                if 0 <= neighbor[0] < self.grid_size[0] and 0 <= neighbor[1] < self.grid_size[1]:
                    if neighbor in obstacles:
                        continue
                else:
                    # array bound check
                    continue
                
                if neighbor in close_set and tentative_g_score >= gscore.get(neighbor, 0):
                    continue
                    
                if tentative_g_score < gscore.get(neighbor, 0) or neighbor not in [i[1] for i in oheap]:
                    came_from[neighbor] = current
                    gscore[neighbor] = tentative_g_score
                    fscore[neighbor] = tentative_g_score + self.heuristic(neighbor, goal)
                    heapq.heappush(oheap, (fscore[neighbor], neighbor))
                    
        return []
