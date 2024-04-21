import React, { FC, ReactNode, useState } from "react";
import { Navbar, SideBar } from "../components/layout";
import Paper from "@mui/material/Paper";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Navbar open={open} setOpen={setOpen} />
      <h1>Main Layout</h1>
      <SideBar open={open} setOpen={setOpen} />
      <Paper
        elevation={3}
        style={{ padding: "20px", marginTop: "20px", marginRight: "10px" ,marginLeft:'10px'}}
      >
        {children}
      </Paper>
    </div>
  );
};
