import React, { useEffect, useState } from "react";
import LayoutComponent from "../components/LayoutComponent";
import { getMembersAsync } from "../services/MemberService";
import MemberModel from "../model/MemberModel";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Dayjs } from "dayjs";
import DynamicTable from "../tableComponents/dynamicTable";
import CustomAction from "../tableComponents/customAction";

const MembersPage: React.FC = () => {
  const [members, setMembers] = useState<MemberModel[]>([]);

  useEffect(() => {
    const getMembers = async () => {
      const response = await getMembersAsync();

      console.log(response);

      if (Array.isArray(response.data)) {
        setMembers(response.data);
      } else {
        setMembers([response.data]);
      }
    };
    getMembers();
  }, []);

  interface TableColumn {
    fieldName: string;
    displayName: string;
    cssClass: string;
  }

  const columns: TableColumn[] = [
    {
      fieldName: "id",
      displayName: "ID",
      cssClass: "",
    },
    {
      fieldName: "firstName",
      displayName: "First Name",
      cssClass: "",
    },
    {
      fieldName: "lastName",
      displayName: "Last Name",
      cssClass: "",
    },
    {
        fieldName: "isActive",
        displayName: "Is Active",
        cssClass: "",
      },
      {
        fieldName: "edit",
        displayName: "Edit",
        cssClass: "",
      },
  ];


  function handleEdit(id: string | number) {
    // Implement edit logic
    console.log(`Edit item with ID: ${id}`);
  }
  
  function handleDelete(id: string | number) {
    // Implement delete logic
    console.log(`Delete item with ID: ${id}`);
    alert(id);
  }

  const customActions: CustomAction[] = [
    {
      label: 'Edit',
      callback: (id) => handleEdit(id),
    },
    {
      label: 'Delete',
      callback: (id) => handleDelete(id),
    },
    // Add more custom actions as needed
  ];

  return (
    <LayoutComponent>
        <h1>Members</h1>
      <DynamicTable columns={columns} data={members} customActions={customActions} />
    </LayoutComponent>
  );
};

export default MembersPage;
