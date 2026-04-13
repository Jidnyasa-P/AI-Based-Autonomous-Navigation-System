import pygame
import sys
import numpy as np
from src.planner import AStarPlanner
from src.perception import PerceptionModule

# Constants
WIDTH, HEIGHT = 800, 600
GRID_SIZE = 20
ROWS, COLS = HEIGHT // GRID_SIZE, WIDTH // GRID_SIZE
FPS = 30

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
GRAY = (200, 200, 200)

class Simulation:
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode((WIDTH, HEIGHT))
        pygame.display.set_caption("AI-Based Autonomous Navigation System")
        self.clock = pygame.time.Clock()
        
        self.planner = AStarPlanner((COLS, ROWS))
        self.perception = PerceptionModule()
        
        self.robot_pos = (2, 2)
        self.goal_pos = (COLS - 3, ROWS - 3)
        self.obstacles = set()
        self.path = []
        
        # Add some initial obstacles
        for i in range(10, 15):
            self.obstacles.add((i, 10))
            self.obstacles.add((15, i))

    def draw_grid(self):
        for x in range(0, WIDTH, GRID_SIZE):
            pygame.draw.line(self.screen, GRAY, (x, 0), (x, HEIGHT))
        for y in range(0, HEIGHT, GRID_SIZE):
            pygame.draw.line(self.screen, GRAY, (0, y), (WIDTH, y))

    def run(self):
        running = True
        while running:
            self.screen.fill(WHITE)
            self.draw_grid()
            
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                
                if event.type == pygame.MOUSEBUTTONDOWN:
                    x, y = pygame.mouse.get_pos()
                    grid_x, grid_y = x // GRID_SIZE, y // GRID_SIZE
                    if event.button == 1: # Left click to add obstacle
                        self.obstacles.add((grid_x, grid_y))
                    elif event.button == 3: # Right click to set goal
                        self.goal_pos = (grid_x, grid_y)
            
            # Perception (Simulated)
            # In a real system, we'd use OpenCV on a camera frame.
            # Here we just use the obstacles set.
            
            # Path Planning
            self.path = self.planner.get_path(self.robot_pos, self.goal_pos, self.obstacles)
            
            # Navigation (Move robot along path)
            if self.path:
                self.robot_pos = self.path[0]
                # In a real sim, we'd move smoothly, but for grid-based we jump
            
            # Drawing
            for obs in self.obstacles:
                pygame.draw.rect(self.screen, BLACK, (obs[0]*GRID_SIZE, obs[1]*GRID_SIZE, GRID_SIZE, GRID_SIZE))
            
            for p in self.path:
                pygame.draw.rect(self.screen, BLUE, (p[0]*GRID_SIZE, p[1]*GRID_SIZE, GRID_SIZE, GRID_SIZE), 2)
                
            pygame.draw.rect(self.screen, GREEN, (self.goal_pos[0]*GRID_SIZE, self.goal_pos[1]*GRID_SIZE, GRID_SIZE, GRID_SIZE))
            pygame.draw.circle(self.screen, RED, (self.robot_pos[0]*GRID_SIZE + GRID_SIZE//2, self.robot_pos[1]*GRID_SIZE + GRID_SIZE//2), GRID_SIZE//3)
            
            pygame.display.flip()
            self.clock.tick(10) # Slow down for visibility

        pygame.quit()
        sys.exit()

if __name__ == "__main__":
    sim = Simulation()
    sim.run()
