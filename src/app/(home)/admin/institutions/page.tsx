"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import {
  useGetAllInstitution,
  useGetOneInstitution,
} from "@/hooks/api/institution.hook";
import {
  useCreateInstitution,
  useDeleteInstitution,
  useUpdateInstitution,
} from "@/mutations/api/institutions";
import {
  ICreateInstitution,
  IUpdateInstitution,
} from "@/providers/http/institutions/interface";
import {
  institutionCreateFormSchema,
  institutionUpdateFormSchema,
} from "@/schema/institution.schema";
import { clearForm, fillFormInput } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";

export default function Institution() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<string | null>("");
  const [institutionFields, setInstitutionFields] = useState<IFormField[]>([
    { name: "name", label: "Name", type: "text" },
  ]);

  const form = useForm<ICreateInstitution | IUpdateInstitution>({
    resolver: zodResolver(
      isEditable ? institutionUpdateFormSchema : institutionCreateFormSchema
    ),
    defaultValues: {
      name: "",
    },
  });

  const { data: institutions } = useGetAllInstitution();
  const { data: institution } = useGetOneInstitution(uuid || "");

  const { mutate: createInstitution } = useCreateInstitution(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  const { mutate: updateInstitution } = useUpdateInstitution(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  const { mutate: deleteInstitution } = useDeleteInstitution(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (!institution) return;

    if (isEditable && isModalOpen) {
      fillFormInput(form, [{ property: "name", value: institution.name }]);
    }

    if (!isEditable || !isModalOpen) {
      clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [institution, isEditable, isModalOpen]);

  const handleDelete = (uuid: string) => {
    deleteInstitution(uuid);
  };

  const modifyInstitution = (data: IUpdateInstitution) => {
    if (!uuid) return;
    updateInstitution({ uuid, data });
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const handleSubmit = (data: ICreateInstitution | IUpdateInstitution) => {
    if (uuid) {
      modifyInstitution(data);
    } else {
      createInstitution(data);
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
        data={institutions || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<ICreateInstitution | IUpdateInstitution>
        isEditable={isEditable}
        entityName="Institution"
        fields={institutionFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
