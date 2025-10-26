import { useQuery } from "@tanstack/react-query";
import type React from "react";
import { Link, useParams } from "react-router-dom";
import { fetchUserDetail, getCountryFromCoords } from "../aoi";
import LoadingCard from "../components/loadingCard";
import AlertError from "../AlertError";
import { useEffect, useState } from "react";

type UserParam = {
  id: string;
};

const UserDetail: React.FC = () => {
  const { id } = useParams<UserParam>();
  const [country, setCountry] = useState("");
  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["user-detail", id],
    queryFn: () => fetchUserDetail(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess && data) {
      const cont = getCountryFromCoords(
        `${data!.address.geo.lat}`,
        `${data!.address.geo.lng}`
      ).then(setCountry);
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return <LoadingCard />;
  }

  if (isError) {
    return <AlertError message={error.message} />;
  }

  return (
    <>
      <div className="m-5 flex flex-col w-full justify-center items-center m-auto my-5 ms-3">
        <h1 className="text-3xl font-bold m-5 self-start">User Detail</h1>
        <div className="card w-50% bg-base-200 shadow-xl">
          <div className="mask mask-squircle m-auto mt-5">
            <img
              src="https://img.daisyui.com/images/profile/demo/2@94.webp"
              alt="Avatar Tailwind CSS Component"
            />
          </div>
          <div className="card-body">
            <h2 className="card-title">User Details</h2>
            <p>Name: {data!.name} </p>
            <p>Email: {data!.email} </p>
            <p>
              address: {data!.address.street}, {data!.address.city}{" "}
            </p>
            <p>zip: {data!.address.zipcode} </p>
            <p>Phone: {data!.phone} </p>
            <ul className="list bg-base-100 rounded-box shadow-md">
              <li className="p-4 pb-2 text-lg opacity-60 tracking-wide">
                Company
              </li>

              <li className="list-row">
                <div>
                  <div> name: {data!.company.name} </div>
                  <div> catchPhrase: {data!.company.catchPhrase} </div>
                  <div> bs: {data!.company.bs} </div>
                </div>
              </li>
            </ul>
          </div>
          <Link className="btn btn-primary w-[90%] self-center" to={"/users"}>go Back</Link>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
