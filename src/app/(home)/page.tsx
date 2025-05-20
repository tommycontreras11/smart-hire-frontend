"use client";

import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Building2,
  Clock,
  DollarSign,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import { useGetAllJobPosition } from "@/hooks/api/job-position.hook";
import { useGetAllCountry } from "@/hooks/api/country.hook";
import { JobPositionContractTypeEnum } from "@/enums/job-position.enum";

const jobs = [
  {
    id: 1,
    title: "Desarrollador Full Stack",
    company: "TechCorp",
    location: "Ciudad de México",
    type: "Tiempo Completo",
    salary: "$25,000 - $35,000 MXN",
    posted: "2d",
    featured: true,
    skills: ["React", "Node.js", "TypeScript", "MongoDB"],
    description:
      "Buscamos un desarrollador full stack con experiencia en React y Node.js para unirse a nuestro equipo...",
  },
  {
    id: 2,
    title: "Diseñador UX/UI Senior",
    company: "DesignStudio",
    location: "Remoto",
    type: "Tiempo Completo",
    salary: "$30,000 - $45,000 MXN",
    posted: "1d",
    featured: true,
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    description:
      "Únete a nuestro equipo de diseño para crear experiencias digitales excepcionales...",
  },
  {
    id: 3,
    title: "Product Manager",
    company: "InnovaSoft",
    location: "Guadalajara",
    type: "Tiempo Completo",
    salary: "$40,000 - $60,000 MXN",
    posted: "3d",
    featured: false,
    skills: ["Agile", "Scrum", "Product Strategy", "Analytics"],
    description:
      "Buscamos un Product Manager experimentado para liderar el desarrollo de productos digitales...",
  },
];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const { data: jobPositions } = useGetAllJobPosition();
  const { data: countries, isLoading: isLoadingCountries } = useGetAllCountry();
  const jobPositionContractType = Object.values(
    JobPositionContractTypeEnum
  ).map((type) => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(),
  }));

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 z-0" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Encuentra tu próxima
              <span className="text-primary"> oportunidad</span>
            </motion.h1>
            <motion.p
              className="mt-4 text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Explora las mejores ofertas laborales y da el siguiente paso en tu
              carrera
            </motion.p>
          </div>

          <motion.div
            className="mt-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar por puesto o habilidad..."
                  className="pl-10 bg-white"
                  value={searchTerm}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                  }
                />
              </div>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full sm:w-[200px] bg-white">
                  <SelectValue placeholder="Ubicación" />
                </SelectTrigger>
                <SelectContent>
                  {!isLoadingCountries && countries && (
                    countries.map((country) => (
                      <SelectItem
                        key={country.uuid}
                        value={country.uuid}
                      >{country.name}</SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[200px] bg-white">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  {jobPositionContractType.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label.replace("_", " ")}
                    </SelectItem>
                  ))}{" "}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6">
          {jobPositions && jobPositions.map((job, index) => (
            <motion.div
              key={job.uuid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group relative bg-card hover:shadow-lg transition-shadow rounded-lg p-6 border">
                
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {job.name}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <Building2 className="h-4 w-4" />
                        <span>{job.recruiter.institution.name}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.country.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.contract_type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span>{`${job.minimum_salary} - ${job.maximum_salary} USD`}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Hace {job.posted}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex sm:flex-col gap-3 sm:min-w-[120px]">
                    <Button className="flex-1" size="lg">
                      Aplicar
                    </Button>
                    <Button variant="outline" className="flex-1" size="lg">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
