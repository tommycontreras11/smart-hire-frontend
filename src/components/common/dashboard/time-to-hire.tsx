'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface TimeMetric {
  department: string;
  timeInDays: number;
  color: string;
}

const timeMetrics: TimeMetric[] = [
  { department: 'Desarrollo', timeInDays: 18, color: 'bg-chart-1' },
  { department: 'Marketing', timeInDays: 12, color: 'bg-chart-2' },
  { department: 'Ventas', timeInDays: 24, color: 'bg-chart-3' },
  { department: 'Finanzas', timeInDays: 30, color: 'bg-chart-4' },
  { department: 'Recursos Humanos', timeInDays: 15, color: 'bg-chart-5' },
];

const maxDays = Math.max(...timeMetrics.map(metric => metric.timeInDays)) * 1.2;

export function TimeToHire() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tiempo de Contratación</CardTitle>
        <CardDescription>
          Tiempo promedio por departamento (días)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeMetrics.map((metric) => (
            <div key={metric.department} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium">{metric.department}</div>
                <div className="text-muted-foreground">{metric.timeInDays} días</div>
              </div>
              <Progress 
                value={(metric.timeInDays / maxDays) * 100} 
                className={metric.color} 
                aria-label={`${metric.department} tiempo de contratación`}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}