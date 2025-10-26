import { useQuery } from "@tanstack/react-query";
import type React from "react";
import { fetchUsers } from "../aoi";
import AlertError from "../AlertError";
import { useEffect, useState } from "react";
import type { User } from "../types";
import LoadingCard from "../components/loadingCard";
import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";

interface SearchFormData {
  search: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>();
  const [usersFiltered, setUsersFilterd] = useState<User[]>();

  const { register, control, handleSubmit } = useForm<SearchFormData>();
  const searchValue = useWatch({control, name: 'search', defaultValue: ''});

  const { data, isLoading, error, isSuccess, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUsers(data);
      setUsersFilterd(data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (!users) return;
    const filterd = users?.filter((user) =>
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setUsersFilterd(filterd);
  }, [searchValue, users]);

  if (isLoading) {
    return <LoadingCard />;
  }

  if (isError) {
    return <AlertError message={error.message} />;
  }

  const onSubmit = (data: SearchFormData) => {
    // e.preventDefault();
  }

  return (
    <>
      <h1 className="text-3xl font-bold m-5">Users</h1>
      <div className="container mx-auto p-5">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              {...register("search")}
              type="search"
              className="grow"
              placeholder="Search by Name"
            />
          </label>
        </form>
      </div>
      <div className="container mx-auto p-5">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Address</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {usersFiltered?.map((user) => (
                <tr key={user.id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50">
                          {user.address.city}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{`${user.address.street}, ${user.address.city}`}</td>
                  <td>{user.email}</td>
                  <th>
                    <Link to={`user/${user.id}`} className="btn btn-primary btn-sm">details</Link>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
          </table>
        </div>
      </div>
    </>
  );
};
export default Users;
