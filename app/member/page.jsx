import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const Member = async () => {
  const session = await getServerSession(options);
  if (!session) redirect("/api/auth/signin?callbackUrl=/member");
  console.log(session);
  return (
    <div>
      <h1>Member Server side session</h1>

      {session?.user && <p>{session?.user?.email}</p>}
      {session?.role && <p>{session?.role}</p>}
    </div>
  );
};

export default Member;
