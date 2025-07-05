
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  CheckSquare, 
  AlertTriangle,
  Users,
  Share2,
  MoreVertical,
  Bell,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import TaskFilters from "@/components/TaskFilters";
import TaskCard from "@/components/TaskCard";
import CreateTaskDialog from "@/components/CreateTaskDialog";
import { useToast } from "@/hooks/use-toast";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  dueDate: string;
  assignedTo: string[];
  createdBy: string;
  createdAt: string;
  sharedWith: string[];
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");

  // Mock user data
  const currentUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg"
  };

  // Mock tasks data
  useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: "1",
        title: "Complete project proposal",
        description: "Write and review the Q1 project proposal for the new client",
        priority: "high",
        status: "in-progress",
        dueDate: "2025-01-08",
        assignedTo: ["John Doe", "Sarah Wilson"],
        createdBy: "John Doe",
        createdAt: "2025-01-05",
        sharedWith: ["sarah@example.com"]
      },
      {
        id: "2",
        title: "Design system updates",
        description: "Update the design system with new color palette and components",
        priority: "medium",
        status: "todo",
        dueDate: "2025-01-10",
        assignedTo: ["John Doe"],
        createdBy: "John Doe",
        createdAt: "2025-01-05",
        sharedWith: []
      },
      {
        id: "3",
        title: "Team meeting preparation",
        description: "Prepare agenda and materials for the weekly team meeting",
        priority: "low",
        status: "completed",
        dueDate: "2025-01-06",
        assignedTo: ["John Doe"],
        createdBy: "John Doe",
        createdAt: "2025-01-04",
        sharedWith: []
      },
      {
        id: "4",
        title: "Code review for authentication",
        description: "Review the new authentication system implementation",
        priority: "high",
        status: "todo",
        dueDate: "2025-01-07",
        assignedTo: ["John Doe", "Mike Johnson"],
        createdBy: "Sarah Wilson",
        createdAt: "2025-01-05",
        sharedWith: ["john@example.com"]
      }
    ];
    setTasks(mockTasks);
    setFilteredTasks(mockTasks);
  }, []);

  // Filter tasks based on search and filter criteria
  useEffect(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    switch (currentFilter) {
      case "today":
        const today = new Date().toISOString().split('T')[0];
        filtered = filtered.filter(task => task.dueDate === today);
        break;
      case "overdue":
        const now = new Date().toISOString().split('T')[0];
        filtered = filtered.filter(task => task.dueDate < now && task.status !== "completed");
        break;
      case "high-priority":
        filtered = filtered.filter(task => task.priority === "high");
        break;
      case "shared":
        filtered = filtered.filter(task => task.sharedWith.length > 0 || task.createdBy !== currentUser.name);
        break;
      case "completed":
        filtered = filtered.filter(task => task.status === "completed");
        break;
      default:
        break;
    }

    setFilteredTasks(filtered);
  }, [tasks, searchQuery, currentFilter, currentUser.name]);

  const handleCreateTask = (newTask: Omit<Task, "id" | "createdAt" | "createdBy">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: currentUser.name
    };
    
    setTasks(prev => [task, ...prev]);
    toast({
      title: "Task created successfully!",
      description: "Your new task has been added to your list.",
    });
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
    toast({
      title: "Task updated!",
      description: "Your changes have been saved.",
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "The task has been removed from your list.",
    });
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === "completed").length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    overdue: tasks.filter(t => t.dueDate < new Date().toISOString().split('T')[0] && t.status !== "completed").length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <CheckSquare className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">TaskFlow</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="outline" onClick={() => navigate("/")}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {currentUser.name.split(' ')[0]}!
          </h2>
          <p className="text-gray-600">
            Here's what's on your plate today. Stay organized and get things done.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <CheckSquare className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <CheckSquare className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-3xl font-bold text-red-600">{stats.overdue}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <TaskFilters currentFilter={currentFilter} onFilterChange={setCurrentFilter} />
          
          <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks found</h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery || currentFilter !== "all" 
                    ? "Try adjusting your search or filters" 
                    : "Create your first task to get started"}
                </p>
                {!searchQuery && currentFilter === "all" && (
                  <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-indigo-600 hover:bg-indigo-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Task
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                currentUser={currentUser}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>
      </div>

      <CreateTaskDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateTask={handleCreateTask}
      />
    </div>
  );
};

export default Dashboard;
