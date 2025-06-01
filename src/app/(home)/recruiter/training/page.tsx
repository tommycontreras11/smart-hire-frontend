"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import {
  useGetAllTraining,
  useGetOneTraining,
} from "@/hooks/api/training.hook";
import {
  useCreateTraining,
  useDeleteTraining,
  useUpdateTraining,
} from "@/mutations/api/training";
import {
  ICreateTraining,
  IUpdateTraining,
} from "@/providers/http/training/interface";
import {
  createTrainingFormSchema,
  updateTrainingFormSchema,
} from "@/schema/training.schema";
import { clearForm, fillFormInput } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";
import { TrainingLevelEnum } from "@/enums/training.enum";
import { useGetAllInstitution } from "@/hooks/api/institution.hook";

export default function Training() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<string | null>("");

  const [trainingFields, setTrainingFields] = useState<IFormField[]>([
    { name: "name", label: "Name", type: "text" },
    { name: "description", label: "Description", type: "text" },
    {
      name: "level",
      label: "Level",
      type: "select",
      options: Object.values(TrainingLevelEnum).map((level) => ({
        label: level,
        value: level,
      })),
    },
    { name: "date_from", label: "Date From", type: "date" },
    { name: "date_to", label: "Date To", type: "date" },
  ]);

  const form = useForm<ICreateTraining | IUpdateTraining>({
    resolver: zodResolver(
      isEditable ? updateTrainingFormSchema : createTrainingFormSchema
    ),
    defaultValues: {
      name: "",
      description: "",
      level: "",
      date_from: new Date(),
      date_to: new Date(),
      institutionUUID: "",
    },
  });

  const { data: trainings } = useGetAllTraining();
  const { data: training } = useGetOneTraining(uuid || "");

  const { data: institutions, isLoading: isLoadingInstitution } =
    useGetAllInstitution();

  const { mutate: createTraining } = useCreateTraining(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  const { mutate: updateTraining } = useUpdateTraining(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  const { mutate: deleteTraining } = useDeleteTraining(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (isLoadingInstitution || !institutions) return;

    setTrainingFields((prev) => {
      if (!prev.find((item) => item.name == "institutionUUID")) {
        return [
          ...prev,
          {
            name: "institutionUUID",
            label: "Institution",
            type: "select",
            options: institutions.map((institution) => ({
              label: institution.name,
              value: institution.uuid,
            })),
          },
        ];
      }
      return prev;
    });
  }, [isLoadingInstitution]);

  useEffect(() => {
    if (!training) return;

    if (isEditable && isModalOpen) {
      fillFormInput(form, [
        { property: "name", value: training.name }
      ]);
      fillFormInput(form, [
        { property: "description", value: training.description }
      ]);
      fillFormInput(form, [
        { property: "level", value: training.level }
      ]);
      fillFormInput(form, [
        { property: "date_from", value: new Date(training.date_from) }
      ]);
      fillFormInput(form, [
        { property: "date_to", value: new Date(training.date_to) }
      ]);
      fillFormInput(form, [
        { property: "institutionUUID", value: training.institution.uuid }
    ]);
    }

    if (!isEditable || !isModalOpen) {
      clearForm(form, false, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [training, isEditable, isModalOpen]);

  const handleDelete = (uuid: string) => {
    deleteTraining(uuid);
  };

  const modifyTraining = (data: IUpdateTraining) => {
    if (!uuid) return;

    updateTraining({ uuid, data });
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const handleSubmit = (data: ICreateTraining | IUpdateTraining) => {
    if (uuid) {
      modifyTraining(data);
    } else {
      createTraining(data as ICreateTraining);
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
        data={trainings || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<ICreateTraining | IUpdateTraining>
        title={`${isEditable ? 'Update' : 'Create'} Training`}
        fields={trainingFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
