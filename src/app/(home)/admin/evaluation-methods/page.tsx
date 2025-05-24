"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import {
  useGetAllEvaluationMethod,
  useGetOneEvaluationMethod,
} from "@/hooks/api/evaluation-method.hook";
import {
  useCreateEvaluationMethod,
  useDeleteEvaluationMethod,
  useUpdateEvaluationMethod,
} from "@/mutations/api/evaluation-methods";
import {
  ICreateEvaluationMethod,
  IUpdateEvaluationMethod,
} from "@/providers/http/evaluation-methods/interface";
import {
  createEvaluationMethodFormSchema,
  updateEvaluationMethodFormSchema,
} from "@/schema/evaluation-method.schema";
import { clearForm, fillFormInput } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";

export default function EvaluationMethod() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUuid] = useState<string | null>(null);
  const [evaluationMethodFields, setEvaluationMethodFields] = useState<
    IFormField[]
  >([{ name: "name", label: "Name", type: "text" }]);

  const form = useForm<ICreateEvaluationMethod | IUpdateEvaluationMethod>({
    resolver: zodResolver(
      isEditable
        ? updateEvaluationMethodFormSchema
        : createEvaluationMethodFormSchema
    ),
    defaultValues: {
      name: "",
    },
  });

  const { data: evaluationMethods, isLoading: isLoadingEvaluationMethods } =
    useGetAllEvaluationMethod();
  const { data: evaluationMethod } = useGetOneEvaluationMethod(uuid || "");

  const { mutate: createEvaluationMethod } = useCreateEvaluationMethod(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUuid);
  });

  const { mutate: updateEvaluationMethod } = useUpdateEvaluationMethod(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUuid);
  });

  const { mutate: deleteEvaluationMethod } = useDeleteEvaluationMethod(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUuid);
  });

  useEffect(() => {
    if (!evaluationMethod) return;

    if (isModalOpen && isEditable) {
      fillFormInput(form, [{ property: "name", value: evaluationMethod.name }]);
    }

    if (!isModalOpen || !isEditable) {
      clearForm(form, true, setIsModalOpen, setIsEditable, setUuid);
    }
  }, [evaluationMethod, isModalOpen, isEditable]);

  const handleDelete = (uuid: string) => {
    deleteEvaluationMethod(uuid);
  };

  const modifyEvaluationMethod = (data: IUpdateEvaluationMethod) => {
    if (!uuid) return;
    updateEvaluationMethod({ uuid, data });
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUuid(uuid);
  };

  const handleSubmit = (
    data: ICreateEvaluationMethod | IUpdateEvaluationMethod
  ) => {
    if (uuid) {
      modifyEvaluationMethod(data);
    } else {
      createEvaluationMethod(data);
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
        data={evaluationMethods || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<ICreateEvaluationMethod | IUpdateEvaluationMethod>
        isEditable={isEditable}
        entityName="Evaluation Method"
        fields={evaluationMethodFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
