"use client";

import {
    CreateUpdateForm,
    IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { LevelCompetencyEnum } from "@/enums/competency.enum";
import {
    useGetAllCompetency,
    useGetOneCompetency,
} from "@/hooks/api/competency.hook";
import { useGetAllEvaluationMethod } from "@/hooks/api/evaluation-method.hook";
import { useGetAllPositionType } from "@/hooks/api/position-type";
import {
    useCreateCompetency,
    useDeleteCompetency,
    useUpdateCompetency,
} from "@/mutations/api/competencies";
import {
    ICreateCompetency,
    IUpdateCompetency,
} from "@/providers/http/competencies/interface";
import {
    createCompetencyFormSchema,
    updateCompetencyFormSchema,
} from "@/schema/competency.schema";
import { clearForm, fillFormInput } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";
import { useGetAllCategory } from "@/hooks/api/category.hook";

export default function Competency() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<string | null>("");
  const [competencyFields, setCompetencyFields] = useState<IFormField[]>([
    { name: "name", label: "Name", type: "text" },
    {
      name: "level",
      label: "Level",
      type: "select",
      options: Object.values(LevelCompetencyEnum).map((level) => ({
        label: level,
        value: level,
      })),
    },
  ]);

  const form = useForm<ICreateCompetency | IUpdateCompetency>({
    resolver: zodResolver(
      isEditable ? updateCompetencyFormSchema : createCompetencyFormSchema
    ),
    defaultValues: {
      name: "",
      level: "",
      categoryUUID: "",
    },
  });

  const { data: competencies } =
    useGetAllCompetency();
  const { data: competency } = useGetOneCompetency(uuid || "");

  const { data: categories, isLoading: isLoadingCategories } =
    useGetAllCategory();
  const { data: evaluationMethods, isLoading: isLoadingEvaluationMethods } =
    useGetAllEvaluationMethod();
  const { data: positionTypes, isLoading: isLoadingPositionTypes } =
    useGetAllPositionType();

  const { mutate: createCompetency } = useCreateCompetency(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  const { mutate: updateCompetency } = useUpdateCompetency(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  const { mutate: deleteCompetency } = useDeleteCompetency(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (
      isLoadingCategories ||
      isLoadingEvaluationMethods ||
      isLoadingPositionTypes ||
      !categories ||
      !evaluationMethods ||
      !positionTypes
    )
      return;

    setCompetencyFields((prev) => {
      if (!prev.find((field) => field.name === "categoryUUID")) {
        return [
          ...prev,
          {
            name: "categoryUUID",
            label: "Category",
            type: "select",
            options: categories.map((category) => ({
              label: category.name,
              value: category.uuid,
            })),
          },
        ];
      }
      return prev;
    });

    setCompetencyFields((prev) => {
      if (!prev.find((field) => field.name === "evaluationMethodUUIDs")) {
        return [
          ...prev,
          {
            name: "evaluationMethodUUIDs",
            label: "Evaluation Methods",
            type: "multi-select",
            options: evaluationMethods.map((evaluationMethod) => ({
              label: evaluationMethod.name,
              value: evaluationMethod.uuid,
            })),
          },
        ];
      }
      return prev;
    });

    setCompetencyFields((prev) => {
      if (!prev.find((field) => field.name === "positionTypeUUIDs")) {
        return [
          ...prev,
          {
            name: "positionTypeUUIDs",
            label: "Position Types",
            type: "multi-select",
            options: positionTypes.map((positionType) => ({
              label: positionType.name,
              value: positionType.uuid,
            })),
          },
        ];
      }
      return prev;
    });
  }, [
    isLoadingCategories,
    isLoadingEvaluationMethods,
    isLoadingPositionTypes,
  ]);

  useEffect(() => {
    if (!competency) return;

    if (isModalOpen && isEditable) {
      fillFormInput(form, [
        { property: "name", value: competency.name },
        { property: "level", value: competency.level },
        { property: "categoryUUID", value: competency.category.uuid },
        {
          property: "evaluationMethodUUIDs",
          value: competency.evaluationMethods.map(
            (evaluationMethod) => evaluationMethod.uuid
          ),
        },
        {
          property: "positionTypeUUIDs",
          value: competency.positionTypes.map(
            (positionType) => positionType.uuid
          ),
        },
      ]);
    }

    if (!isModalOpen || !isEditable) {
      clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [competency, isModalOpen, isEditable]);

  const handleDelete = (uuid: string) => {
    deleteCompetency(uuid);
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setUUID(uuid);
    setIsModalOpen(true);
  };

  const modifyCompetency = (data: IUpdateCompetency) => {
    if (!uuid) return;
    updateCompetency({ uuid, data });
  };

  const handleSubmit = (data: ICreateCompetency | IUpdateCompetency) => {
    if (uuid) {
      modifyCompetency(data);
    } else {
      createCompetency(data as ICreateCompetency);
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
        data={competencies || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<ICreateCompetency | IUpdateCompetency>
        isEditable={isEditable}
        entityName="Competency"
        fields={competencyFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
