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
import { useAuth } from "@/contexts/auth-context";
import { StatusRequestEnum, StatusRequestFilterEnum } from "@/enums/request.enum";
import { useGetAllRecruitmentProcess } from "@/hooks/api/job-position.hook";
import {
  useSendHiredEmail,
  useSendInterviewEmail,
} from "@/mutations/api/emails";
import { useUpdateRequest } from "@/mutations/api/requests";
import { IUpdateRequest } from "@/providers/http/requests/interface";
import { updateRequestFormSchema } from "@/schema/request.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import "@react-pdf-viewer/core/lib/styles/index.css";
import {
  Calendar,
  CheckCircle,
  FileText,
  MoreHorizontal,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUpdateForm, IFormField } from "../modal/create-update";
import { PdfViewerModal } from "./pdf-viewer.modal";
import { ICandidate } from "@/providers/http/candidates/interface";
import { IRecruitmentProcess } from "@/providers/http/job-positions/interface";

interface CandidateListProps {
  searchTerm: string;
  status: StatusRequestFilterEnum;
}

const statusBadgeMap: Record<string, { label: string; className: string }> = {
  [StatusRequestFilterEnum.ALL]: {
    label: "ALL",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  },
  [StatusRequestFilterEnum.DRAFT]: {
    label: "Draft",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  },
  [StatusRequestFilterEnum.SUBMITTED]: {
    label: "New",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  [StatusRequestFilterEnum.UNDER_REVIEW]: {
    label: "Under Review",
    className:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  [StatusRequestFilterEnum.INTERVIEW]: {
    label: "Interview",
    className:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  },
  [StatusRequestFilterEnum.EVALUATED]: {
    label: "Evaluated",
    className:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  },
  [StatusRequestFilterEnum.REJECTED]: {
    label: "Rejected",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
  [StatusRequestFilterEnum.HIRED]: {
    label: "Hired",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  [StatusRequestFilterEnum.CANCELLED]: {
    label: "Cancelled",
    className: "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-400",
  },
};

export function CandidateList({ searchTerm, status }: CandidateListProps) {
  const { user } = useAuth();

  const [uuid, setUuid] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [position, setPosition] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [emailCandidateInfo, setEmailCandidateInfo] = useState<{
    uuid: string;
    name: string;
    email: string;
    subject: string;
    position: string;
  } | null>(null);

  const [selectedCV, setSelectedCV] = useState<{
    url: string;
    name: string;
  } | null>(null);

  const [requestFields] = useState<IFormField[]>([
    {
      name: "interviewDate",
      label: "Interview Date",
      type: "datetime",
    },
    {
      name: "link",
      label: "Interview Link",
      type: "text",
    },
  ]);

  const { data: recruitmentProcesses, refetch } = useGetAllRecruitmentProcess();

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
    setUuid(null);
  });

  const { mutate: sendHiredEmail } = useSendHiredEmail(() => {
    refetch();
  });

  const { mutate: sendInterviewEmail } = useSendInterviewEmail(() => {
    refetch();
    setIsModalOpen(false);
    setUuid(null);
  });

  const filteredCandidates = recruitmentProcesses?.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = status === "ALL" || candidate.status === status;

    return matchesSearch && matchesStatus;
  });

  const handleSubmit = async (data: Partial<IUpdateRequest>) => {
    if (!uuid) return;

    const content = data.link;
    const date = data.interviewDate;

    const emailPayload = {
      candidateName: name,
      interviewLink: content,
      interviewerName: subject,
      interviewDate: new Date(date ?? "").toLocaleDateString(),
      interviewTime: new Date(date ?? "").toLocaleTimeString(),
    };

    sendInterviewEmail({ ...emailPayload, requestUUID: uuid, to: email! });
  };

  const handleSendHiredSubmit = async (recruitmentProcess: IRecruitmentProcess) => {
    if (!recruitmentProcess.uuid || !recruitmentProcess.name || !recruitmentProcess.email || !recruitmentProcess.position) return;

    const emailPayload = {
      candidateName: recruitmentProcess.name,
      email: recruitmentProcess.email,
      positionTitle: recruitmentProcess.position,
      startDate: new Date().toUTCString(),
      hrContactName: recruitmentProcess.name,
      hrContactEmail: recruitmentProcess.email,
      offerLink: `http://localhost:3001/accept-offer/${recruitmentProcess.uuid}/${recruitmentProcess.candidateUUID}`,
    };

    sendHiredEmail({ ...emailPayload, requestUUID: recruitmentProcess.uuid });
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Candidate</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Applied Date</TableHead>
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
                            .map((n) => n[0])
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
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            setSelectedCV({
                              url: candidate.curriculum,
                              name: candidate.name,
                            })
                          }
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          View Resume
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className={
                            ![StatusRequestFilterEnum.UNDER_REVIEW].includes(
                              candidate.status
                            )
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                          disabled={
                            ![StatusRequestFilterEnum.UNDER_REVIEW].includes(
                              candidate.status
                            )
                          }
                          onClick={() => {
                            setIsModalOpen(true);
                            setName(candidate.name);
                            setEmail(candidate.email);
                            user && setSubject(user?.name);
                            setUuid(candidate.uuid);
                            setPosition(candidate.position);
                          }}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Interview
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className={
                            [StatusRequestFilterEnum.UNDER_REVIEW, StatusRequestFilterEnum.HIRED].includes(candidate.status)
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                          disabled={[StatusRequestFilterEnum.UNDER_REVIEW, StatusRequestFilterEnum.HIRED].includes(
                            candidate.status
                          )}
                          onClick={async () => {                            
                            if (
                              candidate.status == StatusRequestFilterEnum.EVALUATED
                            ) {
                              await handleSendHiredSubmit(candidate);
                            } else {
                              updateRequest({
                                uuid: candidate.uuid,
                                data: {
                                  candidateUUID: candidate.candidateUUID,
                                  status: candidate.status as unknown as StatusRequestEnum,
                                  nextStatus: true,
                                },
                              });
                            }
                          }}
                        >
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          Advance Stage
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className={
                            ![
                              StatusRequestFilterEnum.REJECTED,
                              StatusRequestFilterEnum.CANCELLED,
                            ].includes(candidate.status)
                              ? "text-destructive"
                              : "text-destructive pointer-events-none opacity-50"
                          }
                          disabled={[
                            StatusRequestFilterEnum.REJECTED,
                            StatusRequestFilterEnum.CANCELLED,
                          ].includes(candidate.status)}
                          onClick={() =>
                            updateRequest({
                              uuid: candidate.uuid,
                              data: {
                                candidateUUID: candidate.candidateUUID,
                                status:
                                  StatusRequestEnum.REJECTED as unknown as StatusRequestEnum,
                                nextStatus: false,
                              },
                            })
                          }
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
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
                  className="text-center text-muted-foreground"
                >
                  No candidates found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {isModalOpen && (
        <CreateUpdateForm
          title="Interview Schedule"
          fields={requestFields}
          form={form}
          onSubmit={handleSubmit}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {selectedCV && (
        <PdfViewerModal
          open={!!selectedCV}
          onOpenChange={(open) => !open && setSelectedCV(null)}
          pdfUrl={selectedCV.url}
          candidateName={selectedCV.name}
        />
      )}
    </>
  );
}
