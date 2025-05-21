"use client";

import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import { DataTableRowActions } from "@/components/common/table/data-table-row-actions";
import { commonStatusTableDefinitions } from "@/definitions/common.definition";
import { StatusEnum } from "@/enums/common.enum";
import { IEmployee } from "@/providers/http/employees/interface";

// Pass `handleUpdate` and `handleDelete` as props to columns
export const columns = ({
  handleUpdate,
  handleDelete,
}: {
  handleUpdate: (uuid: string) => void;
  handleDelete: (uuid: string) => void;
}): ColumnDef<IEmployee>[] => [
  {
    accessorKey: "identification",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Identification"} />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium">{row.getValue("identification")}</div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Email"} />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Name"} />
    ),
  },
  {
    accessorKey: "password",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Password"} />
    ),
  },
  {
    accessorKey: "monthly_salary",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Desired Salary"} />
    ),
  },
  {
    accessorKey: "entry_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Entry Date"} />
    ),
  },
  {
    accessorKey: "jobPosition.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Position"} />
    ),
  },
  {
    accessorKey: "department.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Department"} />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Status"} />
    ),
    cell: ({ row }) => {
      const status = commonStatusTableDefinitions.find(
        (status) => status.value === row.getValue("status")
      );
      if (!status) {
        return null;
      }
      return (
        <div
          className={clsx("flex w-[100px] items-center", {
            "text-red-500": status.value === StatusEnum.INACTIVE,
            "text-green-500": status.value === StatusEnum.ACTIVE,
          })}
        >
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onEdit={handleUpdate}
        onDelete={handleDelete}
      />
    ),
  },
];
