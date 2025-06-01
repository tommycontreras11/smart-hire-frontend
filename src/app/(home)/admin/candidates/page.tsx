"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import {
  useGetAllCandidate,
  useGetOneCandidate,
} from "@/hooks/api/candidate.hook";
import { useGetAllDepartment } from "@/hooks/api/department.hook";
import { useGetAllPositionType } from "@/hooks/api/position-type";
import {
  useCreateCandidate,
  useDeleteCandidate,
  useUpdateCandidate,
} from "@/mutations/api/candidates";
import {
  ICreateCandidate,
  IUpdateCandidate,
} from "@/providers/http/candidates/interface";
import {
  updateCandidateFormSchema,
  createCandidateFormSchema,
} from "@/schema/candidate.schema";
import { clearForm, fillFormInput } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";

export default function Candidate() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<string | null>("");
  const [candidateFields, setCandidateFields] = useState<IFormField[]>([
    { name: "identification", label: "Identification", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "name", label: "Name", type: "text" },
    { name: "password", label: "Password", type: "password" },
    { name: "desired_salary", label: "Desired Salary", type: "number" },
  ]);

  const form = useForm<ICreateCandidate | IUpdateCandidate>({
    resolver: zodResolver(
      isEditable ? updateCandidateFormSchema : createCandidateFormSchema
    ),
    defaultValues: {
      identification: "",
      email: "",
      name: "",
      password: "",
      desired_salary: "0",
    },
  });

  const { data: candidates } = useGetAllCandidate();
  const { data: candidate } = useGetOneCandidate(uuid || "");

  const { data: positionTypes, isLoading: isLoadingPositionTypes } =
    useGetAllPositionType();
  const { data: departments, isLoading: isLoadingDepartments } =
    useGetAllDepartment();

  const { mutate: createCandidate } = useCreateCandidate(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  const { mutate: updateCandidate } = useUpdateCandidate(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  const { mutate: deleteCandidate } = useDeleteCandidate(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (
      isLoadingDepartments ||
      isLoadingPositionTypes ||
      !departments ||
      !positionTypes
    )
      return;

    setCandidateFields((prev) => {
      if (!prev.find((field) => field.name === "positionUUID")) {
        return [
          ...prev,
          {
            name: "positionUUID",
            label: "Desired Position",
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

    setCandidateFields((prev) => {
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
  }, [isLoadingPositionTypes, isLoadingDepartments]);

  useEffect(() => {
    if (!candidate) return;

    if (isEditable && isModalOpen) {
      fillFormInput(form, [
        {
          property: "identification",
          value: candidate.identification,
        },
        {
          property: "email",
          value: candidate.email,
        },
        {
          property: "name",
          value: candidate.name,
        },
        {
          property: "password",
          value: candidate.password,
        },
        {
          property: "desired_salary",
          value: candidate.desired_salary.toString(),
        },
        {
          property: "positionUUID",
          value: candidate.desiredPosition.uuid,
        },
        {
          property: "departmentUUID",
          value: candidate.department.uuid,
        },
      ]);
    }

    if (!isEditable || !isModalOpen) {
      clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [candidate, isEditable, isModalOpen]);

  const handleDelete = (uuid: string) => {
    deleteCandidate(uuid);
  };

  const modifyCandidate = (data: IUpdateCandidate) => {
    if (!uuid) return;

    updateCandidate({ uuid, data });
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const handleSubmit = (data: ICreateCandidate | IUpdateCandidate) => {
    if (uuid) {
      modifyCandidate(data);
    } else {
      createCandidate(data as ICreateCandidate);
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
        data={candidates || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<ICreateCandidate | IUpdateCandidate>
        isEditable={isEditable}
        entityName="Candidate"
        fields={candidateFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
