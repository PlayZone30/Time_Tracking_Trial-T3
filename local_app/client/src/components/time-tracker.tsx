import { useState, useEffect, useRef } from "react";
import { Play, Clock, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";

export default function TimeTracker() {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [isTracking, setIsTracking] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [startTime, setStartTime] = useState<number | null>(null);
  
  // Use a ref to hold the latest startTime value for our event listener
  const startTimeRef = useRef(startTime);
  startTimeRef.current = startTime;

  const { data: projects = [] } = useQuery({
    queryKey: ["/api/v1/project"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:8001/api/v1/project");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      return response.json();
    },
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ["/api/v1/task"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:8001/api/v1/task");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      return response.json();
    },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        const elapsed = Date.now() - (startTime || Date.now());
        const hours = Math.floor(elapsed / 3600000);
        const minutes = Math.floor((elapsed % 3600000) / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        setCurrentTime(
          `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
          )}:${String(seconds).padStart(2, "0")}`
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, startTime]);

  // FIX: This useEffect now runs only once on component mount
  useEffect(() => {
    const handleAppUsage = (appUsage: any) => {
      // Pass the startTime from the ref, which is always up-to-date
      sendActivityData(appUsage, startTimeRef.current);
    };

    const handleSystemSleep = () => {
      // We can directly check the isTracking state here if needed,
      // but modifying it should be done carefully.
      // For now, we assume the main process handles the timer state correctly
      // and only sends app-usage when tracking stops.
      if (isTracking) {
        setIsTracking(false);
      }
    };

    const handleSystemWake = () => {
      if (startTimeRef.current) {
        setIsTracking(true);
      }
    };

    window.electron.ipcRenderer.on('app-usage', handleAppUsage);
    window.electron.ipcRenderer.on('system-sleep', handleSystemSleep);
    window.electron.ipcRenderer.on('system-wake', handleSystemWake);

    const handleScreenshotTaken = (screenshot: { path: string, timestamp: number }) => {
      sendScreenshotData(screenshot);
    };

    window.electron.ipcRenderer.on('screenshot-taken', handleScreenshotTaken);

    return () => {
      window.electron.ipcRenderer.removeListener('app-usage', handleAppUsage);
      window.electron.ipcRenderer.removeListener('system-sleep', handleSystemSleep);
      window.electron.ipcRenderer.removeListener('system-wake', handleSystemWake);
      window.electron.ipcRenderer.removeListener('screenshot-taken', handleScreenshotTaken);
    };
  }, []); // <-- Empty dependency array ensures this runs only once

  // FIX: Modified to accept startTime from the event handler
  const sendActivityData = async (appUsage: any, currentStartTime: number | null) => {
    const today = new Date().toISOString().split("T")[0];
    const app_usage_list = Object.entries(appUsage).map(([appName, duration]) => ({
      app_name: appName,
      duration: Math.round(duration as number),
    }));

    const token = localStorage.getItem("token");
    if (!token) return;

    const total_duration = app_usage_list.reduce((total, item) => total + item.duration, 0);

    const data = {
      date: today,
      total_duration: total_duration,
      productive_time: 0, // Placeholder
      unproductive_time: 0, // Placeholder
      app_usage: app_usage_list,
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8001/api/v1/activity?employee_id=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to send activity data");
      }
    } catch (error) {
      console.error("Error sending activity data:", error);
    }
  };

  const sendScreenshotData = async (screenshot: { path: string, timestamp: number }) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const data = {
      employee_id: token,
      timestamp: screenshot.timestamp,
      file_path: screenshot.path,
      permissions: "read", // Placeholder
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8001/api/v1/analytics/screenshot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to send screenshot data");
      }
    } catch (error) {
      console.error("Error sending screenshot data:", error);
    }
  };

  const handleToggleTracking = () => {
    if (isTracking) {
      setIsTracking(false);
      window.electron.ipcRenderer.send('stop-tracking');
    } else {
      const now = Date.now();
      setStartTime(now);
      setIsTracking(true);
      window.electron.ipcRenderer.send('start-tracking');
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-gray-50">
      <div className="mb-6">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          Time Tracker
        </h3>
      </div>
      
      {/* Current Project */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="flex-1 mr-2 border-0 bg-transparent">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-6 h-6 rounded flex items-center justify-center"
                  style={{ backgroundColor: 'var(--secondary)' }}
                >
                  <span className="text-white text-xs font-medium">P</span>
                </div>
                <SelectValue placeholder="Select project" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {projects.map((project: any) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

        </div>
        
        <div className="text-center mb-4">
          <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
            {isTracking ? "Running" : "Awaiting"}
          </div>
          <div className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {currentTime}
          </div>
        </div>
        
        <Button
          onClick={handleToggleTracking}
          className="w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          style={{ 
            backgroundColor: 'var(--secondary)', 
            color: 'white',
          }}
        >
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span>{isTracking ? "Stop" : "Start"} Time Tracker</span>
        </Button>
      </div>
      
      {/* Previous Tasks */}
      <div>
        <div className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
          Previous Tasks
        </div>
        <div className="space-y-3">
          {tasks.map((task: any) => (
            <div key={task.id} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center"
                  style={{ backgroundColor: 'var(--secondary)' }}
                >
                  <span className="text-white text-xs font-medium">{task.name.substring(0, 2)}</span>
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {task.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}