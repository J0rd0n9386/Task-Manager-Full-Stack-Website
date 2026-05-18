import React, { useEffect, useState } from "react";
import "../App.css"; 
import axios from "axios";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchTasks = async (currentPage = 1) => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token || token === "undefined" || token === "null") {
        throw new Error("Please login first. Token not found.");
      }

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/tasks?page=${currentPage}&limit=10`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch tasks");
      }

      setTasks(data.tasks || []);
      setPage(data.page || 1);
      setPages(data.pages || 1);
      setTotal(data.total || 0);
    } catch (err) {
      setError(err.message);
      if (
        err.message.includes("Token") ||
        err.message.includes("unauthorized") ||
        err.message.includes("Access denied")
      ) {
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/admin/login";
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(page);
  }, [page]);

  return (
    <div className="dashboard-container">
      
      <div className="dash-glow-1"></div>
      <div className="dash-glow-2"></div>

      <div className="dashboard-content">
        
        
        <div className="dash-header">
          <h1 className="dash-title">Admin Dashboard</h1>
          <div className="stat-box">
            <div className="stat-label">Total Tasks</div>
            <h2 className="stat-value">{total}</h2>
          </div>
        </div>

        
        {error && (
          <div className="error-alert" style={{ marginBottom: '2rem' }}>
             <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        
        {loading ? (
          <div className="loader-container">
            <div className="premium-spinner"></div>
            <p>Syncing secure data...</p>
          </div>
        ) : (
          <>
            
            <div className="task-grid">
              {tasks.map((task, index) => (
                <div
                  key={task._id}
                  className="task-card"
                  style={{ animationDelay: `${index * 0.08}s` }} 
                >
                  <div className="task-card-header">
                    <h2 className="task-title">{task.title}</h2>
                    <span
                      className={`status-badge ${
                        task.status === "completed"
                          ? "status-completed"
                          : task.status === "pending"
                          ? "status-pending"
                          : "status-other"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  <p className="task-desc">
                    {task.description || "No description provided."}
                  </p>

                  <div className="owner-info">
                    <div className="owner-label">Assigned To</div>
                    <h3 className="owner-name">
                      {task.owner?.fullname || "Unassigned"}
                    </h3>
                    <p className="owner-email">
                      {task.owner?.email || "N/A"}
                    </p>
                  </div>

                  <div className="task-dates">
                    <div>
                      <span className="date-label">Created</span>
                      {new Date(task.createdAt).toLocaleDateString()}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span className="date-label">Last Updated</span>
                      {new Date(task.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {tasks.length === 0 && !error && (
              <div className="empty-state">
                <svg style={{width:'3rem', height:'3rem', margin:'0 auto 1rem', opacity:0.5}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <h3>No tasks found</h3>
                <p>There are currently no tasks in the system.</p>
              </div>
            )}

            {/* Pagination Controls */}
            {pages > 0 && (
              <div className="pagination-container">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="page-btn"
                >
                  ← Previous
                </button>

                <span className="page-indicator">
                  Page {page} of {pages}
                </span>

                <button
                  onClick={() => setPage((prev) => Math.min(prev + 1, pages))}
                  disabled={page === pages || pages === 0}
                  className="page-btn next-btn"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
// import React, { useEffect, useState } from "react";

// const AdminDashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(1);
//   const [total, setTotal] = useState(0);

//   const fetchTasks = async (currentPage = 1) => {
//     try {
//       setLoading(true);
//       setError("");

//       // 👇 Token check karo pehle
//       const token = localStorage.getItem("token");
//       console.log("Token from localStorage:", token);

//       if (!token || token === "undefined" || token === "null") {
//         throw new Error("Please login first. Token not found.");
//       }

//       // 👇 Sahi endpoint match karo backend se
//       const res = await fetch(
//         `http://localhost:8000/api/admin/tasks?page=${currentPage}&limit=10`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // 👈 exact syntax
//           },
//         }
//       );

//       const data = await res.json();
//       console.log("Tasks response:", data);

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to fetch tasks");
//       }

//       setTasks(data.tasks || []);
//       setPage(data.page || 1);
//       setPages(data.pages || 1);
//       setTotal(data.total || 0);
//     } catch (err) {
//       setError(err.message);
//       console.error("Fetch error:", err);

//       // 👇 Agar unauthorized hai, login pe bhejo
//       if (
//         err.message.includes("Token") ||
//         err.message.includes("unauthorized") ||
//         err.message.includes("Access denied")
//       ) {
//         localStorage.removeItem("token"); // Clean up
//         setTimeout(() => {
//           window.location.href = "/admin/login";
//         }, 2000);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks(page);
//   }, [page]);

//   return (
//     <div className="min-h-screen bg-zinc-900 text-white p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-4xl font-bold">Admin Dashboard</h1>

//           <div className="bg-zinc-800 px-5 py-3 rounded-xl shadow-lg">
//             <p className="text-sm text-gray-400">Total Tasks</p>
//             <h2 className="text-2xl font-bold">{total}</h2>
//           </div>
//         </div>

//         {error && (
//           <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-6">
//             ⚠️ {error}
//           </div>
//         )}

//         {loading ? (
//           <div className="text-center text-lg mt-20">
//             <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mr-3"></div>
//             Loading tasks...
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {tasks.map((task) => (
//                 <div
//                   key={task._id}
//                   className="bg-zinc-800 rounded-2xl p-5 shadow-lg border border-zinc-700 hover:border-blue-500 transition"
//                 >
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-xl font-semibold capitalize">
//                       {task.title}
//                     </h2>

//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-medium ${
//                         task.status === "completed"
//                           ? "bg-green-500/20 text-green-400"
//                           : task.status === "pending"
//                           ? "bg-yellow-500/20 text-yellow-400"
//                           : "bg-blue-500/20 text-blue-400"
//                       }`}
//                     >
//                       {task.status}
//                     </span>
//                   </div>

//                   <p className="text-gray-300 mb-5 line-clamp-3">
//                     {task.description}
//                   </p>

//                   <div className="bg-zinc-900 rounded-xl p-3 mb-4">
//                     <p className="text-sm text-gray-400">Task Owner</p>
//                     <h3 className="font-semibold">
//                       {task.owner?.fullname || "Unknown"}
//                     </h3>
//                     <p className="text-sm text-gray-400">
//                       {task.owner?.email || "No email"}
//                     </p>
//                   </div>

//                   <div className="flex justify-between text-sm text-gray-400">
//                     <span>
//                       Created:
//                       <br />
//                       {new Date(task.createdAt).toLocaleDateString()}
//                     </span>
//                     <span className="text-right">
//                       Updated:
//                       <br />
//                       {new Date(task.updatedAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {tasks.length === 0 && !error && (
//               <div className="text-center mt-20 text-gray-400">
//                 No tasks found
//               </div>
//             )}

//             <div className="flex justify-center items-center gap-4 mt-10">
//               <button
//                 onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={page === 1}
//                 className="bg-zinc-700 px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-zinc-600 transition"
//               >
//                 ← Previous
//               </button>

//               <span className="font-semibold bg-zinc-800 px-4 py-2 rounded-lg">
//                 Page {page} of {pages}
//               </span>

//               <button
//                 onClick={() => setPage((prev) => Math.min(prev + 1, pages))}
//                 disabled={page === pages || pages === 0}
//                 className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg disabled:opacity-50 transition"
//               >
//                 Next →
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;