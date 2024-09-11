"use client";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/actions";
import { useSession } from "@/providers/session-provider";

export default function Home() {
  const session = useSession();
  return (
    <div className='flex justify-center items-center min-h-screen w-full'>
      <div className='container flex items-center justify-center'>
        <div className='flex flex-col gap-2'>
          <span className='text-3xl'>
            {session.user.firstName} {session.user.lastName}
          </span>
          <span className='text-2xl'>{session.user.email}</span>
          <Button
            onClick={() => {
              logoutAction();
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
