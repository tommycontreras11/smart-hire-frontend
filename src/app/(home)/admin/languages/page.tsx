"use client";

import { CreateUpdateForm, IFormField } from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import {
  useGetAllLanguage,
  useGetOneLanguage,
} from "@/hooks/api/language.hook";
import {
  useCreateLanguage,
  useDeleteLanguage,
  useUpdateLanguage,
} from "@/mutations/api/languages";
import {
  ICreateLanguage,
  IUpdateLanguage,
} from "@/providers/http/languages/interface";
import {
  createLanguageFormSchema,
  updateLanguageFormSchema,
} from "@/schema/language.schema";
import { clearForm, fillFormInput } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";

export default function Language() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<string | null>("");

  const [languageFields, setLanguageFields] = useState<IFormField[]>([
    { name: "name", label: "Name", type: "text" },
  ]);

  const form = useForm<ICreateLanguage | IUpdateLanguage>({
    resolver: zodResolver(
      isEditable ? updateLanguageFormSchema : createLanguageFormSchema
    ),
    defaultValues: {
      name: "",
    },
  });

  const { data: languages } = useGetAllLanguage();
  const { data: language } = useGetOneLanguage(uuid || "");

  const { mutate: createLanguage } = useCreateLanguage(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  const { mutate: updateLanguage } = useUpdateLanguage(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  const { mutate: deleteLanguage } = useDeleteLanguage(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (!language) return;

    if (isEditable && isModalOpen) {
      fillFormInput(form, [{ property: "name", value: language.name }]);
    }

    if (!isEditable || !isModalOpen) {
      clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [language, isEditable, isModalOpen]);

  const handleDelete = (uuid: string) => {
    deleteLanguage(uuid);
  };

  const modifyLanguage = (data: IUpdateLanguage) => {
    if (!uuid) return;

    updateLanguage({ uuid: uuid, data: data });
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const handleSubmit = (data: ICreateLanguage | IUpdateLanguage) => {
    if (isEditable) {
      modifyLanguage(data);
    } else {
      createLanguage(data);
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
        data={languages || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<ICreateLanguage | IUpdateLanguage>
        isEditable={isEditable}
        entityName="Language"
        fields={languageFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
