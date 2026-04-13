import cv2
import numpy as np

class PerceptionModule:
    def __init__(self):
        pass

    def process_frame(self, frame):
        # Convert to grayscale
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        # Thresholding to find obstacles (assuming dark objects are obstacles)
        _, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)
        
        # Find contours
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        obstacles = []
        for cnt in contours:
            M = cv2.moments(cnt)
            if M["m00"] != 0:
                cX = int(M["m10"] / M["m00"])
                cY = int(M["m01"] / M["m00"])
                obstacles.append((cX, cY))
        
        return obstacles, thresh
