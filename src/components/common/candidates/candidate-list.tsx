"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
  Calendar,
  CheckCircle,
  FileText,
  MoreHorizontal,
  XCircle,
} from "lucide-react";
import { StatusRequestEnum } from "@/enums/request.enum";
import { useGetAllRecruitmentProcess } from "@/hooks/api/job-position.hook";
import { useAuth } from "@/contexts/auth-context";
import { useSendInterviewScheduleEmail } from "@/mutations/api/emails";
import { useUpdateRequest } from "@/mutations/api/requests";
import { IUpdateRequest } from "@/providers/http/requests/interface";
import { updateRequestFormSchema } from "@/schema/request.schema";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { CreateUpdateForm, IFormField } from "../modal/create-update";

interface CandidateListProps {
  searchTerm: string;
  status: StatusRequestEnum | "ALL";
}

const statusBadgeMap: Record<string, { label: string; className: string }> = {
  [StatusRequestEnum.DRAFT]: {
    label: "Draft",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  },
  [StatusRequestEnum.SUBMITTED]: {
    label: "New",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  [StatusRequestEnum.UNDER_REVIEW]: {
    label: "Under Review",
    className:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  [StatusRequestEnum.INTERVIEW]: {
    label: "Interview",
    className:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  },
  [StatusRequestEnum.EVALUATED]: {
    label: "Evaluated",
    className:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  },
  [StatusRequestEnum.REJECTED]: {
    label: "Rejected",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
  [StatusRequestEnum.HIRED]: {
    label: "Hired",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  [StatusRequestEnum.CANCELLED]: {
    label: "Cancelled",
    className: "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-400",
  },
};

export function CandidateList({ searchTerm, status }: CandidateListProps) {
  const { user } = useAuth();
  const { data: recruitmentProcesses, refetch } = useGetAllRecruitmentProcess();
  const [uuid, setUuid] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const filteredCandidates = recruitmentProcesses?.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = status === "ALL" || candidate.status === status;

    return matchesSearch && matchesStatus;
  });

  const handleSubmit = async (data: Partial<IUpdateRequest>) => {
    if (!uuid || !selectedCandidate) return;

    const content = data.link;
    const interviewDate = data.interviewDate;

    try {
      const emailPayload = {
        name,
        email,
        date: interviewDate,
        subject,
        content,
      };

      const emailData = await useSendInterviewScheduleEmail(emailPayload);

      if (emailData?.success) {
        toast.success("Success", {
          description: "Interview scheduled successfully",
          duration: 3000,
        });

        const formattedDate = interviewDate!.toLocaleString("en-US", {
          timeZone: "UTC",
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        updateRequest({
          uuid,
          data: {
            ...data,
            nextStep: `Technical interview scheduled for ${formattedDate}`,
          },
        });
      } else {
        toast.error("Error", {
          description: emailData.error || "Something went wrong",
          duration: 3000,
        });
      }
    } catch {
      toast.error("Error", {
        description: "An error occurred, please try again later",
        duration: 3000,
      });
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
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          View Resume
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
                          Schedule Interview
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
                          Advance Stage
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
          title="Update Request"
          fields={requestFields}
          form={form}
          onSubmit={handleSubmit}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
