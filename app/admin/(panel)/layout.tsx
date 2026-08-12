import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import { getAdminUser } from "@/lib/admin/queries";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAdminUser();

  return <AdminLayoutShell email={user?.email}>{children}</AdminLayoutShell>;
}
