import pygetwindow as gw

try:
    active_window = gw.getActiveWindow()
    if active_window:
        print(active_window.title())
except Exception as e:
    print(f"Error: {e}")