import useUser from "@lib/client/useUser";
import React from "react";

export default () => {
  const { isLoading, user } = useUser();
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <p>Your email is {user?.email}</p>
    </div>
  );
};
