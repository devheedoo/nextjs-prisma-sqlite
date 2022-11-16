import useMutation from "@lib/client/useMutation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
}

interface MutationResult {
  ok: boolean;
}

export default () => {
  const [login, { loading, data }] =
    useMutation<MutationResult>("/api/users/login");

  const { register, handleSubmit, reset } = useForm<IForm>();
  const router = useRouter();

  const onValid = (inputs: IForm) => {
    reset();
    login(inputs);
  };

  useEffect(() => {
    if (data?.ok) {
      router.push("/");
    }
  }, [data]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Log In</h1>

      <form onSubmit={handleSubmit(onValid)}>
        <div>
          email: <input type="text" {...register("email")} />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};
