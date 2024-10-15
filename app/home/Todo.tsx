import React from "react";

type Props = {
  data: any;
};

const Todo = ({ data }: Props) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg flex flex-col gap-2 w-[240px]">
      <h2 className="text-2xl font-semibold text-gray-700">#{data?.id}</h2>
      <h3 className="text-lg font-semibold text-gray-900">{data?.title}</h3>
      <h3 className="text-base font-normal text-gray-900">
        User ID: {data?.title}
      </h3>
      <h3
        className={`text-base font-normal ${
          data?.completed ? "text-green-500" : "text-red-500"
        } mt-auto`}
      >
       {data?.completed ? "Completed": "Not Completed"}
      </h3>
    </div>
  );
};

export default Todo;
