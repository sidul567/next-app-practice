"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Todo from "./Todo";

type Props = {};

const Todos = (props: Props) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
    // staleTime: 4000,
    // refetchInterval: 2000,
    // refetchOnWindowFocus: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (newPost: any) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((res) => res.json()),
    onSuccess: (newPost) => {
      //   queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.setQueryData(["todos"], (oldTodo: any) => [
        newPost,
        ...oldTodo,
      ]);
    },
  });
  return (
    <div className="p-8">
      <button
        className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded outline-none border-none mb-4 duration-300"
        onClick={() =>
          mutate({
            userId: 1,
            id: 1,
            title: "delectus aut autem",
            completed: false,
          })
        }
      >
        Add New Post
      </button>
      {isLoading || isPending ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {data?.map((item: any) => (
            <Todo key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Todos;
