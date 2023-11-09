"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const MemberClient = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin/callbackUrl=/client-member");
    },
  });
  return (
    <div>
      <h1>Member Client Session</h1>
      {session?.user && <p>{session?.user?.email}</p>}
      {session?.role && <p>{session?.role}</p>}
    </div>
  );
};

export default MemberClient;
