"use client";

import {
  CreateUpdateForm,
  IFormField,
} from "@/components/common/modal/create-update";
import DataTable from "@/components/common/table/data-table";
import { useGetAllDepartment } from "@/hooks/api/department.hook";
import {
  useGetAllEmployee,
  useGetOneEmployee,
} from "@/hooks/api/employee.hook";
import { useGetAllJobPosition } from "@/hooks/api/job-position.hook";
import {
  useDeleteEmployee,
  useUpdateEmployee,
} from "@/mutations/api/employees";
import { IUpdateEmployee } from "@/providers/http/employees/interface";
import { updateEmployeeFormSchema } from "@/schema/employee.schema";
import { clearForm, fillFormInput } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { columns } from "./table/column";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";

export default function Employee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [uuid, setUUID] = useState<string | null>("");
  const [employeeFields, setEmployeeFields] = useState<IFormField[]>([
    { name: "identification", label: "Identification", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "name", label: "Name", type: "text" },
    { name: "password", label: "Password", type: "password" },
    { name: "monthly_salary", label: "Monthly Salary", type: "number" },
    { name: "entry_date", label: "Entry Date", type: "date" },
  ]);

  const form = useForm<IUpdateEmployee>({
    resolver: zodResolver(updateEmployeeFormSchema),
    defaultValues: {
      identification: "",
      email: "",
      name: "",
      password: "",
      monthly_salary: "",
      entry_date: new Date(),
      departmentUUID: "",
      positionTypeUUID: "",
    },
  });

  const { data: employees } = useGetAllEmployee();
  const { data: employee } = useGetOneEmployee(uuid || "");

  const { data: departments, isLoading: isLoadingDepartments } =
    useGetAllDepartment();
  const { data: jobPositions, isLoading: isLoadingJobPositions } =
    useGetAllJobPosition();

  const { mutate: updateEmployee } = useUpdateEmployee(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  const { mutate: deleteEmployee } = useDeleteEmployee(() => {
    clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
  });

  useEffect(() => {
    if (
      isLoadingDepartments ||
      isLoadingJobPositions ||
      !departments ||
      !jobPositions
    )
      return;
    setEmployeeFields((prev) => {
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

    setEmployeeFields((prev) => {
      if (!prev.find((field) => field.name === "positionTypeUUID")) {
        return [
          ...prev,
          {
            name: "positionTypeUUID",
            label: "Job Position",
            type: "select",
            options: jobPositions.map((jobPosition) => ({
              label: jobPosition.name,
              value: jobPosition.uuid,
            })),
          },
        ];
      }
      return prev;
    });
  }, [isLoadingDepartments, isLoadingJobPositions]);

  useEffect(() => {
    if (!employee) return;

    if (isEditable && isModalOpen) {
      fillFormInput(form, [
        { property: "identification", value: employee.identification },
        { property: "email", value: employee.email },
        { property: "name", value: employee.name },
        { property: "password", value: employee.password },
        { property: "monthly_salary", value: employee.monthly_salary.toString() },
        { property: "entry_date", value: new Date(employee.entry_date) },
        {
          property: "departmentUUID",
          value: employee.department.uuid,
        },
        {
          property: "positionTypeUUID",
          value: employee.positionType.uuid,
        },
      ]);
    }

    if (!isEditable || !isModalOpen) {
      clearForm(form, true, setIsModalOpen, setIsEditable, setUUID);
    }
  }, [employee, isEditable, isModalOpen]);

  const handleDelete = (uuid: string) => {
    deleteEmployee(uuid);
  };

  const modifyEmployee = (data: IUpdateEmployee) => {
    if (!uuid) return;
    updateEmployee({ uuid, data });
  };

  const handleUpdate = (uuid: string) => {
    setIsEditable(true);
    setIsModalOpen(true);
    setUUID(uuid);
  };

  const handleSubmit = (data: Partial<IUpdateEmployee>) => {
    if (uuid) modifyEmployee(data as IUpdateEmployee);
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
        data={employees || []}
        columns={columns({ handleUpdate, handleDelete })}
        definitions={commonStatusTableDefinitions}
      />

      <CreateUpdateForm<IUpdateEmployee>
        title={`${isEditable ? 'Update' : 'Create'} Employee`}
        fields={employeeFields}
        form={form}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
