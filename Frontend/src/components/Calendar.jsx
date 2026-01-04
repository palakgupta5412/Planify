import React, { useState , useEffect } from "react";
import { fetchPlans } from "../store/plans";
import categories from "../constants/categories";
import axios from "../utils/axiosConfig.js";

const Calendar = ({ year = 2025 }) => {
  const [page, setPage] = useState(1);
  const [plans , setPlans] = useState([]);
  
  useEffect(() => {
    const getPlans = async () => {
      const data = await axios.get('/planify/v1/plans/getAllPlans');
      setPlans(data.data.data.plans);
    };
    getPlans();
  }, []);
  
  const icons = {
    "Food": "🍜" ,
    "Experiences": "🎉",
    "Travel": "✈️",
    "Places": "📍",
    "Shopping": "🛒"
  }

  // Changinf dates format 
  const iconMap = {};
plans.forEach(p => {
    if (!p.completedAt) return; // skip empty/null dates

    const date = new Date(p.completedAt);

    if (isNaN(date)) return; // skip invalid dates

    const normalized = date.toISOString().split("T")[0];
    iconMap[normalized] = icons[p.category];
});

  // Convert plan list to { "2025-02-04": "🍽" }
  // plans.forEach(p => {
  //   iconMap[p.completedAt] = icons[p.category];
  // });

  const monthsPage1 = [0, 1, 2, 3, 4, 5];
  const monthsPage2 = [6, 7, 8, 9, 10, 11];

  const getDays = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    return { firstDay, totalDays };
  };

  const renderMonth = (month) => {
    const { firstDay, totalDays } = getDays(year, month);
    const daysArray = [];

    // Empty cells before day 1
    for (let i = 0; i < firstDay; i++) {
      daysArray.push({ day: "", icon: null });
    }

    // Actual days
    for (let d = 1; d <= totalDays; d++) {
      const dateKey = `${year}-${String(month + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      daysArray.push({ day: d, icon: iconMap[dateKey] });
    }

    return (
      <div className="border border-white/20 p-3 rounded-lg">
        <h2 className="text-center text-white mb-2 font-semibold">
          {new Date(year, month).toLocaleString("default", { month: "long" })}
        </h2>

        <div className="grid grid-cols-7 gap-1 text-white/70 text-sm mb-1">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
            <div key={d} className="text-center">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {daysArray.map((d,i) => (
            <div key={i} className="h-14 relative cursor-pointer group border border-white/10 rounded-md flex flex-col items-center justify-center text-white">
              {d.day && <span className={`${d.icon ? "hidden" : ""}`}>{d.day}</span>}
              {d.icon && <span className="text-xl">{d.icon}</span>}
              <div className={`my-auto mx-auto left-0 -bottom-8 invisible ${d.icon ? "group-hover:opacity-100 group-hover:visible" : ""} absolute opacity-0 transition bg-[#1F1E24] p-2 rounded-md`}>
                {
                    (()=>{
                        if (!d.day) return null;
                        const dateKey = `${year}-${String(month + 1).padStart(2,'0')}-${String(d.day).padStart(2,'0')}`;
                        const dayPlans = plans.filter(p => p.completedAt === dateKey);

                        if(dayPlans.length === 0) {
                            return <p className="text-xs text-white">No plans completed</p>;
                        }
                        return dayPlans.map((p, idx) => (
                            <p key={idx} className="text-xs text-white">{`${p.name} ${idx!==dayPlans.length-1 ? "," : ""}`}</p>
                        ));
                    })()
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const selectedMonths = page === 1 ? monthsPage1 : monthsPage2;

  return (
    <div className="w-full p-6">
      <div className="flex justify-between mb-4 text-white">
        <button
          disabled={page === 1}
          onClick={() => setPage(1)}
          className="px-4 py-2 bg-white/10 rounded disabled:opacity-20"
        >
          Jan–Jun
        </button>

        <h1 className="text-2xl font-bold">{year} Calendar </h1>

        <button
          disabled={page === 2}
          onClick={() => setPage(2)}
          className="px-4 py-2 bg-white/10 rounded disabled:opacity-20"
        >
          Jul–Dec
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {selectedMonths.map(m => renderMonth(m))}
      </div>
    </div>
  );
};

export default Calendar;
