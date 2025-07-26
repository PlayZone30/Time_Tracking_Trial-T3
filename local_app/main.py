import tkinter as tk
from tkinter import ttk
import time
import pyautogui
import os
import socket
import uuid
import psutil
from collections import defaultdict
import caffeine
import requests
import json
from datetime import date
import pygetwindow as gw


class TimeTrackerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("T3 - Time Tracker")

        self.logged_in = False
        self.tracking = False
        self.start_time = None
        self.app_usage = defaultdict(float)
        self.last_app = None
        self.last_app_start_time = None

        self.create_login_widgets()

    def create_login_widgets(self):
        self.login_frame = ttk.Frame(self.root, padding="10")
        self.login_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))

        ttk.Label(self.login_frame, text="Email:").grid(row=0, column=0, sticky=tk.W)
        self.email_entry = ttk.Entry(self.login_frame)
        self.email_entry.grid(row=0, column=1, sticky=(tk.W, tk.E))

        ttk.Label(self.login_frame, text="Password:").grid(row=1, column=0, sticky=tk.W)
        self.password_entry = ttk.Entry(self.login_frame, show="*")
        self.password_entry.grid(row=1, column=1, sticky=(tk.W, tk.E))

        self.login_button = ttk.Button(
            self.login_frame, text="Login", command=self.login
        )
        self.login_button.grid(row=2, column=1, sticky=tk.E)

    def create_tracker_widgets(self):
        self.tracker_frame = ttk.Frame(self.root, padding="10")
        self.tracker_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))

        ttk.Label(self.tracker_frame, text="Project/Task:").grid(
            row=0, column=0, sticky=tk.W
        )
        self.task_combobox = ttk.Combobox(
            self.tracker_frame, values=["Project A - Task 1", "Project B - Task 2"]
        )
        self.task_combobox.grid(row=0, column=1, sticky=(tk.W, tk.E))
        self.task_combobox.current(0)

        self.timer_label = ttk.Label(self.tracker_frame, text="00:00:00")
        self.timer_label.grid(row=1, column=0, columnspan=2)

        self.start_stop_button = ttk.Button(
            self.tracker_frame, text="Start", command=self.toggle_tracking
        )
        self.start_stop_button.grid(row=2, column=0, columnspan=2)

    def login(self):
        email = self.email_entry.get()
        password = self.password_entry.get()

        print(f"Attempting to log in with email: {email} and password: {password}")
        try:
            response = requests.post(
                "http://127.0.0.1:8001/api/v1/login",
                data={"username": email, "password": password},
            )
            if response.status_code == 200:
                self.employee_id = response.json()["access_token"]
                self.login_frame.destroy()
                self.create_tracker_widgets()
            else:
                # In a real app, you'd show an error message
                print("Login failed")
        except Exception as e:
            print(f"Error during login: {e}")

    def toggle_tracking(self):
        if self.tracking:
            self.tracking = False
            caffeine.off()
            self.start_stop_button.config(text="Start")
            self.send_activity_data()
        else:
            self.tracking = True
            self.start_stop_button.config(text="Stop")
            self.start_time = time.time()
            caffeine.on(display=False)
            self.update_timer()
            self.capture_screenshot()
            self.collect_background_info()
            self.track_app_usage()

    def update_timer(self):
        if self.tracking:
            elapsed_time = time.time() - self.start_time
            hours, rem = divmod(elapsed_time, 3600)
            minutes, seconds = divmod(rem, 60)
            self.timer_label.config(
                text="{:0>2}:{:0>2}:{:05.2f}".format(
                    int(hours), int(minutes), seconds
                )
            )
            self.root.after(10, self.update_timer)

    def capture_screenshot(self):
        if self.tracking:
            timestamp = int(time.time())
            file_path = os.path.join("local_app", "screenshots", f"screenshot_{timestamp}.png")
            pyautogui.screenshot(file_path)
            self.root.after(600000, self.capture_screenshot)

    def collect_background_info(self):
        hostname = socket.gethostname()
        ip_address = socket.gethostbyname(hostname)
        mac_address = ":".join(
            ["{:02x}".format((uuid.getnode() >> i) & 0xFF) for i in range(0, 8 * 6, 8)][::-1]
        )
        print(f"IP Address: {ip_address}")
        print(f"MAC Address: {mac_address}")

    def get_active_window_process_name(self):
        try:
            active_window = gw.getActiveWindow()
            if active_window:
                try:
                    p = psutil.Process(active_window._hWnd)
                    return p.name()
                except psutil.NoSuchProcess:
                    return active_window.title
        except Exception as e:
            print(f"Error getting active window: {e}")
        return None

    def track_app_usage(self):
        if self.tracking:
            current_app = self.get_active_window_process_name()

            if self.last_app:
                elapsed = time.time() - self.last_app_start_time
                self.app_usage[self.last_app] += elapsed

            self.last_app = current_app
            self.last_app_start_time = time.time()

            # Print current app usage for debugging
            print(self.app_usage)

            self.root.after(1000, self.track_app_usage)


    def send_activity_data(self):
        today = date.today().isoformat()
        app_usage_list = [
            {"app_name": app, "duration": int(duration)}
            for app, duration in self.app_usage.items()
        ]

        # In a real app, you'd get the employee_id after login
        data = {
            "date": today,
            "employee_id": self.employee_id,
            "total_duration": int(time.time() - self.start_time),
            "productive_time": 0,  # Placeholder
            "unproductive_time": 0,  # Placeholder
            "app_usage": app_usage_list,
        }

        try:
            response = requests.post(
                "http://127.0.0.1:8001/api/v1/activity",
                data=json.dumps(data),
                headers={"Content-Type": "application/json"},
            )
            if response.status_code == 200:
                print("Activity data sent successfully.")
            else:
                print(f"Failed to send activity data: {response.text}")
        except Exception as e:
            print(f"Error sending activity data: {e}")

        # Reset app usage for the next session
        self.app_usage = defaultdict(float)


if __name__ == "__main__":
    root = tk.Tk()
    app = TimeTrackerApp(root)
    root.mainloop()