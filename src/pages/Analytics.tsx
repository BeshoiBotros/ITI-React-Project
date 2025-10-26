import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../aoi";
import Card from "../components/Statistics/Card";
import { useEffect, useState } from "react";
import {type User } from "../types";
import WeatherWidget from "../components/Statistics/WeatherWidget";
import UserStatsCard from "../components/Statistics/UsersData";
const Analytics: React.FC = () => {
  const [users, setUsers] = useState<User[]>();
  const { data, isLoading, error, isSuccess, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  useEffect(() => {
    if (isSuccess && data) {
      setUsers(data);
    }
  }, [isSuccess, data]);

  return (
    <div className="m-5 flex flex-col w-[98%] justify-center items-center m-auto my-5 ms-3">
      <div className="w-[90%]">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Analytics</h1>
        <div className="flex gap-10">
          <Card
            title="Users"
            statistic={users?.length}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-users-icon lucide-users"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <circle cx="9" cy="7" r="4" />
              </svg>
            }
          />
          <WeatherWidget />
        </div>
        <UserStatsCard />
      </div>
    </div>
  );
};
export default Analytics;
