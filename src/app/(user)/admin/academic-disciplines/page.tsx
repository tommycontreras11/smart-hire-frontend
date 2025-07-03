"use client";

import {
    CreateUpdateForm,
    IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import {
    useGetAllAcademicDiscipline,
    useGetOneAcademicDiscipline,
} from "@/hooks/api/academic-discipline.hook";
import {
    useCreateAcademicDiscipline,
    useDeleteAcademicDiscipline,
    useUpdateAcademicDiscipline,
} from "@/mutations/api/academic-disciplines";
import {
    ICreateAcademicDiscipline,
    IUpdateAcademicDiscipline,
} from "@/providers/http/academic-discipline/interface";
import {
    createAcademicDisciplineFormSchema,
    updateAcademicDisciplineFormSchema,
} from "@/schema/academic-discipline.schema";
import { clearForm, fillFormInput } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";

export default function AcademicDiscipline() {
  const [uuid, setUUID] = useState<string | null>("");
  const [isEditable, setIsEditable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [academicDisciplineFields, setAcademicDisciplineFields] = useState<
    IFormField[]
  >([
    {
      name: "name",
      label: "Name",
      type: "text",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
    },
  ]);
  const form = useForm<ICreateAcademicDiscipline | IUpdateAcademicDiscipline>({
    resolver: zodResolver(
      isEditable
        ? updateAcademicDisciplineFormSchema
        : createAcademicDisciplineFormSchema
    ),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { data: academicDisciplines } = useGetAllAcademicDiscipline();
  const { data: academicDiscipline } = useGetOneAcademicDiscipline(uuid || "");

  const { mutate: createAcademicDiscipline } = useCreateAcademicDiscipline(
    () => {
      clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
    }
  );
  const { mutate: updateAcademicDiscipline } = useUpdateAcademicDiscipline(
    () => {
      clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
    }
  );
  const { mutate: deleteAcademicDiscipline } = useDeleteAcademicDiscipline(
    () => {
      clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
    }
  );

  useEffect(() => {
    if (!academicDiscipline) return;

    if (isEditable && isModalOpen) {
      fillFormInput(form, [
        { property: "name", value: academicDiscipline.name },
        { property: "description", value: academicDiscipline.description ?? "" },
      ]);
    }

    if (!isEditable || !isModalOpen) {
      clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [academicDiscipline, isEditable, isModalOpen]);

  const handleDelete = (uuid: string) => {
    if (!uuid) return;

    deleteAcademicDiscipline(uuid);
  };

  const handleUpdate = (uuid: string) => {
    if (!uuid) return;

    setUUID(uuid);
    setIsEditable(true);
    setIsModalOpen(true);
  };

  const modifyAcademicDiscipline = (data: IUpdateAcademicDiscipline) => {
    if (!uuid) return;

    updateAcademicDiscipline({ uuid, data });
  };

  const handleSubmit = (
    data: ICreateAcademicDiscipline | IUpdateAcademicDiscipline
  ) => {
    if (uuid) {
      modifyAcademicDiscipline(data as IUpdateAcademicDiscipline);
    } else {
      createAcademicDiscipline(data);
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
        data={academicDisciplines || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<ICreateAcademicDiscipline | IUpdateAcademicDiscipline>
        title={`${isEditable ? "Update" : "Create"} Academic Discipline`}
        fields={academicDisciplineFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
