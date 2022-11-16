import useMutation from "@lib/client/useMutation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  name: string;
  email: string;
}

interface MutationResult {
  ok: boolean;
}

export default () => {
  const [join, { loading, data }] =
    useMutation<MutationResult>("/api/users/join");

  const { register, handleSubmit, reset } = useForm<IForm>();
  const router = useRouter();

  const onValid = (inputs: IForm) => {
    reset();
    join(inputs);
  };

  useEffect(() => {
    if (data?.ok) {
      router.push("/sign-in");
    }
  }, [data]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit(onValid)}>
        <div>
          name: <input type="text" {...register("name")} />
        </div>
        <div>
          email: <input type="text" {...register("email")} />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};
