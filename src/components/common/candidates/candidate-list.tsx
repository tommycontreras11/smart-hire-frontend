"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  FileText,
  MoreHorizontal,
  Mail,
  Calendar,
  Star,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { candidatesData, type Candidate } from "@/lib/data/candidates";
import { StatusRequestEnum } from "@/enums/request.enum";

interface CandidateListProps {
  searchTerm: string;
  status: StatusRequestEnum | "ALL";
}

  export const statusBadgeMap: Record<string, { label: string; className: string }> = {
    [StatusRequestEnum.DRAFT]: {
      label: "Borrador",
      className:
        "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    },
    [StatusRequestEnum.SUBMITTED]: {
      label: "Nuevo",
      className:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    },
    [StatusRequestEnum.UNDER_REVIEW]: {
      label: "En Revisión",
      className:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    },
    [StatusRequestEnum.INTERVIEW]: {
      label: "Entrevista",
      className:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    },
    [StatusRequestEnum.EVALUATED]: {
      label: "Evaluado",
      className:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    },
    [StatusRequestEnum.APPROVED]: {
      label: "Aprobado",
      className:
        "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
    },
    [StatusRequestEnum.REJECTED]: {
      label: "Rechazado",
      className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    },
    [StatusRequestEnum.HIRED]: {
      label: "Contratado",
      className:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    },
    [StatusRequestEnum.CANCELLED]: {
      label: "Cancelado",
      className:
        "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-400",
    },
  };

export function CandidateList({ searchTerm, status }: CandidateListProps) {
  const filteredCandidates = candidatesData.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = status === "ALL" || candidate.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Candidato</TableHead>
            <TableHead>Posición</TableHead>
            <TableHead>Evaluación</TableHead>
            <TableHead>Fecha de Aplicación</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={candidate.avatarUrl}
                        alt={candidate.name}
                      />
                      <AvatarFallback>
                        {candidate.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{candidate.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {candidate.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{candidate.position}</TableCell>
                <TableCell>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < candidate.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(candidate.appliedDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {candidate.status && statusBadgeMap[candidate.status] && (
                    <Badge
                      variant="outline"
                      className={statusBadgeMap[candidate.status].className}
                    >
                      {statusBadgeMap[candidate.status].label}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Perfil
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Ver CV
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Enviar Correo
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        Programar Entrevista
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        Avanzar Etapa
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <XCircle className="mr-2 h-4 w-4" />
                        Rechazar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-6 text-muted-foreground"
              >
                No se encontraron candidatos que coincidan con los criterios de
                búsqueda.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
