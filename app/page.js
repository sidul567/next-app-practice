"use client"

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const { data } = useSession();

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  })

  const getData = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data?.data?.data);
  }

  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    getData();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", user?.username);
    formData.append("email", user?.email);
    formData.append("password", user?.password);

    const data = await fetch("/api/users", {
      method: "POST",
      body: formData
    });
    getData();

  }

  return (
    <main>
      <form className="flex flex-col gap-4 max-w-xs p-8 mx-auto" onSubmit={handleSubmit}>
        <input type="text" name="username" id="" placeholder="username" className="text-base font-semibold text-black p-1 rounded-lg border" value={user?.username} onChange={handleUserChange} />
        <input type="email" name="email" id="" placeholder="email" className="text-base font-semibold text-black p-1 rounded-lg border" value={user?.email} onChange={handleUserChange} />
        <input type="password" name="password" id="" placeholder="password" className="text-base font-semibold text-black p-1 rounded-lg border" value={user?.password} onChange={handleUserChange} />
        <input type="submit" value="Submit" className="p-1.5 bg-black hover:bg-white hover:text-black text-white duration-300 transition-all rounded-lg border-black border cursor-pointer" />
      </form>

      <table className="max-w-xs mx-auto">
        <thead>
          <tr className="">
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>IsAdmin</th>
          </tr>
        </thead>
        <tbody>
          {
            users?.map((user) => (
              <tr className="" key={user.id}>
                <td>{user?.id}</td>
                <td>{user?.username}</td>
                <td>{user?.email}</td>
                <td>{user?.password}</td>
                <td>{user?.isadmin}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </main>
  );
}
