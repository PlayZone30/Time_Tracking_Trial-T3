import { useEffect, useRef, useState } from "react";

// Daily activity chart showing work periods with gaps (9am-11am, gap 11am-1pm, 1pm-9pm)
export function DailyTimeChart({ selectedDate }: { selectedDate?: Date }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [hoveredTime, setHoveredTime] = useState<string>('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight - 40;
    const leftPadding = 40;
    const rightPadding = 20;
    const chartWidth = width - leftPadding - rightPadding;
    const topPadding = 20;

    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    // Time periods: 9am to 9pm (12 hours)
    const timeLabels = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'];
    
    // Work periods with gaps: 9am-11am (work), 11am-1pm (gap), 1pm-9pm (work)
    const workPeriods = [
      { start: 0, end: 2, intensity: [1.5, 2.2] }, // 9am-11am
      { start: 4, end: 12, intensity: [2.8, 3.2, 3.8, 4.1, 4.3, 4.0, 3.8, 3.5, 3.2] } // 1pm-9pm
    ];

    const maxValue = 5.0;

    // Draw horizontal grid lines
    ctx.strokeStyle = '#F1F5F9';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = topPadding + (height * i) / 5;
      ctx.beginPath();
      ctx.moveTo(leftPadding, y);
      ctx.lineTo(leftPadding + chartWidth, y);
      ctx.stroke();
    }

    // Draw Y-axis labels (selected date and day)
    const currentDate = selectedDate || new Date();
    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
    const dateStr = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    ctx.fillStyle = '#64748B';
    ctx.font = '12px Inter';
    ctx.textAlign = 'right';
    ctx.fillText(`${dayName}`, leftPadding - 10, topPadding + 10);
    ctx.fillText(`${dateStr}`, leftPadding - 10, topPadding + 25);

    // Draw work periods with filled areas and lines
    workPeriods.forEach((period) => {
      const startX = leftPadding + (period.start / 12) * chartWidth;
      const endX = leftPadding + (period.end / 12) * chartWidth;
      const segmentWidth = (endX - startX) / period.intensity.length;

      // Create gradient for fill
      const gradient = ctx.createLinearGradient(0, topPadding, 0, topPadding + height);
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0.05)');

      // Draw line path
      ctx.beginPath();
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 3;

      period.intensity.forEach((intensity, index) => {
        const x = startX + (index * segmentWidth);
        const y = topPadding + height - ((intensity / maxValue) * height);
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Fill area under the curve
      ctx.beginPath();
      ctx.fillStyle = gradient;
      
      period.intensity.forEach((intensity, index) => {
        const x = startX + (index * segmentWidth);
        const y = topPadding + height - ((intensity / maxValue) * height);
        
        if (index === 0) {
          ctx.moveTo(x, topPadding + height);
          ctx.lineTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.lineTo(startX + ((period.intensity.length - 1) * segmentWidth), topPadding + height);
      ctx.closePath();
      ctx.fill();

      // Draw vertical lines for time markers
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
      ctx.lineWidth = 1;
      period.intensity.forEach((intensity, index) => {
        const x = startX + (index * segmentWidth);
        const y = topPadding + height - ((intensity / maxValue) * height);
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, topPadding + height);
        ctx.stroke();
      });
    });

    // Draw current time indicator if hovering
    if (showTooltip && mousePos.x >= leftPadding && mousePos.x <= leftPadding + chartWidth) {
      const relativeX = mousePos.x - leftPadding;
      const currentTimeX = mousePos.x; // Use exact mouse position for smooth movement
      
      // Calculate the Y position on the line based on mouse X position
      let lineY = mousePos.y;
      
      // Find which work period we're in and calculate the line intersection
      const timeRatio = relativeX / chartWidth;
      const timeIndex = timeRatio * 12; // 0-12 for 9am to 9pm
      
      if (timeIndex >= 0 && timeIndex <= 2) {
        // Morning period (9am-11am)
        const periodRatio = timeIndex / 2;
        const startIntensity = 1.5;
        const endIntensity = 2.2;
        const intensity = startIntensity + (endIntensity - startIntensity) * periodRatio;
        lineY = topPadding + height - ((intensity / maxValue) * height);
      } else if (timeIndex > 2 && timeIndex < 4) {
        // Gap period (11am-1pm) - no line intersection
        lineY = topPadding + height; // Bottom of chart
      } else if (timeIndex >= 4 && timeIndex <= 12) {
        // Afternoon period (1pm-9pm)
        const periodRatio = (timeIndex - 4) / 8;
        const intensities = [2.8, 3.2, 3.8, 4.1, 4.3, 4.0, 3.8, 3.5, 3.2];
        const segmentIndex = Math.floor(periodRatio * (intensities.length - 1));
        const segmentRatio = (periodRatio * (intensities.length - 1)) % 1;
        
        if (segmentIndex < intensities.length - 1) {
          const startIntensity = intensities[segmentIndex];
          const endIntensity = intensities[segmentIndex + 1];
          const intensity = startIntensity + (endIntensity - startIntensity) * segmentRatio;
          lineY = topPadding + height - ((intensity / maxValue) * height);
        } else {
          const intensity = intensities[intensities.length - 1];
          lineY = topPadding + height - ((intensity / maxValue) * height);
        }
      }
      
      // Draw vertical line at exact mouse position
      ctx.strokeStyle = '#6B7280';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(currentTimeX, topPadding);
      ctx.lineTo(currentTimeX, topPadding + height);
      ctx.stroke();

      // Draw circle at line intersection only if we're in a work period
      if ((timeIndex >= 0 && timeIndex <= 2) || (timeIndex >= 4 && timeIndex <= 12)) {
        ctx.fillStyle = '#3B82F6';
        ctx.beginPath();
        ctx.arc(currentTimeX, lineY, 4, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Draw tooltip
      const tooltipX = Math.min(currentTimeX + 10, width - 140);
      const tooltipY = Math.max(lineY - 40, 10);
      const tooltipWidth = 130;
      const tooltipHeight = 40;

      ctx.fillStyle = 'white';
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 1;
      ctx.fillRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight);
      ctx.strokeRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight);

      // Tooltip text
      ctx.fillStyle = '#374151';
      ctx.font = 'bold 12px Inter';
      ctx.textAlign = 'left';
      ctx.fillText(`${dayName} ${dateStr}`, tooltipX + 8, tooltipY + 15);
      ctx.font = '11px Inter';
      ctx.fillStyle = '#6B7280';
      ctx.fillText(`Time: ${hoveredTime}`, tooltipX + 8, tooltipY + 30);
    }

    // Draw time labels on X-axis
    ctx.fillStyle = '#64748B';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    timeLabels.forEach((label, index) => {
      const x = leftPadding + (index / 12) * chartWidth;
      ctx.fillText(label, x, topPadding + height + 20);
    });

  }, [selectedDate, mousePos, showTooltip, hoveredTime]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x, y });

    // Calculate hovered time
    const leftPadding = 40;
    const chartWidth = canvas.offsetWidth - 60;
    
    if (x >= leftPadding && x <= leftPadding + chartWidth) {
      const relativeX = x - leftPadding;
      const timeIndex = (relativeX / chartWidth) * 12; // Smooth continuous calculation
      const totalMinutes = timeIndex * 60; // Convert to minutes from 9am
      const hour = 9 + Math.floor(totalMinutes / 60);
      const minutes = Math.floor(totalMinutes % 60);
      
      let timeStr;
      if (hour < 12) {
        timeStr = `${hour}:${minutes.toString().padStart(2, '0')}am`;
      } else if (hour === 12) {
        timeStr = `${hour}:${minutes.toString().padStart(2, '0')}pm`;
      } else if (hour <= 21) {
        timeStr = `${hour - 12}:${minutes.toString().padStart(2, '0')}pm`;
      } else {
        timeStr = `9:00pm`; // Cap at 9pm
      }
      
      setHoveredTime(timeStr);
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full cursor-crosshair" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
}

export function DonutChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 10;

    ctx.clearRect(0, 0, width, height);

    const data = [60, 25, 15];
    const colors = ['hsl(217, 91%, 60%)', 'hsl(38, 92%, 50%)', '#E5E7EB'];
    const total = data.reduce((sum, value) => sum + value, 0);

    let currentAngle = -Math.PI / 2;

    data.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.arc(centerX, centerY, radius * 0.6, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      
      ctx.fillStyle = colors[index];
      ctx.fill();
      
      currentAngle += sliceAngle;
    });

  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

export function ProjectChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    ctx.clearRect(0, 0, width, height);

    const data1 = [30, 35, 40, 45, 50, 55, 60];
    const data2 = [20, 25, 30, 35, 40, 35, 45];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Draw grid
    ctx.strokeStyle = '#F1F5F9';
    ctx.lineWidth = 1;
    for (let i = 1; i < 5; i++) {
      const y = (height * i) / 5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw first line (solid)
    ctx.strokeStyle = 'hsl(217, 91%, 60%)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    data1.forEach((value, index) => {
      const x = (width * index) / (data1.length - 1);
      const y = height - (height * value) / 70;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw second line (dashed)
    ctx.strokeStyle = '#EC4899';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    data2.forEach((value, index) => {
      const x = (width * index) / (data2.length - 1);
      const y = height - (height * value) / 70;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw labels
    ctx.fillStyle = '#64748B';
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';
    labels.forEach((label, index) => {
      const x = (width * index) / (labels.length - 1);
      ctx.fillText(label, x, height + 15);
    });

  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}