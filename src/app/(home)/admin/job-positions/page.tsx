"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { JobPositionContractTypeEnum } from "@/enums/job-position.enum";
import { useGetAllCountry } from "@/hooks/api/country.hook";
import {
  useGetAllJobPosition,
  useGetOneJobPosition,
} from "@/hooks/api/job-position.hook";
import { useGetAllLanguage } from "@/hooks/api/language.hook";
import { useGetAllRecruiter } from "@/hooks/api/recruiter.hook";
import {
  useDeleteJobPosition,
  useUpdateJobPosition,
} from "@/mutations/api/job-positions";
import {
  ICreateJobPosition,
  IUpdateJobPosition,
} from "@/providers/http/job-positions/interface";
import { updateJobPositionFormSchema } from "@/schema/job-position.schema";
import { clearForm, fillFormInput } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";
import { useGetAllCompetency } from "@/hooks/api/competency.hook";
import { useGetAllDepartment } from "@/hooks/api/department.hook";
import { useGetAllPositionType } from "@/hooks/api/position-type";

export default function JobPosition() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<string | null>("");

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

  const form = useForm<IUpdateJobPosition>({
    resolver: zodResolver(updateJobPositionFormSchema),
    defaultValues: {
      name: "",
      description: "",
      minimum_salary: "0",
      maximum_salary: "0",
      contract_type: "",
      due_date: new Date(),
      countryUUID: "",
      languageUUID: "",
      recruiterUUID: "",
      departmentUUID: "",
      positionTypeUUID: "",
      competencyUUIDs: [],
    },
  });

  const { data: jobPositions, isLoading: isLoadingJobPositions } =
    useGetAllJobPosition();
  const { data: jobPosition } = useGetOneJobPosition(uuid || "");
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

  const { mutate: updateJobPosition } = useUpdateJobPosition(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  const { mutate: deleteJobPosition } = useDeleteJobPosition(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (
      isLoadingCountries ||
      isLoadingLanguages ||
      isLoadingRecruiters ||
      isLoadingCompetencies ||
      isLoadingDepartments ||
      isLoadingPositionTypes ||
      !jobPositions ||
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
      if (!prev.find((field) => field.name === "recruiterUUID")) {
        return [
          ...prev,
          {
            name: "recruiterUUID",
            label: "Recruiter",
            type: "select",
            options: recruiters.map((recruiter) => ({
              label: recruiter.name,
              value: recruiter.uuid,
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
    isLoadingCompetencies,
  ]);

  useEffect(() => {
    if (!jobPosition) return;

    if (isEditable && isModalOpen) {
      fillFormInput(form, [
        { property: "name", value: jobPosition.name },
        { property: "description", value: jobPosition.description },
        {
          property: "minimum_salary",
          value: jobPosition.minimum_salary.toString(),
        },
        {
          property: "maximum_salary",
          value: jobPosition.maximum_salary.toString(),
        },
        { property: "contract_type", value: jobPosition.contract_type },
        { property: "due_date", value: jobPosition.due_date },
        { property: "countryUUID", value: jobPosition.country.uuid },
        { property: "languageUUID", value: jobPosition.language.uuid },
        { property: "recruiterUUID", value: jobPosition.recruiter.uuid },
        { property: "departmentUUID", value: jobPosition.department.uuid },
        {
          property: "positionTypeUUID",
          value: jobPosition.positionType.uuid,
        },
        {
          property: "competencyUUIDs",
          value: jobPosition.competencies.map((competency) => competency.uuid),
        },
      ]);
    }

    if (!isEditable || !isModalOpen) {
      clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [jobPosition, isEditable, isModalOpen]);

  const handleDelete = (uuid: string) => {
    deleteJobPosition(uuid);
  };

  const modifyJobPosition = (data: IUpdateJobPosition) => {
    if (!uuid) return;

    updateJobPosition({ uuid, data });
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const handleSubmit = (data: ICreateJobPosition | IUpdateJobPosition) => {
    if (uuid) {
      modifyJobPosition(data);
    }
  };

  return (
    <div className="mx-auto w-full overflow-x-auto">
      <DataTable
        data={jobPositions || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<IUpdateJobPosition>
        isEditable={isEditable}
        entityName="Job Position"
        fields={jobPositionFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
