"use client";
import PageWrapper from "@/components/wrapper/page-wrapper";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { vehicleValidation } from "@/utils/validation";
import axios from "axios";

import Image from "next/image";
import { toast } from "react-toastify";
import CloseIcon from "@/assets/svg/close";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    watch,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: yupResolver(vehicleValidation),
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const maxPictures = watch("maxPictures");

  const handleFileChange = async (e) => {
    setIsLoading(true);
    const files = Array.from(e.target.files);
    if (files.length + imagePreviews.length > maxPictures) {
      toast.error("You can only upload a limited number of pictures.");
      setImagePreviews([]);
      setIsLoading(false);
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));

    let images = [];
    setImagePreviews((old) => [...old, ...newPreviews]);
    files.map((file) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "nxcuaega");
      data.append("cloud_name", "dwbgu2shb");
      fetch("https://api.cloudinary.com/v1_1/dwbgu2shb/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          images.push(data.url);
        })
        .catch((err) => {
          toast.error("something uploading image issue", err);
        })
        .finally(() => {
          setAllImages(images);
          setIsLoading(false);
        });
    });
  };

  const onSubmitHandler = async (data) => {
    if (allImages.length === 0) {
      toast.error("Image is Required.");
      return;
    }

    setIsLoading(true);
    try {
      let response = await axios.post("/api/vehicle", { ...data, allImages });
      if (response.data.success) {
        toast.success(response.data.message);
        reset();
        setImagePreviews([]);
        setAllImages([]);
      }

      setIsLoading(false);
    } catch (error) {
      let errors = error.response.data;
      if (errors.error) {
        toast.error(errors.message);
      }
      setIsLoading(false);
    }
  };

  const handleRemove = (index) => {
    setAllImages((old) => old.filter((_, i) => i !== index));
    setImagePreviews((old) => old.filter((_, i) => i !== index));
  };

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

        {imagePreviews.length >= 0 && (
          <ul className="flex mt-2.5 gap-2.5">
            {imagePreviews.map((src, index) => (
              <li
                key={index}
                className="group w-20 min-w-20 h-20 border rounded-lg p-2 border-gray-700 relative before:content-[ ] overflow-hidden before:absolute before:bg-indigo-400 before:opacity-0 hover:before:opacity-80 before:inset-0 before:w-full before:h-full "
              >
                <span
                  className="group-hover:opacity-100 opacity-0 group-hover:visible cursor-pointer invisible absolute inset-0 m-auto w-8 h-8 z-10"
                  onClick={() => handleRemove(index)}
                >
                  <CloseIcon />
                </span>
                <Image
                  width={100}
                  height={100}
                  src={src}
                  className="w-full h-full "
                  alt={`Preview ${index}`}
                />
              </li>
            ))}
          </ul>
        )}
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
