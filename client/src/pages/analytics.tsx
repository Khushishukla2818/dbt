import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/translations";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3, PieChart, TrendingUp, Users } from "lucide-react";

interface AnalyticsData {
  overview: {
    totalStudents: number;
    dbtEnabled: number;
    notEnabled: number;
    enabledPercentage: number;
  };
  regional: Record<string, { enabled: number; notEnabled: number }>;
  quizStats: {
    totalAttempts: number;
    averageScore: number;
  };
}

export default function Analytics() {
  const { language } = useLanguage();
  const [charts, setCharts] = useState<any>({});

  const { data: analyticsData, isLoading } = useQuery<{ success: boolean; data: AnalyticsData }>({
    queryKey: ['/api/analytics'],
  });

  useEffect(() => {
    if (analyticsData?.data && typeof window !== 'undefined') {
      initializeCharts(analyticsData.data);
    }
  }, [analyticsData]);

  const initializeCharts = async (data: AnalyticsData) => {
    // Dynamically import Chart.js
    const Chart = (await import('chart.js/auto')).default;

    // Pie Chart for overall statistics
    const pieCtx = document.getElementById('pieChart') as HTMLCanvasElement;
    if (pieCtx && !charts.pie) {
      const pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: ['DBT-Enabled', 'Not Enabled'],
          datasets: [{
            data: [data.overview.dbtEnabled, data.overview.notEnabled],
            backgroundColor: [
              'hsl(156, 100%, 35%)', // Secondary color
              'hsl(45, 100%, 50%)'   // Accent color
            ],
            borderWidth: 2,
            borderColor: 'hsl(0, 0%, 100%)'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            },
            title: {
              display: true,
              text: 'DBT Status Distribution'
            }
          }
        }
      });
      setCharts((prev: any) => ({ ...prev, pie: pieChart }));
    }

    // Bar Chart for regional breakdown
    const barCtx = document.getElementById('barChart') as HTMLCanvasElement;
    if (barCtx && !charts.bar) {
      const regions = Object.keys(data.regional);
      const enabledData = regions.map(region => data.regional[region].enabled);
      const notEnabledData = regions.map(region => data.regional[region].notEnabled);

      const barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: regions,
          datasets: [
            {
              label: 'DBT-Enabled',
              data: enabledData,
              backgroundColor: 'hsl(156, 100%, 35%)'
            },
            {
              label: 'Not Enabled',
              data: notEnabledData,
              backgroundColor: 'hsl(45, 100%, 50%)'
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Regional DBT Status'
            }
          },
          scales: {
            x: {
              stacked: true
            },
            y: {
              stacked: true,
              beginAtZero: true
            }
          }
        }
      });
      setCharts((prev: any) => ({ ...prev, bar: barChart }));
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">
            {getTranslation('analytics.title', language)}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="card-shadow">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
          
          <Card className="card-shadow">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const data = analyticsData?.data;
  if (!data) return null;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">
          {getTranslation('analytics.title', language)}
        </h2>
        <p className="text-muted-foreground">
          Real-time insights into DBT readiness across students
        </p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              {getTranslation('analytics.overview', language)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <canvas id="pieChart" width="300" height="300" data-testid="pie-chart"></canvas>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              {getTranslation('analytics.regional', language)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <canvas id="barChart" width="400" height="300" data-testid="bar-chart"></canvas>
          </CardContent>
        </Card>
      </div>
      
      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-shadow text-center">
          <CardContent className="p-6">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-secondary" data-testid="stat-enabled">
              {data.overview.dbtEnabled.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">DBT-Enabled Students</div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow text-center">
          <CardContent className="p-6">
            <div className="text-3xl mb-2">⚠️</div>
            <div className="text-2xl font-bold text-accent" data-testid="stat-pending">
              {data.overview.notEnabled.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Pending Setup</div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow text-center">
          <CardContent className="p-6">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold text-primary" data-testid="stat-percentage">
              {data.overview.enabledPercentage}%
            </div>
            <div className="text-sm text-muted-foreground">DBT Readiness</div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow text-center">
          <CardContent className="p-6">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-primary" data-testid="stat-quiz-attempts">
              {data.quizStats.totalAttempts}
            </div>
            <div className="text-sm text-muted-foreground">Quiz Attempts</div>
          </CardContent>
        </Card>
      </div>

      {/* Quiz Performance */}
      {data.quizStats.totalAttempts > 0 && (
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Quiz Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2" data-testid="quiz-average-score">
                  {data.quizStats.averageScore}%
                </div>
                <p className="text-muted-foreground">Average Quiz Score</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">
                  {data.quizStats.totalAttempts}
                </div>
                <p className="text-muted-foreground">Total Quiz Attempts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
