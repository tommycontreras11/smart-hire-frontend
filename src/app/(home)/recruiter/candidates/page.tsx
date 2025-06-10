'use client';

import { CandidateList } from '@/components/common/candidates/candidate-list';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusRequestEnum, StatusRequestFilterEnum } from '@/enums/request.enum';
import {
  Search
} from 'lucide-react';
import { useState } from 'react';

export default function CandidatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search candidates..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="sm:w-[150px]">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Puesto</DropdownMenuItem>
              <DropdownMenuItem>Experiencia</DropdownMenuItem>
              <DropdownMenuItem>Ubicación</DropdownMenuItem>
              <DropdownMenuItem>Fecha de Aplicación</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Select defaultValue="recent">
            <SelectTrigger className="sm:w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Más recientes</SelectItem>
              <SelectItem value="oldest">Más antiguos</SelectItem>
              <SelectItem value="name">Nombre</SelectItem>
              <SelectItem value="rating">Evaluación</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </div>

      <Tabs defaultValue="ALL" className="space-y-4">
        <TabsList>
          {Object.values(StatusRequestFilterEnum).map((status) => 
            <TabsTrigger key={status} value={status}>{status}</TabsTrigger>
        )}
        </TabsList>
        
        {Object.values(StatusRequestFilterEnum).map((status) => 
        
        <TabsContent key={status} value={status}>
            <CandidateList searchTerm={searchTerm} status={status} />
        </TabsContent>
        )}
      </Tabs>
    </main>
  );
}