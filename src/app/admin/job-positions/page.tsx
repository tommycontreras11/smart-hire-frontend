"use client";

import { CreateUpdateForm, IFormField } from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import {
  JobPositionContractTypeEnum,
  JobPositionRiskLevelEnum,
} from "@/enums/job-position.enum";
import { useGetAllCountry } from "@/hooks/api/country.hook";
import {
  useGetAllJobPosition,
  useGetOneJobPosition,
} from "@/hooks/api/job-position.hook";
import { useGetAllLanguage } from "@/hooks/api/language.hook";
import { useGetAllRecruiter } from "@/hooks/api/recruiter.hook";
import {
  useCreateJobPosition,
  useDeleteJobPosition,
  useUpdateJobPosition,
} from "@/mutations/api/job-positions";
import {
  ICreateJobPosition,
  IUpdateJobPosition,
} from "@/providers/http/job-positions/interface";
import { jobPositionCreateFormSchema, jobPositionUpdateFormSchema } from "@/schema/job-position.schema";
import { clearForm, fillFormInput } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";

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
      name: "risk_level",
      label: "Risk Level",
      type: "select",
      options: Object.values(JobPositionRiskLevelEnum).map((level) => ({
        label: level,
        value: level,
      })),
    },
    {
      name: "contract_type",
      label: "Contract Type",
      type: "select",
      options: Object.values(JobPositionContractTypeEnum).map((level) => ({
        label: level,
        value: level,
      })),
    },
  ]);

  const form = useForm<ICreateJobPosition | IUpdateJobPosition>({
    resolver: zodResolver(
      isEditable ? jobPositionUpdateFormSchema : jobPositionCreateFormSchema
    ),
    defaultValues: {
      name: "",
      description: "",
      minimum_salary: "0",
      maximum_salary: "0",
      risk_level: "",
      contract_type: "",
      countryUUID: "",
      languageUUID: "",
      recruiterUUID: "",
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

  const { mutate: createJobPosition } = useCreateJobPosition(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

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
      !jobPositions ||
      !countries ||
      !languages ||
      !recruiters
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
  }, [isLoadingCountries, isLoadingLanguages, isLoadingRecruiters]);

  useEffect(() => {
    if (!jobPosition) return;

    if (isEditable && isModalOpen) {
      fillFormInput(form, [
        { property: "name", value: jobPosition.name },
        { property: "description", value: jobPosition.description },
        { property: "minimum_salary", value: jobPosition.minimum_salary.toString() },
        { property: "maximum_salary", value: jobPosition.maximum_salary.toString() },
        { property: "risk_level", value: jobPosition.risk_level },
        { property: "contract_type", value: jobPosition.contract_type },
        { property: "countryUUID", value: jobPosition.country.uuid },
        { property: "languageUUID", value: jobPosition.language.uuid },
        { property: "recruiterUUID", value: jobPosition.recruiter.uuid },
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
    } else {
      console.log(data);
      createJobPosition(data as ICreateJobPosition);
    }
  };

  return (
    <div className="mx-auto w-full overflow-x-auto">
      <button
        className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Create
      </button>
      <DataTable
        data={jobPositions || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<ICreateJobPosition | IUpdateJobPosition>
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
