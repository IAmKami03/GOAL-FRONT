import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pen from "../assets/pen.png";
import can from "../assets/can.png";
import { toast, ToastContainer } from "react-toastify";
import SkeletonCard from "../components/SkeletonCard";

const CompletedPage = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true); // <-- Loading state
  const [error, setError] = useState(null); // <-- Optional error state

  const fetchGoals = async () => {
    try {
      setLoading(true); // Start loading
      const getGoalAPI = await fetch(
        "https://goal-back-1-ucqy.onrender.com/api/goals/completed"
      );
      const goalBack = await getGoalAPI.json();
      setGoals(goalBack);
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
        {
          method: "DELETE",
        }
      );
      fetchGoals();
      toast.success("Successfully Deleted");
    } catch (error) {
      console.error(`FAILED TO DELETE`, error);
    }
  };

  return (
    <div className="mx-4 sm:mx-[100px] my-[32px]">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="font-montserrat font-bold text-[28px] sm:text-[36px] text-black m-0">
          Completed
        </h2>

        <Link
          to="/newgoal"
          className="no-underline font-montserrat font-semibold text-[16px] sm:text-[20px] text-[#0585cd]"
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

      {/* Completed Goals List */}
      {!loading && goals.length === 0 && (
        <p className="mt-10 text-center text-black/70 font-montserrat text-[18px]">
          No completed goals yet.
        </p>
      )}

      {!loading && goals.length > 0 && (
        <div className="mt-[40px] flex flex-col gap-[40px] sm:gap-[60px]">
          {goals.map((goal) => (
            <div
              key={goal._id}
              className="text-start px-4 sm:px-[35px] pt-[20px] sm:pt-[24px] pb-[40px] sm:pb-[50px] shadow-[0_4px_4px_rgba(0,0,0,0.2)] flex flex-col gap-[25px] sm:gap-[35px]"
            >
              {/* Title + Description */}
              <div className="flex flex-col gap-[10px]">
                <h4 className="font-montserrat font-semibold text-[18px] sm:text-[20px] text-[#0585cd] m-0">
                  Congratulations 🎉
                </h4>

                <h3 className="font-montserrat font-semibold text-[22px] sm:text-[28px] text-black m-0 break-words">
                  {goal.title}
                </h3>

                <p className="font-montserrat font-normal text-[16px] sm:text-[20px] leading-[22px] sm:leading-[24.38px] text-black/80 m-0 break-words">
                  {goal.description}
                </p>
              </div>

              {/* Progress + Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-0">
                {/* Progress bar */}
                <div className="w-full sm:w-[368px] flex flex-col items-start gap-[12px]">
                  <div className="flex justify-between w-full items-start">
                    <p className="font-montserrat text-[14px] sm:text-[16px] text-black/80 m-0">
                      Progress
                    </p>
                    <p className="font-montserrat text-[14px] sm:text-[16px] text-black/80 m-0">
                      {goal.progress}%
                    </p>
                  </div>

                  <div className="w-full bg-[#d9d9d9] h-[12px] rounded-[10px]">
                    <div className="h-[12px] rounded-[10px] bg-[#339933]"></div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="w-full sm:w-[25%] flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
                  <Link
                    to={`/progress/${goal._id}`}
                    className="w-full sm:w-[45%] flex items-center justify-center gap-[10px] rounded-[10px] p-[14px] sm:p-[16px] bg-[#0585cd] no-underline"
                  >
                    <img src={pen} alt="Edit icon" />
                    <p className="font-montserrat font-semibold text-[16px] sm:text-[20px] text-white m-0">
                      Edit
                    </p>
                  </Link>

                  <button
                    onClick={() => handleDelete(goal._id)}
                    className="w-full sm:w-[45%] flex items-center justify-center gap-[10px] rounded-[10px] p-[14px] sm:p-[16px] bg-white border border-[#0585cd]"
                  >
                    <img src={can} alt="Delete icon" />
                    <p className="font-montserrat font-semibold text-[16px] sm:text-[20px] text-[#0585cd] m-0">
                      Delete
                    </p>
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

export default CompletedPage;
