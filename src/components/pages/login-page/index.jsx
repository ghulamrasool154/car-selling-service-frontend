"use client";
import { loginValidation } from "@/utils/validation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PageWrapper from "@/components/wrapper/page-wrapper";
import EyeIcon from "@/assets/svg/eye-icon";
import EyeIcon2 from "@/assets/svg/eye-icon2";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hideShow, setHideShow] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    trigger,
  } = useForm({
    resolver: yupResolver(loginValidation),
    mode: "onChange",
    shouldFocusError: false,
    shouldUnregister: true,
  });

  const onSubmitHandler = (data) => {
    setIsLoading(true);
  };

  const hideShowPasswordHandler = () => setHideShow(!hideShow);

  return (
    <PageWrapper
      onSubmitHandler={handleSubmit(onSubmitHandler)}
      title={"Login In"}
    >
      <div className="form-row">
        <label
          htmlFor="email"
          className="block text-base capitalize font-medium text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2.5">
          <input
            {...register("email")}
            placeholder="info@gmail.com"
            type="email"
            className={`px-4 py-2.5 w-full text-gray-600 border rounded-md focus-visible:outline-none ${
              errors.email && isSubmitted
                ? "border-red-400"
                : "border-gray-300 focus:border-gray-500"
            }`}
            onBlur={() => trigger("email")}
          />
          {errors.email && isSubmitted && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="form-row py-2.5 relative">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Password
          </label>
        </div>
        <div className="mt-2 relative">
          <input
            placeholder="********"
            {...register("password")}
            type={hideShow ? "password" : "text"}
            className={`px-4 py-2.5 w-full text-gray-600 border rounded-md focus-visible:outline-none ${
              errors.password && isSubmitted
                ? "border-red-400"
                : "border-gray-300 focus:border-gray-500"
            }`}
            onBlur={() => trigger("password")}
          />
          {errors.password && isSubmitted && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          <span
            className="absolute w-8 h-8  right-3 top-2  cursor-pointer "
            onClick={hideShowPasswordHandler}
          >
            {hideShow ? <EyeIcon /> : <EyeIcon2 />}
          </span>
        </div>
      </div>

      <div className="form-row mt-1.5">
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-wait w-full py-2.5 px-4 text-white font-semibold capitalize"
          disabled={isLoading}
        >
          {isLoading ? "loading" : "Sign in"}
        </button>
      </div>
    </PageWrapper>
  );
};

export default LoginPage;
