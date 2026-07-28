import { useEffect, useState } from "react";
import { getTasks } from "../api/task.api";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";
import { Search, Plus, ChevronDown } from "lucide-react";
import "../styles/dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [filters, setFilters] = useState({
        search: "",
        status: "",
        priority: "",
        page: 1,
        limit: 10
    });
    
    const [pageInfo, setPageInfo] = useState({ currentPage: 1, totalPages: 1 });
    const [stats, setStats] = useState({ total: 0, done: 0, open: 0 });
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [searchInput, setSearchInput] = useState("");

    // Debounce search input
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setFilters((prev) => ({ ...prev, search: searchInput, page: 1 }));
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [searchInput]);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const response = await getTasks(filters);
                setTasks(response.data.tasks);
                
                if (response.data.stats) {
                    setStats(response.data.stats);
                    setPageInfo({
                        currentPage: response.data.currentPage,
                        totalPages: response.data.totalPages
                    });
                } else {
                    // Fallback if backend doesn't support stats yet
                    const total = response.data.tasks.length;
                    const done = response.data.tasks.filter((t) => t.status === "Done").length;
                    setStats({ total, done, open: total - done });
                    setPageInfo({ currentPage: 1, totalPages: 1 });
                }
            } catch (error) {
                setError(
                    error.response?.data?.message || "Failed to load tasks"
                );
            } finally {
                setLoading(false);
            }
        };

        loadTasks();
    }, [filters, refreshTrigger]);

    if (loading) {
        return <h2 className="center">Loading...</h2>;
    }

    if (error) {
        return <h2 className="error-message">{error}</h2>;
    }

    if (!Array.isArray(tasks)) {
        return <h2 className="center">Invalid data received from server</h2>;
    }

    const { totalTasks, doneTasks, openTasks } = {
        totalTasks: stats.total,
        doneTasks: stats.done,
        openTasks: stats.open
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div className="dashboard-title-section">
                    <h1>My tasks</h1>
                    <p className="task-stats">
                        {totalTasks} total &middot; {doneTasks} done &middot; {openTasks} open
                    </p>
                </div>

                <button onClick={() => navigate("/tasks/new")}>
                    <Plus size={16} />
                    Add Task
                </button>
            </div>

            <div className="filters">
                <div className="search-wrapper">
                    <Search size={16} className="search-icon" />
                    <input
                        placeholder="Search tasks..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>

                <div className="select-wrapper">
                    <select
                        value={filters.status}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                status: e.target.value,
                                page: 1
                            })
                        }
                    >
                        <option value="">All Status</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                    <ChevronDown size={14} className="select-icon" />
                </div>

                <div className="select-wrapper">
                    <select
                        value={filters.priority}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                priority: e.target.value,
                                page: 1
                            })
                        }
                    >
                        <option value="">All Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <ChevronDown size={14} className="select-icon" />
                </div>
            </div>

            {tasks.length === 0 ? (
                <div className="empty-state">
                    {filters.search || filters.status || filters.priority ? (
                        <>
                            <h2>No matches found</h2>
                            <p>Try adjusting your filters or search query.</p>
                        </>
                    ) : (
                        <>
                            <h2>No Tasks Yet</h2>
                            <p>Create your first task to get started</p>
                        </>
                    )}
                </div>
            ) : (
                <>
                    <div className="tasks-container">
                        {tasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onDelete={() => {
                                    setRefreshTrigger((prev) => prev + 1);
                                }}
                            />
                        ))}
                    </div>

                    {pageInfo.totalPages > 1 && (
                        <div className="pagination">
                            <button
                                disabled={pageInfo.currentPage === 1}
                                onClick={() =>
                                    setFilters({ ...filters, page: pageInfo.currentPage - 1 })
                                }
                                className="page-btn"
                            >
                                Previous
                            </button>
                            
                            <span className="page-info">
                                Page {pageInfo.currentPage} of {pageInfo.totalPages}
                            </span>
                            
                            <button
                                disabled={pageInfo.currentPage === pageInfo.totalPages}
                                onClick={() =>
                                    setFilters({ ...filters, page: pageInfo.currentPage + 1 })
                                }
                                className="page-btn"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Dashboard;