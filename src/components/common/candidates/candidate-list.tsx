"use client";

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
import { StatusRequestEnum } from "@/enums/request.enum";
import { useGetAllRecruitmentProcess } from "@/hooks/api/job-position.hook";
import {
  Calendar,
  CheckCircle,
  FileText,
  Mail,
  MoreHorizontal,
  XCircle,
} from "lucide-react";
import { useState } from "react";

// Import the styles
import { useUpdateRequest } from "@/mutations/api/requests";
import { IUpdateRequest } from "@/providers/http/requests/interface";
import { updateRequestFormSchema } from "@/schema/request.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useForm } from "react-hook-form";
import { CreateUpdateForm, IFormField } from "../modal/create-update";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { useSendInterviewScheduleEmail } from "@/mutations/api/emails";

interface CandidateListProps {
  searchTerm: string;
  status: StatusRequestEnum | "ALL";
}

export const statusBadgeMap: Record<
  string,
  { label: string; className: string }
> = {
  [StatusRequestEnum.DRAFT]: {
    label: "Borrador",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  },
  [StatusRequestEnum.SUBMITTED]: {
    label: "Nuevo",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
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
    className: "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-400",
  },
};

export function CandidateList({ searchTerm, status }: CandidateListProps) {
  const { user } = useAuth();
  const { data: recruitmentProcesses, refetch } = useGetAllRecruitmentProcess();
  const [uuid, setUuid] = useState<string | null>("");
  const [name, setName] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [subject, setSubject] = useState<string | null>("");
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [requestFields, setRequestFields] = useState<IFormField[]>([
    {
      name: "interviewDate",
      label: "Interview Date",
      type: "datetime",
    },
    {
      name: "link",
      label: "Link",
      type: "text",
    },
  ]);

  const form = useForm<IUpdateRequest>({
    resolver: zodResolver(updateRequestFormSchema),
    defaultValues: {
      interviewDate: new Date(),
      link: "",
    },
  });

  const { mutate: updateRequest } = useUpdateRequest(() => {
    refetch();
    setIsModalOpen(false);
    setSelectedCandidate(null);
    setUuid(null);
  });

  const filteredCandidates =
    recruitmentProcesses &&
    recruitmentProcesses.filter((candidate) => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = status === "ALL" || candidate.status === status;

      return matchesSearch && matchesStatus;
    });

  const handleSubmit = async (data: Partial<IUpdateRequest>) => {
    if (!uuid || !selectedCandidate) return;

    let content = data.link;
    let interviewDate = data.interviewDate;

    try {
        const emailPayload = {
        name,
        email,
        date: interviewDate,
        subject,
        content,
  };

      const emailData = await useSendInterviewScheduleEmail(emailPayload);

      console.log(emailData)

      if (emailData?.success) {
        // toast.success("Success", {
        //   description: "Interview scheduled successfully",
        //   duration: 3000,
        // });
        alert("Interview scheduled successfully");
        updateRequest({ uuid, data });
      }

      if (!emailData.success) {
  // toast.error("Error", {
  //   description: emailData.error || "No se pudo enviar el correo",
  // });

  alert(
    emailData.error || "No se pudo enviar el correo"
  );
}

    } catch (error) {
      // toast.error("Error", {
      //   description: "An error occurred, please try again later",
      //   duration: 3000,
      // });

      alert(
        "An error occurred, please try again later")
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Candidate</TableHead>
              <TableHead>Position</TableHead>
              {/* <TableHead>Evaluación</TableHead> */}
              <TableHead>Application Date</TableHead>
              <TableHead>Interview Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates && filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate) => (
                <TableRow key={candidate.uuid}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage alt={candidate.name} />
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
                  {/* <TableCell>
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
                </TableCell> */}
                  <TableCell>
                    {new Date(candidate.applied_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {candidate.interview_date
                      ? new Date(candidate.interview_date).toLocaleDateString()
                      : "-"}
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
                        {/* <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Perfil
                        </DropdownMenuItem> */}
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          Ver CV
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar Correo
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className={
                            ![StatusRequestEnum.UNDER_REVIEW].includes(
                              candidate.status
                            )
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                          disabled={
                            ![StatusRequestEnum.UNDER_REVIEW].includes(
                              candidate.status
                            )
                          }
                          onClick={() => {
                            setIsModalOpen(true);
                            setSelectedCandidate(candidate.uuid);
                            setName(candidate.name);
                            setEmail(candidate.email);
                            user && setSubject(user?.name);
                            setUuid(candidate.uuid);
                          }}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Programar Entrevista
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className={
                            [StatusRequestEnum.HIRED].includes(candidate.status)
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                          disabled={[StatusRequestEnum.HIRED].includes(
                            candidate.status
                          )}
                          onClick={() =>
                            updateRequest({
                              uuid: candidate.uuid,
                              data: {
                                candidateUUID: candidate.candidateUUID,
                                status: candidate.status,
                                nextStatus: true,
                              },
                            })
                          }
                        >
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          Avanzar Etapa
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className={
                            ![
                              StatusRequestEnum.REJECTED,
                              StatusRequestEnum.CANCELLED,
                            ].includes(candidate.status)
                              ? "text-destructive pointer-events-none opacity-50"
                              : "text-destructive"
                          }
                          disabled={[
                            StatusRequestEnum.REJECTED,
                            StatusRequestEnum.CANCELLED,
                          ].includes(candidate.status)}
                          onClick={() =>
                            updateRequest({
                              uuid: candidate.uuid,
                              data: {
                                candidateUUID: candidate.candidateUUID,
                                status: StatusRequestEnum.REJECTED,
                                nextStatus: false,
                              },
                            })
                          }
                        >
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
                  No se encontraron candidatos que coincidan con los criterios
                  de búsqueda.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <CreateUpdateForm<IUpdateRequest>
        isEditable={true}
        entityName="Request"
        fields={requestFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
