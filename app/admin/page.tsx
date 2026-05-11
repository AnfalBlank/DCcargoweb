import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const auth = await isAuthenticated();
  if (!auth) redirect("/admin/login");
  return <AdminDashboard />;
}
