'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Clock, FileText, XCircle } from 'lucide-react';
import { useState } from 'react';

interface Application {
  id: string;
  position: string;
  company: string;
  status: 'pending' | 'review' | 'interview' | 'technical' | 'offer' | 'rejected';
  appliedDate: string;
  lastUpdate: string;
  nextStep?: string;
}

// Mock data for applications
const applications: Application[] = [
  {
    id: '1',
    position: 'Desarrollador Full Stack',
    company: 'TechCorp',
    status: 'interview',
    appliedDate: '2025-06-15',
    lastUpdate: '2025-06-18',
    nextStep: 'Entrevista técnica programada para el 25 de junio',
  },
  {
    id: '2',
    position: 'Diseñador UX/UI Senior',
    company: 'DesignStudio',
    status: 'technical',
    appliedDate: '2025-06-10',
    lastUpdate: '2025-06-17',
    nextStep: 'Completar prueba técnica antes del 20 de junio',
  },
  {
    id: '3',
    position: 'Product Manager',
    company: 'InnovaSoft',
    status: 'rejected',
    appliedDate: '2025-06-01',
    lastUpdate: '2025-06-15',
  },
];

const statusInfo = {
  pending: {
    label: 'Pendiente de Revisión',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    icon: Clock,
  },
  review: {
    label: 'En Revisión',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    icon: FileText,
  },
  interview: {
    label: 'Entrevista',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    icon: FileText,
  },
  technical: {
    label: 'Prueba Técnica',
    color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    icon: FileText,
  },
  offer: {
    label: 'Oferta',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    icon: CheckCircle2,
  },
  rejected: {
    label: 'No seleccionado',
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    icon: XCircle,
  },
};

export default function RecruitmentProcess() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredApplications = applications.filter(app => {
    if (filter === 'active') {
      return !['rejected', 'offer'].includes(app.status);
    }
    if (filter === 'completed') {
      return ['rejected', 'offer'].includes(app.status);
    }
    return true;
  });

  return (
    <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Mis Postulaciones</h1>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setFilter('all')}>
            Todas
          </TabsTrigger>
          <TabsTrigger value="active" onClick={() => setFilter('active')}>
            Activas
          </TabsTrigger>
          <TabsTrigger value="completed" onClick={() => setFilter('completed')}>
            Completadas
          </TabsTrigger>
        </TabsList>

        <div className="grid gap-4">
          {filteredApplications.map((application) => {
            const status = statusInfo[application.status];
            const StatusIcon = status.icon;

            return (
              <Card key={application.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-bold">
                    {application.position}
                  </CardTitle>
                  <Badge variant="outline" className={status.color}>
                    <StatusIcon className="mr-1 h-3 w-3" />
                    {status.label}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        {application.company}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>Aplicado: {new Date(application.appliedDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Última actualización: {new Date(application.lastUpdate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {application.nextStep && (
                      <div className="rounded-lg bg-primary/5 p-4">
                        <p className="text-sm font-medium">Próximo paso:</p>
                        <p className="text-sm text-muted-foreground">{application.nextStep}</p>
                      </div>
                    )}

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Ver Detalles</Button>
                      {application.status !== 'rejected' && (
                        <Button variant="outline" className="text-destructive">
                          Retirar Postulación
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filteredApplications.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-lg font-medium">No hay postulaciones</p>
                <p className="text-sm text-muted-foreground">
                  No se encontraron postulaciones que coincidan con los filtros seleccionados.
                </p>
                <Button className="mt-4" onClick={() => setFilter('all')}>
                  Ver todas las postulaciones
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </Tabs>
    </main>
  );
}