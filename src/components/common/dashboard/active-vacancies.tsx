import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JobPositionContractTypeEnum } from "@/enums/job-position.enum";
import { useGetAllCompetency } from "@/hooks/api/competency.hook";
import { useGetAllCountry } from "@/hooks/api/country.hook";
import { useGetAllDepartment } from "@/hooks/api/department.hook";
import { useGetAllLanguage } from "@/hooks/api/language.hook";
import { useGetAllPositionType } from "@/hooks/api/position-type";
import { useGetAllRecruiter } from "@/hooks/api/recruiter.hook";
import { useCreateJobPosition } from "@/mutations/api/job-positions";
import { ICreateJobPosition } from "@/providers/http/job-positions/interface";
import {
  IActiveVacancy,
  IRecruiterDashboard,
} from "@/providers/http/recruiters/interface";
import { createJobPositionFormSchema } from "@/schema/job-position.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { CreateUpdateForm, IFormField } from "../modal/create-update";
import { useAuth } from "@/contexts/auth-context";
import { UserRoleEnum } from "@/enums/common.enum";

interface Vacancy {
  id: string;
  position: string;
  department: string;
  location: string;
  applicants: number;
  postDate: string;
  deadline: string;
}

const vacancies: Vacancy[] = [
  {
    id: "1",
    position: "Desarrollador Full Stack",
    department: "Tecnología",
    location: "Remoto",
    applicants: 24,
    postDate: "2025-06-01",
    deadline: "2025-06-30",
  },
  {
    id: "2",
    position: "Diseñador UX/UI",
    department: "Diseño",
    location: "Ciudad de México",
    applicants: 18,
    postDate: "2025-06-05",
    deadline: "2025-07-05",
  },
  {
    id: "3",
    position: "Gerente de Marketing",
    department: "Marketing",
    location: "Ciudad de México",
    applicants: 12,
    postDate: "2025-06-10",
    deadline: "2025-07-10",
  },
];

function getDaysRemaining(deadline: string): number {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const difference = deadlineDate.getTime() - today.getTime();
  return Math.ceil(difference / (1000 * 3600 * 24));
}

export function ActiveVacancies({
  vacancies,
  refetchDashboard,
}: {
  vacancies: IActiveVacancy[];
  refetchDashboard: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<IResponse<IRecruiterDashboard>, unknown>>;
}) {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isValidUser = useMemo(() => {
    return user && user.role === UserRoleEnum.RECRUITER;
  }, [user]);

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
  ]);

  const form = useForm<ICreateJobPosition>({
    resolver: zodResolver(createJobPositionFormSchema),
    defaultValues: {
      name: "",
      description: "",
      minimum_salary: "0",
      maximum_salary: "0",
      contract_type: "",
      due_date: new Date(),
      countryUUID: "",
      languageUUID: "",
      departmentUUID: "",
      positionTypeUUID: "",
      competencyUUIDs: [],
    },
  });

  const { data: countries, isLoading: isLoadingCountries } = useGetAllCountry();
  const { data: languages, isLoading: isLoadingLanguages } =
    useGetAllLanguage();
  const { data: recruiters, isLoading: isLoadingRecruiters } =
    useGetAllRecruiter();
  const { data: departments, isLoading: isLoadingDepartments } =
    useGetAllDepartment();
  const { data: positionTypes, isLoading: isLoadingPositionTypes } =
    useGetAllPositionType();
  const { data: competencies, isLoading: isLoadingCompetencies } =
    useGetAllCompetency();

  const { mutate: createJobPosition } = useCreateJobPosition(() => {
    refetchDashboard();
    setIsModalOpen(false);
    form.reset();
  });

  useEffect(() => {
    if (
      isLoadingCountries ||
      isLoadingLanguages ||
      isLoadingRecruiters ||
      isLoadingCompetencies ||
      isLoadingDepartments ||
      isLoadingPositionTypes ||
      !countries ||
      !languages ||
      !recruiters ||
      !departments ||
      !positionTypes ||
      !competencies
    )
      return;

    setJobPositionFields((prev) => {
      if (!prev.find((field) => field.name === "countryUUID")) {
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
        ];
      }
      return prev;
    });

    setJobPositionFields((prev) => {
      if (!prev.find((field) => field.name === "languageUUID")) {
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
        ];
      }
      return prev;
    });

    setJobPositionFields((prev) => {
      if (!prev.find((field) => field.name === "departmentUUID")) {
        return [
          ...prev,
          {
            name: "departmentUUID",
            label: "Department",
            type: "select",
            options: departments.map((department) => ({
              label: department.name,
              value: department.uuid,
            })),
          },
        ];
      }
      return prev;
    });

    setJobPositionFields((prev) => {
      if (!prev.find((field) => field.name === "positionTypeUUID")) {
        return [
          ...prev,
          {
            name: "positionTypeUUID",
            label: "Position Type",
            type: "select",
            options: positionTypes.map((positionType) => ({
              label: positionType.name,
              value: positionType.uuid,
            })),
          },
        ];
      }
      return prev;
    });

    setJobPositionFields((prev) => {
      if (!prev.find((field) => field.name === "competencyUUIDs")) {
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
        ];
      }
      return prev;
    });
  }, [
    isLoadingCountries,
    isLoadingLanguages,
    isLoadingRecruiters,
    isLoadingDepartments,
    isLoadingPositionTypes,
    isLoadingCompetencies,
  ]);

  const handleCreateJobPosition = (data: Partial<ICreateJobPosition>) => {
    if (!isValidUser || !user) return;
    createJobPosition({
      ...data,
      recruiterUUID: user.uuid,
    } as ICreateJobPosition);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Vacantes Activas</CardTitle>
            <CardDescription>Vacantes publicadas actualmente</CardDescription>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsModalOpen(true)}
          >
            Crear Vacante
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vacancies.map((vacancy) => {
              const daysRemaining = getDaysRemaining(
                vacancy.due_date.toString()
              );
              const isUrgent = daysRemaining <= 7;

              return (
                <div
                  key={vacancy.uuid}
                  className="rounded-lg border p-3 text-sm transition-all hover:bg-accent"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{vacancy.name}</div>
                    <div className="flex items-center space-x-1">
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        {vacancy.total_candidates} candidatos
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <span>{vacancy.department}</span>
                      <span className="mx-2">•</span>
                      <span>{vacancy.country}</span>
                    </div>
                    <div
                      className={`${
                        isUrgent ? "text-destructive" : "text-muted-foreground"
                      }`}
                    >
                      {daysRemaining > 0
                        ? `${daysRemaining} días restantes`
                        : "Expirada"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {!isLoadingLanguages &&
        !isLoadingCountries &&
        !isLoadingDepartments &&
        !isLoadingPositionTypes &&
        !isLoadingRecruiters &&
        !isLoadingCompetencies && (
          <CreateUpdateForm<ICreateJobPosition>
            title="Create Job Position"
            fields={jobPositionFields}
            form={form}
            onSubmit={handleCreateJobPosition}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
    </>
  );
}
