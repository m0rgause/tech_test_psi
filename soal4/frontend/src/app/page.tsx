import UserTable from "@/components/UserTable";
import { ConfigProvider } from "antd";

export default function Home() {
  return (
    <ConfigProvider>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
        <UserTable />
      </div>
    </ConfigProvider>
  );
}
