import type React from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <>
      <div className="drawer drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <Outlet />
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="is-drawer-close:w-14 is-drawer-open:w-64 bg-base-200 flex flex-col items-start min-h-full">
            {/* Sidebar content here */}
            <h1 className="text-2xl is-drawer-close:hidden m-2 whitespace-nowrap m-5">Admin Panel</h1>
            <ul className="menu w-full grow p-4">
              {/* list item */}
              <li>
                <NavLink
                  to={"/dashboard"}
                  className={({ isActive }) =>
                    isActive
                      ? "is-drawer-close:tooltip is-drawer-close:tooltip-righ font-semibold bg-primary text-gray-100"
                      : "is-drawer-close:tooltip is-drawer-close:tooltip-right text-primary"
                  }
                  data-tip="Dashboard"
                >
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
                    className="lucide lucide-layout-dashboard-icon lucide-layout-dashboard"
                  >
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                  </svg>
                  <span className="is-drawer-close:hidden">Dashboard</span>
                </NavLink>
              </li>

              {/* list item */}
              <li>
                <NavLink
                  to={"/users"}
                  className={({ isActive }) =>
                    isActive
                      ? "is-drawer-close:tooltip is-drawer-close:tooltip-righ font-semibold bg-primary text-gray-100"
                      : "is-drawer-close:tooltip is-drawer-close:tooltip-right text-gray-500 hover:text-gray-700 text-primary"
                  }
                  data-tip="Users"
                >
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
                  <span className="is-drawer-close:hidden">Users</span>
                </NavLink>
              </li>
            </ul>

            {/* button to open/close drawer */}
            <div
              className="m-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Open"
            >
              <label
                htmlFor="my-drawer-4"
                className="btn btn-ghost btn-circle drawer-button is-drawer-open:rotate-y-180"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="inline-block size-4 my-1.5"
                >
                  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                  <path d="M9 4v16"></path>
                  <path d="M14 10l2 2l-2 2"></path>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
