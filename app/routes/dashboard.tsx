import type { Route } from "../+types/root";
import { getAuth } from "@clerk/react-router/ssr.server"
import { redirect } from "react-router"
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@clerk/react-router";
import { Button } from "@/components/ui/button";
import { useCreatePage } from "@/data/db-hooks/page-hooks";

export async function loader(args: any) {
  const auth = await getAuth(args)

  if (!auth.sessionId) {
    return redirect('/sign-in')
  }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
  ];
}

export default function Dashboard() {
  const { user, isLoaded } = useUser()
  const { mutate, isPending, data, isError, error } = useCreatePage()

  if (!isLoaded) {
    return <div>
      <Spinner />
    </div>
  }

  function handleCreatePage() {
    mutate({
      title: "New page 2",
      description: "This is a new page 2",
      slug: "new-page2",
      user_id: user?.id,
      is_public: 1,
    })
  }

  return (
    <div>
      <DashboardHeader />
      <div className="p-[20px] w-full flex justify-center items-center">
        <Button className="m-auto" onClick={handleCreatePage}>
          Add page
        </Button>
      </div>
    </div>
  );
}