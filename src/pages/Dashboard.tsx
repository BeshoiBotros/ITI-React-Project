import type React from "react";
import Card from "../components/Dashboard/Card";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row flex-start w-full container mx-auto px-4">
        <Card
          title="Users"
          description="Manage Users and their Contents"
          buttonText="View Notes"
        />
        <Card
          title="Note Manager"
          description="Organize your thoughts and tasks efficiently"
          buttonText="Users View"
        />
      </div>
    </>
  );
};

export default Dashboard;
