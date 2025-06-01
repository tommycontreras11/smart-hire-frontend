"use client";

import AppNavbar from "@/components/ui/app-navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth-context";
import { StatusRequestEnum } from "@/enums/request.enum";
import { useGetAllRecruitmentProcess } from "@/hooks/api/job-position.hook";
import { useUpdateRequest } from "@/mutations/api/requests";
import { Clock, FileText, UserCheck, UserX, XCircle } from "lucide-react";
import { useState } from "react";

export const statusInfo = {
  [StatusRequestEnum.DRAFT]: {
    label: "Draft",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    icon: FileText,
  },
  [StatusRequestEnum.SUBMITTED]: {
    label: "Submitted",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    icon: Clock,
  },
  [StatusRequestEnum.UNDER_REVIEW]: {
    label: "Under Review",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    icon: FileText,
  },
  [StatusRequestEnum.INTERVIEW]: {
    label: "Interview",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    icon: FileText,
  },
  [StatusRequestEnum.EVALUATED]: {
    label: "Evaluated",
    color:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    icon: FileText,
  },
  [StatusRequestEnum.REJECTED]: {
    label: "Not Selected",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    icon: XCircle,
  },
  [StatusRequestEnum.HIRED]: {
    label: "Hired",
    color:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    icon: UserCheck,
  },
  [StatusRequestEnum.CANCELLED]: {
    label: "Cancelled",
    color: "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
    icon: UserX,
  },
};

export default function RecruitmentProcess() {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const { isLoggedIn, user } = useAuth();
  const { data: applications, refetch } = useGetAllRecruitmentProcess();

  const filteredApplications =
    applications &&
    applications.filter((app) => {
      if (filter === "active") {
        return ![StatusRequestEnum.REJECTED, StatusRequestEnum.HIRED].includes(
          app.status
        );
      }
      if (filter === "completed") {
        return [StatusRequestEnum.REJECTED, StatusRequestEnum.HIRED].includes(
          app.status
        );
      }
      return true;
    });

  const { mutate: updateRequest } = useUpdateRequest(() => {
    refetch();
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <AppNavbar isLoggedIn={isLoggedIn} username={user?.name} />
      <section className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            My Applications
          </h1>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setFilter("all")}>
              All
            </TabsTrigger>
            <TabsTrigger value="active" onClick={() => setFilter("active")}>
              Active
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              onClick={() => setFilter("completed")}
            >
              Completed
            </TabsTrigger>
          </TabsList>

          <div className="grid gap-4">
            {!isLoggedIn ? (
              <p className="text-muted-foreground">
                Sign in to see your applications
              </p>
            ) : (
              filteredApplications &&
              filteredApplications.length == 0 && (
                <p className="text-muted-foreground">There are no applications</p>
              )
            )}

            {applications &&
              filteredApplications &&
              filteredApplications.map((application) => {
                const status = statusInfo[application.status];
                const StatusIcon = status.icon;

                return (
                  <Card key={application.uuid}>
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
                            {application.institution}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span>
                              Applied:{" "}
                              {new Date(
                                application.applied_at
                              ).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <span>
                              Last update:{" "}
                              {new Date(
                                application.last_update
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {application.next_step && (
                          <div className="rounded-lg bg-primary/5 p-4">
                            <p className="text-sm font-medium">Next step:</p>
                            <p className="text-sm text-muted-foreground">
                              {application.next_step}
                            </p>
                          </div>
                        )}

                        <div className="flex justify-end space-x-2">
                          <Button variant="outline">View Details</Button>
                          {application.status !==
                            StatusRequestEnum.REJECTED && (
                            <Button
                              variant="outline"
                              className="text-destructive"
                              onClick={() =>
                                updateRequest({
                                  uuid: application.uuid,
                                  data: { status: StatusRequestEnum.CANCELLED },
                                })
                              }
                            >
                              Withdraw Application
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

            {filteredApplications && filteredApplications.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-lg font-medium">No applications</p>
                  <p className="text-sm text-muted-foreground">
                    No applications matched the selected filters.
                  </p>
                  <Button className="mt-4" onClick={() => setFilter("all")}>
                    View all applications
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </Tabs>
      </section>
    </main>
  );
}
