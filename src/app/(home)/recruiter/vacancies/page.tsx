'use client';

import { IVacancy, VacancyCard } from '@/components/common/vacancies/vacancy-card';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Filter,
    Plus,
    Search
} from 'lucide-react';
import { useState } from 'react';

// Mock data for vacancies
const vacancyData: IVacancy[] = [
  {
    id: '1',
    title: 'Desarrollador Full Stack',
    department: 'Tecnología',
    location: 'Remoto',
    type: 'Tiempo Completo',
    status: 'active',
    applicants: 24,
    datePosted: '2025-06-01',
    deadline: '2025-06-30',
    salary: '$25,000 - $35,000 MXN',
    description: 'Buscamos un desarrollador full stack con experiencia en React y Node.js para unirse a nuestro equipo...',
  },
  {
    id: '2',
    title: 'Diseñador UX/UI Senior',
    department: 'Diseño',
    location: 'Ciudad de México',
    type: 'Tiempo Completo',
    status: 'active',
    applicants: 18,
    datePosted: '2025-06-05',
    deadline: '2025-07-05',
    salary: '$30,000 - $40,000 MXN',
    description: 'Estamos buscando un diseñador UX/UI experimentado para liderar proyectos de diseño de productos...',
  },
  {
    id: '3',
    title: 'Gerente de Marketing Digital',
    department: 'Marketing',
    location: 'Ciudad de México',
    type: 'Tiempo Completo',
    status: 'active',
    applicants: 12,
    datePosted: '2025-06-10',
    deadline: '2025-07-10',
    salary: '$35,000 - $45,000 MXN',
    description: 'Buscamos un gerente de marketing digital para supervisar nuestras campañas en línea y estrategias de contenido...',
  },
  {
    id: '4',
    title: 'Especialista en Ventas',
    department: 'Ventas',
    location: 'Guadalajara',
    type: 'Tiempo Completo',
    status: 'draft',
    applicants: 0,
    datePosted: '2025-06-12',
    deadline: '2025-07-12',
    salary: '$20,000 - $30,000 MXN + comisiones',
    description: 'Estamos buscando un especialista en ventas para ampliar nuestra cartera de clientes y aumentar los ingresos...',
  },
  {
    id: '5',
    title: 'Desarrollador Frontend React',
    department: 'Tecnología',
    location: 'Monterrey',
    type: 'Tiempo Completo',
    status: 'closed',
    applicants: 30,
    datePosted: '2025-05-01',
    deadline: '2025-06-01',
    salary: '$22,000 - $32,000 MXN',
    description: 'Buscamos un desarrollador frontend con experiencia en React para crear interfaces de usuario de alta calidad...',
  },
];

export default function VacanciesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  return (
    <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Vacantes</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Crear Vacante
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar vacantes..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="sm:w-[150px]">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Departamento</DropdownMenuItem>
              <DropdownMenuItem>Ubicación</DropdownMenuItem>
              <DropdownMenuItem>Tipo de Contrato</DropdownMenuItem>
              <DropdownMenuItem>Fecha de Publicación</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Select defaultValue="recent">
            <SelectTrigger className="sm:w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Más recientes</SelectItem>
              <SelectItem value="oldest">Más antiguos</SelectItem>
              <SelectItem value="applicants">Más aplicantes</SelectItem>
              <SelectItem value="deadline">Fecha límite</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Activas</TabsTrigger>
          <TabsTrigger value="draft">Borradores</TabsTrigger>
          <TabsTrigger value="closed">Cerradas</TabsTrigger>
          <TabsTrigger value="all">Todas</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vacancyData
              .filter(vacancy => vacancy.status === 'active')
              .filter(vacancy => vacancy.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(vacancy => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="draft" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vacancyData
              .filter(vacancy => vacancy.status === 'draft')
              .filter(vacancy => vacancy.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(vacancy => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="closed" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vacancyData
              .filter(vacancy => vacancy.status === 'closed')
              .filter(vacancy => vacancy.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(vacancy => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vacancyData
              .filter(vacancy => vacancy.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(vacancy => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* <CreateVacancyDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} /> */}
    </main>
  );
}