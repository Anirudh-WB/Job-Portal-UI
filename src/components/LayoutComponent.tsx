// LayoutComponent.tsx
import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import AppbarComponent from "../components/AppbarComponent";
import SidebarComponent from "../components/SidebarComponent";
import "../App.css";
interface LayoutProps {
  children: ReactNode;
}

const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      className="container"
      style={{ backgroundColor: "rgb(238, 242, 246)" }}
    >
      <AppbarComponent />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        {/* <SidebarComponent /> */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </div>
  );
};

export default LayoutComponent;
