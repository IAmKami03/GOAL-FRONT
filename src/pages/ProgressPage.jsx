import React, { useState, useEffect } from "react";
import ladda from "../assets/amico.png";
import { useNavigate, useParams } from "react-router-dom";

const ProgressPage = () => {
  const { id } = useParams();
  const [goal, setGoal] = useState("");
  const [newProgress, setNewProgress] = useState("");

  const navigate = useNavigate();

  const fetchGoalByID = async () => {
    try {
      const res = await fetch(
        `https://goal-back-1-ucqy.onrender.com/api/goals/${id}`
      );

      if (res.ok) {
        const data = await res.json();
        setGoal(data);
        setNewProgress(data.progress);
      } else {
        console.error("Goal not found");
      }
    } catch (error) {
      console.error("Error fetching goal", error);
    }
  };

  useEffect(() => {
    fetchGoalByID();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const update = await fetch(
        `https://goal-back-1-ucqy.onrender.com/api/goals/${id}/progress`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ progress: Number(newProgress) }),
        }
      );

      if (update.ok) {
        navigate("/allgoals");
      } else {
        console.error("Update failed");
      }
    } catch (error) {
      console.error("Error updating goal", error);
    }
  };

  return (
    <div className="my-12 px-4 flex flex-col lg:flex-row items-start gap-10 max-w-7xl mx-auto">
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 w-full max-w-xl text-left bg-white"
      >
        <h2 className="font-bold text-3xl md:text-4xl text-black">Progress</h2>

        {/* TOP SECTION */}
        <div className="mt-6 space-y-4">
          <div>
            <h4 className="text-sm md:text-base font-normal text-black/70">
              Goal Title
            </h4>
            <p className="text-base font-semibold text-black break-words">
              {goal.title}
            </p>
          </div>

          <div>
            <h4 className="text-sm md:text-base font-normal text-black/70">
              Goal Description
            </h4>
            <p className="text-base text-black leading-relaxed break-words">
              {goal.description}
            </p>
          </div>
        </div>

        {/* LOWER SECTION */}
        <div className="mt-8 bg-[#0585cd29] p-6 md:p-10 rounded-xl space-y-10">
          {/* INPUT */}
          <input
            type="number"
            placeholder="Goal Progress"
            className="w-full max-w-xs px-3 py-3 rounded-md border border-[#0585cd] bg-[#0585cd05] placeholder:text-black/70"
            value={newProgress}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value < 0) setNewProgress(0);
              else if (value > 100) setNewProgress(100);
              else setNewProgress(value);
            }}
            min="0"
            max="100"
            required
          />

          {/* PROGRESS BAR */}
          <div className="w-full max-w-sm space-y-2">
            <div className="flex justify-between">
              <p className="text-base text-black/80">Progress</p>
              <p className="text-base text-black/80">{newProgress}%</p>
            </div>

            <div className="w-full h-3 bg-gray-300 rounded-full">
              <div
                className="h-3 rounded-full"
                style={{
                  width: `${newProgress}%`,
                  backgroundColor:
                    newProgress < 30
                      ? "#FF0000CC"
                      : newProgress < 60
                      ? "#FFA500"
                      : "#339933",
                }}
              ></div>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-[#0585cd] px-6 py-3 rounded-lg text-white font-semibold text-lg"
          >
            Update Progress
          </button>
        </div>
      </form>

      {/* IMAGE */}
      <div className="flex justify-center lg:justify-end w-full lg:w-auto">
        <img
          src={ladda}
          alt="illustration"
          className="w-full max-w-xs md:max-w-sm lg:max-w-md"
        />
      </div>
    </div>
  );
};

export default ProgressPage;
