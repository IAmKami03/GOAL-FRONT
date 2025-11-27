import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import pen from "../assets/pen.png";
import can from "../assets/can.png";
import SkeletonCard from "../components/SkeletonCard";

const OngoingPage = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true); // <-- Loading state
  const [error, setError] = useState(null); // <-- Optional error state

  const fetchGoals = async () => {
    try {
      setLoading(true); // Start loading
      const res = await fetch(
        "https://goal-back-1-ucqy.onrender.com/api/goals/ongoing"
      );
      const data = await res.json();
      setGoals(data);
      setLoading(false); // Stop loading
    } catch (err) {
      setError("Failed to fetch goals");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(
        `https://goal-back-1-ucqy.onrender.com/api/goals/${id}/delete`,
        { method: "DELETE" }
      );
      fetchGoals();
      toast.success("Successfully Deleted");
    } catch (error) {
      console.error("FAILED TO DELETE", error);
    }
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 py-10">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-black">
          Ongoing
        </h2>

        <Link
          to="/newgoal"
          className="no-underline font-montserrat font-semibold text-[18px] md:text-[20px] text-[#0585cd]"
        >
          + Create New Goals
        </Link>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="mt-8 flex flex-col gap-6 sm:gap-[40px] lg:gap-[60px]">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {/* Error State */}
      {error && (
        <p className="text-red-500 mt-6 text-center font-montserrat">{error}</p>
      )}

      {/* Ongoing Goals List */}
      {!loading && goals.length === 0 && (
        <p className="mt-10 text-center text-black/70 font-montserrat text-[18px]">
          No completed goals yet.
        </p>
      )}

      {/* Goals */}
      {!loading && goals.length > 0 && (
        <div className="mt-10 flex flex-col gap-10">
          {goals.map((goal) => (
            <div
              key={goal._id}
              className="w-full text-start p-6 md:p-8 shadow-[0_4px_4px_rgba(0,0,0,0.2)] rounded-lg flex flex-col gap-6 bg-white"
            >
              {/* Title + Description */}
              <div className="flex flex-col gap-3">
                <h3 className="font-montserrat font-semibold text-2xl md:text-[28px] text-black break-words">
                  {goal.title}
                </h3>

                <h4 className="font-montserrat font-semibold text-[18px] md:text-[20px] text-[#0585cd]">
                  In Progress
                </h4>

                <p className="font-montserrat text-[16px] md:text-[20px] text-black/80 leading-6 break-words">
                  {goal.description}
                </p>
              </div>

              {/* Progress + Buttons */}
              <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-10 items-start md:items-center">
                {/* Progress Bar */}
                <div className="w-full md:max-w-[400px] flex flex-col gap-3">
                  <div className="flex justify-between text-[16px] text-black/80">
                    <p>Progress</p>
                    <p>{goal.progress}%</p>
                  </div>

                  <div className="w-full bg-[#d9d9d9] h-3 rounded-full">
                    <div
                      className="h-3 rounded-full"
                      style={{
                        width: `${goal.progress}%`,
                        backgroundColor:
                          goal.progress < 30
                            ? "#FF0000CC"
                            : goal.progress < 60
                            ? "#FFA500"
                            : "#339933",
                      }}
                    ></div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <Link
                    to={`/progress/${goal._id}`}
                    className="flex items-center justify-center gap-3 p-4 bg-[#0585cd] text-white rounded-lg no-underline font-montserrat font-semibold text-[16px] md:text-[20px]"
                  >
                    <img src={pen} alt="Update icon" />
                    Update Progress
                  </Link>

                  <button
                    onClick={() => handleDelete(goal._id)}
                    className="flex items-center justify-center gap-3 p-4 border border-[#0585cd] text-[#0585cd] rounded-lg font-montserrat font-semibold text-[16px] md:text-[20px]"
                  >
                    <img src={can} alt="Delete icon" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OngoingPage;
