import React from "react";

const PageWrapper = ({ title, children, onSubmitHandler }) => {
  return (
    <div className="flex min-h-lvh justify-center items-center">
      <section className="max-w-[650px] mx-auto w-full p-4">
        <h2 className="text-gray-900 capitalize text-center  text-2xl sm:text-3xl font-semibold">
          {title}
        </h2>
        <form className=" mx-auto w-full mt-5" onSubmit={onSubmitHandler}>
          {children}
        </form>
      </section>
    </div>
  );
};

export default PageWrapper;
