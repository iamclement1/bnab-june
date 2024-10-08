import { Metadata } from "next";
import { UserChart } from "@/components/back-office/dashboard/users/userChart";
import { UserTable } from "@/components/back-office/dashboard/users/userTable";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin Dashboard.",
};

export default function Page() {
  return (
    <div className="overflow-x-hidden flex-nowrap whitespace-nowrap flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <UserChart />
        <UserTable />
      </div>
    </div>
  );
}
