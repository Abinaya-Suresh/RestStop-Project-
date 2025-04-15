// src/pages/AddRestroomPage.tsx
import React from "react";
import { AddRestroom, RestroomData } from "../components/Restrooms/AddRestroom";
import { useNavigate } from "react-router-dom";

const AddRestroomPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: RestroomData) => {
    // Here you would typically save the data to your backend
    console.log("Submitting restroom data:", data);
    // Add your API call here
    
    // Navigate back to home or restroom list
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Restroom</h1>
      <AddRestroom onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default AddRestroomPage;