"use client";
import { useForm } from "react-hook-form";
import { LoginUser, User } from "@/models/User";
import { CustomInput } from "@/components/CustomInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { login } from "@/services/authentications";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
// import { cookies } from "next/headers";

// import { toast } from "react-toastify";
import "./login.css";
import { setCookie } from "cookies-next/client";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>({
    resolver: zodResolver(
      z.object({
        username: z.string().min(1, { message: "Username is required" }),
        password: z.string().min(1, { message: "Password is required" }),
      }),
    ),
  });

  const mutation = useMutation({
    mutationFn: (body: LoginUser) => login(body),
    onSuccess: async (res) => {
      //   const cookieStore = await cookies();
      localStorage.setItem("user", JSON.stringify(res));
      //   localStorage.setItem("token", res.access_token);
      //   localStorage.setItem("refresh_token", res.refresh_token);
      console.log("-------------------res--------------", res);
      setCookie("token", res.access_token);
      setCookie("refresh_token", res.refresh_token);
      router.push("/products");
    },
    onError: (error: any) => {
      setError(error.response.data.message);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onSubmit = (body: LoginUser) => {
    setLoading(true);
    mutation.mutate(body);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center w-full ">
        <h1 className="text-2xl font-bold">login</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center gap-4 card p-10">
          <CustomInput
            label="Username"
            errorMessage={errors.username?.message}
            isRequired
            placeholder="Enter username"
            {...register("username")}
          />
          <CustomInput
            label="Password"
            errorMessage={errors.password?.message}
            type="password"
            isRequired
            placeholder="Enter password"
            {...register("password")}
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-center w-full">
            <Button
              type="submit"
              color="primary"
              className="w-full"
              isLoading={loading}
            >
              Login
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
