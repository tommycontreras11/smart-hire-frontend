"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  CheckCircle,
  Eye,
  FileText,
  Mail,
  MoreHorizontal,
  Star,
  XCircle,
} from "lucide-react";
import { candidatesData, type Candidate } from "@/lib/data/candidates";
import { StatusRequestEnum } from "@/enums/request.enum";
import { statusBadgeMap } from "./candidate-list";

interface CandidateGridProps {
  searchTerm: string;
  status: StatusRequestEnum | "ALL";
}

export function CandidateGrid({ searchTerm, status }: CandidateGridProps) {
  const filteredCandidates = candidatesData.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = status === "ALL" || candidate.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredCandidates.length > 0 ? (
        filteredCandidates.map((candidate) => (
          <Card key={candidate.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative p-6">
                <div className="absolute right-4 top-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
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
                </div>

                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage
                      src={candidate.avatarUrl}
                      alt={candidate.name}
                    />
                    <AvatarFallback className="text-xl">
                      {candidate.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">{candidate.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {candidate.email}
                  </p>
                  <p className="font-medium">{candidate.position}</p>

                  <div className="flex mt-2">
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

                  <div className="w-full mt-4">
                    {candidate.status && statusBadgeMap[candidate.status] && (
                      <Badge
                        variant="outline"
                        className={`w-full ${
                          statusBadgeMap[candidate.status].className
                        }`}
                      >
                        {statusBadgeMap[candidate.status].label}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t px-6 py-3 bg-muted/30 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Aplicó: {new Date(candidate.appliedDate).toLocaleDateString()}
                </span>

                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-full text-center py-12 text-muted-foreground">
          No se encontraron candidatos que coincidan con los criterios de
          búsqueda.
        </div>
      )}
    </div>
  );
}
