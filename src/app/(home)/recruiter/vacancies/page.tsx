'use client';

import { CreateUpdateForm, IFormField } from '@/components/common/modal/create-update';
import { VacancyCard } from '@/components/common/vacancies/vacancy-card';
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
import { useAuth } from '@/contexts/auth-context';
import { StatusEnum, UserRoleEnum } from '@/enums/common.enum';
import { JobPositionContractTypeEnum } from '@/enums/job-position.enum';
import { useGetAllCompetency } from '@/hooks/api/competency.hook';
import { useGetAllCountry } from '@/hooks/api/country.hook';
import { useGetAllJobPosition } from '@/hooks/api/job-position.hook';
import { useGetAllLanguage } from '@/hooks/api/language.hook';
import { useCreateJobPosition } from '@/mutations/api/job-positions';
import { ICreateJobPosition } from '@/providers/http/job-positions/interface';
import { jobPositionCreateFormSchema } from '@/schema/job-position.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Filter,
  Plus,
  Search
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function VacanciesPage() {
  const { user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobPositionFields, setJobPositionFields] = useState<IFormField[]>([
    { name: "name", label: "Name", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "minimum_salary", label: "Minimum Salary", type: "number" },
    { name: "maximum_salary", label: "Maximum Salary", type: "number" },
    {
      name: "contract_type",
      label: "Contract Type",
      type: "select",
      options: Object.values(JobPositionContractTypeEnum).map((level) => ({
        label: level,
        value: level,
      })),
    },
    { name: "due_date", label: "Due Date", type: "date" },
  ])

  const form = useForm<ICreateJobPosition>({
    resolver: zodResolver(jobPositionCreateFormSchema),
    defaultValues: {
      name: "",
      description: "",
      minimum_salary: "0",
      maximum_salary: "0",
      contract_type: "",
      due_date: new Date(),
      countryUUID: "",
      languageUUID: "",
      competencyUUIDs: [],
    }
  })
  
  const [searchTerm, setSearchTerm] = useState('');

  const { mutate: createJobPosition } = useCreateJobPosition(() => {
    form.reset()
    setIsModalOpen(false)
  })

  const { data: jobPositions } = useGetAllJobPosition()
  const { data: countries, isLoading: isLoadingCountries } = useGetAllCountry()
  const { data: languages, isLoading: isLoadingLanguages } = useGetAllLanguage()
  const { data: competencies, isLoading: isLoadingCompetencies } = useGetAllCompetency()

  useEffect(() => {
    if(isLoadingLanguages || isLoadingCountries || isLoadingCompetencies || !countries || !languages || !competencies) return

    setJobPositionFields((prev) => {
      if(!prev.find((field) => field.name === "countryUUID")) {
        return [
          ...prev,
          {
            name: "countryUUID",
            label: "Country",
            type: "select",
            options: countries.map((country) => ({
              label: country.name,
              value: country.uuid,
            })),
          },
        ]
      }
      return prev
    })

    setJobPositionFields((prev) => {
      if(!prev.find((field) => field.name === "languageUUID")) {
        return [
          ...prev,
          {
            name: "languageUUID",
            label: "Language",
            type: "select",
            options: languages.map((language) => ({
              label: language.name,
              value: language.uuid,
            })),
          },
        ]
      }
      return prev
    })

    setJobPositionFields((prev) => {
      if(!prev.find((field) => field.name === "competencyUUIDs")) {
        return [
          ...prev,
          {
            name: "competencyUUIDs",
            label: "Competencies",
            type: "multi-select",
            options: competencies.map((competency) => ({
              label: competency.name,
              value: competency.uuid,
            })),
          },
        ]
      }
      return prev
    })

  }, [isLoadingCountries, isLoadingLanguages, isLoadingCompetencies])
  
  const handleSubmit = (data: Partial<ICreateJobPosition>) => {
    if(!user || user.role !== UserRoleEnum.RECRUITER) return
    createJobPosition({...data, recruiterUUID: user.uuid } as ICreateJobPosition)
  }
  
  return (
    <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Vacantes</h1>
        <Button onClick={() => setIsModalOpen(true)}>
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
          <TabsTrigger value="closed">Cerradas</TabsTrigger>
          <TabsTrigger value="all">Todas</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobPositions && jobPositions
              .filter(vacancy => vacancy.status === StatusEnum.ACTIVE)
              .filter(vacancy => vacancy.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(vacancy => (
                <VacancyCard key={vacancy.uuid} vacancy={vacancy} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="closed" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobPositions && jobPositions
              .filter(vacancy => vacancy.status === StatusEnum.INACTIVE)
              .filter(vacancy => vacancy.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(vacancy => (
                <VacancyCard key={vacancy.uuid} vacancy={vacancy} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobPositions && jobPositions
              .filter(vacancy => vacancy.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(vacancy => (
                <VacancyCard key={vacancy.uuid} vacancy={vacancy} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* <CreateVacancyDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} /> */}
            <CreateUpdateForm<ICreateJobPosition>
              isEditable={false}
              entityName="Create Job Position"
              fields={jobPositionFields}
              form={form}
              onSubmit={handleSubmit}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
    </main>
  );
}