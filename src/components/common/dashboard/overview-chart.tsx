'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IRecruiterDashboard } from '@/providers/http/recruiters/interface';
import { AreaChart, XAxis, YAxis, Area, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export function OverviewChart({ dashboard }: {dashboard: IRecruiterDashboard | undefined}) {
  return (
    <Card className="col-span-full xl:col-span-2">
      <CardHeader>
        <CardTitle>Actividad de Reclutamiento</CardTitle>
        <CardDescription>
          Resumen de candidatos y contrataciones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mensual">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="mensual">Mensual</TabsTrigger>
              <TabsTrigger value="departamentos">Por Departamento</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="mensual" className="pt-4">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={dashboard?.recruitmentMonthActivity}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="candidatos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="contratados" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                  }}
                />
                <Area type="monotone" dataKey="activity.total_candidates" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#candidatos)" />
                <Area type="monotone" dataKey="activity.total_hired" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#contratados)" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="departamentos" className="pt-4">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={dashboard?.recruitmentDepartmentActivity}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                  }}
                />
                <Bar dataKey="total_candidates" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="total_hired" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}