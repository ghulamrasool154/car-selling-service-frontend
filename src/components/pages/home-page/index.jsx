"use client";
import PageWrapper from "@/components/wrapper/page-wrapper";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { vehicleValidation } from "@/utils/validation";
import { CldImage } from "next-cloudinary";

import Image from "next/image";
import { toast } from "react-toastify";
import CloseIcon from "@/assets/svg/close";
const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: yupResolver(vehicleValidation),
  });

  const [imagePreviews, setImagePreviews] = useState(["1", "2"]);
  const maxPictures = watch("maxPictures");

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length + imagePreviews.length > maxPictures) {
      toast.error("You can only upload a limited number of pictures.");
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);

    console.log("===>", files, newPreviews);
  };

  const onSubmitHandler = (data) => {
    console.log("data", { data, imagePreviews });
    setIsLoading(true);
  };


  const handleRemove = (index)=>{
    console.log("index--remove", index)
  }

  return (
    <PageWrapper
      onSubmitHandler={handleSubmit(onSubmitHandler)}
      title={"Car selling service"}
    >
      <div className="form-row">
        <label className="block text-base capitalize font-medium text-gray-900">
          Car Model
        </label>
        <div className="my-2.5">
          <input
            {...register("carModel")}
            placeholder="car model"
            type="text"
            className={`px-4 py-2.5 w-full text-gray-600 border rounded-md focus-visible:outline-none ${
              errors.carModel && isSubmitted
                ? "border-red-400"
                : "border-gray-300 focus:border-gray-500"
            }`}
            onBlur={() => trigger("carModel")}
          />
          {errors.carModel && isSubmitted && (
            <p className="text-red-500 text-sm mt-1">
              {errors.carModel.message}
            </p>
          )}
        </div>
      </div>
      <div className="form-row">
        <label className="block text-base capitalize font-medium text-gray-900">
          price
        </label>
        <div className="my-2.5">
          <input
            {...register("price")}
            placeholder="1245"
            type="number"
            className={`px-4 py-2.5 w-full text-gray-600 border rounded-md focus-visible:outline-none ${
              errors.price && isSubmitted
                ? "border-red-400"
                : "border-gray-300 focus:border-gray-500"
            }`}
            onBlur={() => trigger("price")}
          />
          {errors.price && isSubmitted && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>
      </div>
      <div className="form-row">
        <label className="block text-base capitalize font-medium text-gray-900">
          phone
        </label>
        <div className="my-2.5">
          <input
            {...register("phone")}
            placeholder="03120123456"
            type="number"
            minLength={11}
            maxLength={11}
            className={`px-4 py-2.5 w-full text-gray-600 border rounded-md focus-visible:outline-none ${
              errors.phone && isSubmitted
                ? "border-red-400"
                : "border-gray-300 focus:border-gray-500"
            }`}
            onBlur={() => trigger("phone")}
          />
          {errors.phone && isSubmitted && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>
      <div className="form-row">
        <label className="block text-base capitalize font-medium text-gray-900">
          City
        </label>
        <div className="my-2.5">
          {["Lahore", "Islamabad", "Faisalabad", "Karachi"].map((city) => (
            <div key={city} className="flex items-center mb-2">
              <input
                {...register("city", { required: "City is required" })}
                type="radio"
                value={city}
                id={city}
                className={`mr-2 ${
                  errors.city && isSubmitted
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-gray-500"
                }`}
                onBlur={() => trigger("city")}
              />
              <label
                htmlFor={city}
                className="text-gray-700 capitalize cursor-pointer"
              >
                {city}
              </label>
            </div>
          ))}
          {errors.city && isSubmitted && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>
      </div>
      <div className="form-row">
        <label className="block text-base capitalize font-medium text-gray-900">
          maxPictures
        </label>
        <div className="my-2.5">
          <select
            {...register("maxPictures")}
            className={`px-4 py-2.5 w-full text-gray-600 border rounded-md focus-visible:outline-none`}
          >
            {Array(10)
              .fill(null)
              .map((_, index) => {
                return (
                  <option value={index + 1} key={index}>
                    {index + 1}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
      <div className="form-row">
        <label className="block text-base capitalize font-medium text-gray-900">
          pictures
        </label>
        <div className="mt-2.5">
          <input
            accept="image/*"
            type="file"
            className="px-4 py-2.5 w-full text-gray-600 border rounded-md focus-visible:outline-none"
            multiple
            onChange={handleFileChange}
          />
        </div>

        
        {imagePreviews.length >= 0 && 

        <ul className="flex mt-2.5 gap-2.5">
          {imagePreviews.map((src, index) => (
            <li
              key={index}
              className="group w-20 min-w-20 h-20 border rounded-lg p-2 border-gray-700 relative "
            >
              <span className="group-hover:opacity-100 opacity-0 group-hover:visible cursor-pointer invisible absolute inset-0 m-auto w-8 h-8 z-10" onClick={()=>handleRemove(index)}>
                <CloseIcon />
              </span>
              <Image
                width={100}
                height={100}
                src={"/next.svg"}
                className="w-full h-full group-hover:opacity-50"
                alt={`Preview ${index}`}
              />
            </li>
          ))}
        </ul>
        }
      </div>

      <div className="form-row mt-1.5">
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-wait w-full py-2.5 px-4 text-white font-semibold capitalize"
          disabled={isLoading}
        >
          {isLoading ? "loading" : "Submit"}
        </button>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
