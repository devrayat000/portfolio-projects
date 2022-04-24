import { AppShell, Header } from "@mantine/core";
import { Outlet } from "react-router-dom";

const Shell = () => {
  return (
    <AppShell header={<Header height={60}>hi</Header>}>
      <Outlet />
    </AppShell>
  );
};

export default Shell;
