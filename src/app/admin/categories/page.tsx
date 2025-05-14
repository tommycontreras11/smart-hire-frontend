"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import {
  useGetAllCategory,
  useGetOneCategory,
} from "@/hooks/api/category.hook";
import {
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@/mutations/api/categories";
import {
  ICreateCategory,
  IUpdateCategory,
} from "@/providers/http/categories/interface";
import {
  categoryCreateFormSchema,
  categoryUpdateFormSchema,
} from "@/schema/category.schema";
import { clearForm, fillFormInput } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";

export default function Category() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<string | null>("");
  const [categoryFields, setCategoryFields] = useState<IFormField[]>([
    { name: "name", label: "Name", type: "text" },
  ]);

  const form = useForm<ICreateCategory | IUpdateCategory>({
    resolver: zodResolver(
      isEditable ? categoryUpdateFormSchema : categoryCreateFormSchema
    ),
    defaultValues: {
      name: "",
    },
  });

  const { data: categories } = useGetAllCategory();
  const { data: category } = useGetOneCategory(uuid || "");

  const { mutate: createCategory } = useCreateCategory(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  const { mutate: updateCategory } = useUpdateCategory(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  const { mutate: deleteCategory } = useDeleteCategory(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (!category) return;

    if (isEditable && isModalOpen) {
      fillFormInput(form, [{ property: "name", value: category.name }]);
    }

    /* If the form is not editable or the modal is not open, 
     clear the form because the values are no longer needed */
    if (!isEditable || !isModalOpen) {
      clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [category, isModalOpen, isEditable]);

  const handleDelete = (uuid: string) => {
    deleteCategory(uuid);
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const modifyCategory = (category: IUpdateCategory) => {
    if (!uuid) return;
    updateCategory({ uuid, data: category });
  };

  const handleSubmit = (data: ICreateCategory | IUpdateCategory) => {
    if (uuid) {
      modifyCategory(data);
    } else {
      createCategory(data);
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
        data={categories || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<ICreateCategory | IUpdateCategory>
        isEditable={isEditable}
        entityName="Category"
        fields={categoryFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
