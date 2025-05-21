'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, XAxis, YAxis, Area, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const areaData = [
  { name: 'Ene', Candidatos: 40, Contratados: 24 },
  { name: 'Feb', Candidatos: 30, Contratados: 13 },
  { name: 'Mar', Candidatos: 45, Contratados: 20 },
  { name: 'Abr', Candidatos: 50, Contratados: 22 },
  { name: 'May', Candidatos: 35, Contratados: 18 },
  { name: 'Jun', Candidatos: 55, Contratados: 25 },
  { name: 'Jul', Candidatos: 60, Contratados: 30 },
];

const barData = [
  { name: 'TI', Vacantes: 20, Contratados: 16 },
  { name: 'Ventas', Vacantes: 15, Contratados: 10 },
  { name: 'Marketing', Vacantes: 10, Contratados: 7 },
  { name: 'RRHH', Vacantes: 8, Contratados: 5 },
  { name: 'Finanzas', Vacantes: 12, Contratados: 9 },
  { name: 'Soporte', Vacantes: 18, Contratados: 12 },
];

export function OverviewChart() {
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
              <AreaChart data={areaData}
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
                <Area type="monotone" dataKey="Candidatos" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#candidatos)" />
                <Area type="monotone" dataKey="Contratados" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#contratados)" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="departamentos" className="pt-4">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={barData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                  }}
                />
                <Bar dataKey="Vacantes" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Contratados" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}