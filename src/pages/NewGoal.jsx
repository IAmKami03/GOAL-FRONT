import React, { useState } from "react";
import ladda from "../assets/amico.png";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const NewGoal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newGoal = { title, description, progress: Number(progress) };

    try {
      const postNewGoal = await fetch(
        "https://goal-back-1-ucqy.onrender.com/api/goals",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newGoal),
        }
      );

      if (postNewGoal.ok) {
        toast.success("Created Successfully");

        setTimeout(() => {
          navigate("/allgoals");
        }, 1500);
      } else {
        toast.error("Failed to create goal");
      }
    } catch (error) {
      toast.error("Network error. Try again.");
    }
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 py-10 flex flex-col lg:flex-row items-start gap-10">
      {/* Form */}
      <fofrm
        onSubmit={handleSubmit}
        className="w-full lg:max-w-[600px] bg-[#0585cd29] p-8 md:p-12 rounded-lg flex flex-col gap-8"
      >
        <input
          type="text"
          placeholder="Goal Title"
          className="w-full p-4 rounded-md border border-[#0585cd] bg-[#0585cd05]
            placeholder:text-black/70 text-[16px]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          rows="10"
          placeholder="Goal Description"
          className="w-full p-4 rounded-md border border-[#0585cd] bg-[#0585cd05]
            placeholder:text-black/70 text-[16px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Progress (%)"
          className="w-full p-4 rounded-md border border-[#0585cd] bg-[#0585cd05]
            placeholder:text-black/70 text-[16px]"
          value={progress}
          onChange={(e) => {
            const num = Number(e.target.value);
            if (num < 0) setProgress(0);
            else if (num > 100) setProgress(100);
            else setProgress(num);
          }}
          min="0"
          max="100"
          required
        />

        <button
          type="submit"
          className="bg-[#0585cd] w-full p-4 rounded-lg text-white font-semibold text-[18px]
            hover:bg-[#0470ad] transition"
        >
          Create Goal
        </button>

        <ToastContainer />
      </fofrm>

      {/* Illustration */}
      <div className="w-full lg:flex-1 flex justify-center lg:justify-end">
        <img
          src={ladda}
          alt="Illustration"
          className="max-w-[300px] md:max-w-[400px] lg:max-w-[500px] w-full"
        />
      </div>
    </div>
  );
};

export default NewGoal;
