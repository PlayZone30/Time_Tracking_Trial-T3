import tkinter as tk
from tkinter import ttk
import time
import pyautogui
import os
import socket
import uuid


class TimeTrackerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("T3 - Time Tracker")

        self.logged_in = False
        self.tracking = False
        self.start_time = None

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
        # In a real application, this would make an API call to authenticate the user.
        # For now, we'll just switch to the tracker view.
        self.login_frame.destroy()
        self.create_tracker_widgets()

    def toggle_tracking(self):
        if self.tracking:
            self.tracking = False
            self.start_stop_button.config(text="Start")
        else:
            self.tracking = True
            self.start_stop_button.config(text="Stop")
            self.start_time = time.time()
            self.update_timer()
            self.capture_screenshot()
            self.collect_background_info()

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


if __name__ == "__main__":
    root = tk.Tk()
    app = TimeTrackerApp(root)
    root.mainloop()