"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import {
  useGetAllRecruiter,
  useGetOneRecruiter,
} from "@/hooks/api/recruiter.hook";
import {
  useDeleteRecruiter,
  useUpdateRecruiter,
} from "@/mutations/api/recruiters";
import { IUpdateRecruiter } from "@/providers/http/recruiters/interface";
import { updateRecruiterFormSchema } from "@/schema/recruiter.schema";
import { clearForm, fillFormInput } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";

export default function Recruiter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<string | null>("");
  const [recruiterFields, setRecruiterFields] = useState<IFormField[]>([
    { name: "identification", label: "Identification", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "name", label: "Name", type: "text" },
    { name: "password", label: "Password", type: "password" },
    { name: "institution", label: "Institution", type: "text" },
  ]);

  const form = useForm<IUpdateRecruiter>({
    resolver: zodResolver(updateRecruiterFormSchema),
    defaultValues: {
      identification: "",
      email: "",
      name: "",
      password: "",
      institution: "",
    },
  });

  const { data: recruiters } = useGetAllRecruiter();
  const { data: recruiter } = useGetOneRecruiter(uuid || "");

  const { mutate: updateRecruiter } = useUpdateRecruiter(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  const { mutate: deleteRecruiter } = useDeleteRecruiter(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (!recruiter) return;

    if (isEditable && isModalOpen) {
      fillFormInput(form, [
        { property: "identification", value: recruiter.identification },
        { property: "email", value: recruiter.email },
        { property: "name", value: recruiter.name },
        { property: "password", value: recruiter.password },
        { property: "institution", value: recruiter.institution.name },
      ]);
    }

    if (!isEditable || !isModalOpen) {
      clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [recruiter, isEditable, isModalOpen]);

  const handleDelete = (uuid: string) => {
    deleteRecruiter(uuid);
  };

  const modifyRecruiter = (data: IUpdateRecruiter) => {
    if (!uuid) return;
    updateRecruiter({ uuid, data });
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const handleSubmit = (data: IUpdateRecruiter) => {
    if (uuid) modifyRecruiter(data);
  };

  return (
    <div className="mx-auto w-full overflow-x-auto">
      <DataTable
        data={recruiters || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<IUpdateRecruiter>
        title={`${isEditable ? 'Update' : 'Create'} Recruiter`}
        fields={recruiterFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
