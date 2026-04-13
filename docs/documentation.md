# Documentation: AI-Based Autonomous Navigation System

## 1. Project Architecture
The system follows a standard robotics pipeline:
- **Input**: User clicks to define obstacles and goals.
- **Perception**: The `PerceptionModule` (simulated) identifies obstacles in the grid.
- **Planning**: The `AStarPlanner` calculates the shortest path from the robot's current position to the goal.
- **Control**: The `Simulation` loop updates the robot's position based on the planned path.

## 2. Modules
- `main.py`: Entry point, handles the Pygame loop and visualization.
- `src/planner.py`: Implements the A* search algorithm.
- `src/perception.py`: Placeholder for OpenCV-based image processing (can be extended with real camera input).

## 3. Industry Relevance
This project mirrors systems used in:
- **Warehouse Robots**: Navigating through dynamic environments (e.g., Amazon Robotics).
- **Self-Driving Cars**: Path planning and obstacle avoidance.
- **Drones**: Autonomous flight in complex spaces.
