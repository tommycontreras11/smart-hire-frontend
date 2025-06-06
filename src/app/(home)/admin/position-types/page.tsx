"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import {
  useGetAllPositionType,
  useGetOnePositionType,
} from "@/hooks/api/position-type";
import {
  useCreatePositionType,
  useDeletePositionType,
  useUpdatePositionType,
} from "@/mutations/api/position-types";
import {
  ICreatePositionType,
  IUpdatePositionType,
} from "@/providers/http/position-types/interface";
import {
  createPositionTypeFormSchema,
  updatePositionTypeFormSchema,
} from "@/schema/position-type.schema";
import { clearForm, fillFormInput } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { useGetAllDepartment } from "@/hooks/api/department.hook";

export default function PositionType() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<string | null>("");
  const [positionTypeFields, setPositionTypeFields] = useState<IFormField[]>([
    { name: "name", label: "Name", type: "text" },
  ]);

  const form = useForm<ICreatePositionType | IUpdatePositionType>({
    resolver: zodResolver(
      isEditable ? updatePositionTypeFormSchema : createPositionTypeFormSchema
    ),
    defaultValues: {
      name: "",
      departmentUUID: "",
    },
  });

  const { data: departments, isLoading: isLoadingDepartments } =
    useGetAllDepartment();
  const { data: positionTypes } = useGetAllPositionType();
  const { data: positionType } = useGetOnePositionType(uuid || "");

  const { mutate: createPositionType } = useCreatePositionType(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  const { mutate: updatePositionType } = useUpdatePositionType(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  const { mutate: deletePositionType } = useDeletePositionType(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (!isLoadingDepartments || !departments) return;

    setPositionTypeFields((prev) => {
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
  }, [departments, isLoadingDepartments]);

  useEffect(() => {
    if (!positionType) return;

    if (isEditable && isModalOpen) {
      fillFormInput(form, [
        { property: "name", value: positionType.name },
        { property: "departmentUUID", value: positionType.department.uuid },
      ]);
    }

    if (!isEditable || !isModalOpen)
      clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  }, [positionType, isEditable, isModalOpen]);

  const handleDelete = (uuid: string) => {
    deletePositionType(uuid);
  };

  const modifyPositionType = (data: IUpdatePositionType) => {
    if (!uuid) return;

    updatePositionType({ uuid, data });
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const handleSubmit = (data: ICreatePositionType | IUpdatePositionType) => {
    if (uuid) {
      modifyPositionType(data);
    } else {
      createPositionType(data as ICreatePositionType);
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
        data={positionTypes || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<ICreatePositionType | IUpdatePositionType>
        title={`${isEditable ? "Update" : "Create"} Position Type`}
        fields={positionTypeFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
