import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import MetricCard from "../components/metric-card";
import TimeTracker from "../components/time-tracker";
import { DailyTimeChart, DonutChart, ProjectChart } from "../components/charts";
import { MoreHorizontal, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface User {
  id: string;
  email: string;
  name: string;
  username: string;
}

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setLocation("/");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [setLocation]);

  const { data: dashboardData, isLoading: metricsLoading } = useQuery({
    queryKey: ["/api/v1/dashboard", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      if (!user) return null;
      const response = await fetch(`http://127.0.0.1:8001/api/v1/dashboard/${user.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      return response.json();
    },
  });

  // Provide default values for metrics to avoid type errors
  const safeMetrics = dashboardData || {
    weekly_work_duration: 0,
    weekly_earnings: 0,
    projects: [],
  };

  const projects = safeMetrics.projects;

  if (!user) return null;

  const formatTime = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    const s = Math.floor(((hours - h) * 60 - m) * 60);
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--dashboard-bg)' }}>
      {/* Top Navigation */}
      <nav className="bg-card border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-xl font-semibold" style={{ color: 'var(--primary)' }}>
              Welcome Back! {user.name.split(' ')[0]}
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              An overview of recent time tracking data.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2 px-4 py-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{format(selectedDate, "MMM dd, yyyy")}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedDate(date);
                      setIsCalendarOpen(false);
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <div className="text-right">
              <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {user.name}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {user.email}
              </div>
            </div>
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--secondary)' }}
            >
              <span className="text-white font-medium text-sm">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Metrics Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Worked This Week"
            value={metricsLoading ? "Loading..." : formatTime(safeMetrics.weekly_work_duration / 3600)}
            change={0}
            trend="up"
            chartData={[20, 25, 30, 28, 35, 32, 40]}
          />
          <MetricCard
            title="Earned This Week"
            value={metricsLoading ? "Loading..." : formatCurrency(safeMetrics.weekly_earnings)}
            change={0}
            trend="down"
            chartData={[40, 35, 38, 45, 42, 40, 38]}
          />
          <MetricCard
            title="Project Worked"
            value={metricsLoading ? "Loading..." : projects.length.toString()}
            change={0}
            trend="up"
            chartData={[15, 20, 18, 25, 30, 28, 35]}
          />
          <MetricCard
            title="Today's Activity"
            value={metricsLoading ? "Loading..." : "0%"}
            change={0}
            trend="down"
            chartData={[80, 75, 82, 78, 85, 80, 79]}
          />
        </div>

        {/* Main Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Monthly Chart */}
          <div className="lg:col-span-2 bg-card rounded-2xl p-6 shadow-sm border border-gray-50">
            <div className="mb-6">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Today's Activity
              </h3>
            </div>
            
            <div className="mb-6">
              <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Worked Time</div>
              <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                5:16 <span className="text-green-500 text-sm font-normal">+14%</span>
              </div>
            </div>
            
            <div className="h-64">
              <DailyTimeChart selectedDate={selectedDate} />
            </div>
          </div>

          {/* Monthly Total Donut */}
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-gray-50">
            <div className="mb-6">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Monthly Total
              </h3>
            </div>
            
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-40 h-40">
                <DonutChart />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>Total</div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    140.20<span className="text-sm">m</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--secondary)' }}></div>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Web App</span>
                </div>
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>60%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--warning)' }}></div>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Responsive</span>
                </div>
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>25%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Mobile App</span>
                </div>
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>15%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TimeTracker />
          
          {/* Top Projects */}
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-gray-50">
            <div className="mb-6">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Top Projects
              </h3>
            </div>
            
            <div className="h-64 mb-4">
              <ProjectChart />
            </div>
            
            <div className="flex items-center justify-between text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
              <span>This Week</span>
              <span>08.04.2023</span>
            </div>
            
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--secondary)' }}></div>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>HR Project Management</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>AI Learning Management</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
