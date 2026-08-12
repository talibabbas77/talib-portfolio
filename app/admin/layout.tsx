import { AdminToaster } from "@/components/admin/admin-toaster";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <AdminToaster />
    </>
  );
}
