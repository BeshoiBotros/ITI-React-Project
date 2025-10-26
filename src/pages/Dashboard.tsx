import type React from "react";
import Card from "../components/Dashboard/Card";

const Dashboard: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl font-bold m-5">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 m-5">
        <Card
          title="Users"
          description="Manage Users and their Contents"
          buttonText="View Users"
          to="/users"
        />
        <Card
          title="Note Manager"
          description="Organize your thoughts and tasks efficiently"
          buttonText="View Notes"
          to="/notes"
        />
        <Card
          title="Simple Analytics"
          description="Quick Insights into your data"
          buttonText="Go to Analytics"
          to="/analytics"
        />
        <Card
          title="Weather Widget"
          description="New York City, USA - 24°C, Sunny"
          buttonText="View Weather"
          to="/weather"
        />
      </div>
    </>
  );
};

export default Dashboard;
