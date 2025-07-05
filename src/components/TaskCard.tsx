
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  MoreVertical, 
  Calendar, 
  Users, 
  Share2, 
  Edit, 
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";
import { Task } from "@/pages/Dashboard";
import EditTaskDialog from "./EditTaskDialog";
import ShareTaskDialog from "./ShareTaskDialog";

interface TaskCardProps {
  task: Task;
  currentUser: { name: string; email: string; avatar: string };
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard = ({ task, currentUser, onUpdate, onDelete }: TaskCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "in-progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "todo": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "in-progress": return <Clock className="h-4 w-4" />;
      default: return null;
    }
  };

  const isOverdue = task.dueDate < new Date().toISOString().split('T')[0] && task.status !== "completed";
  const isShared = task.sharedWith.length > 0 || task.createdBy !== currentUser.name;

  const handleStatusToggle = () => {
    const newStatus = task.status === "completed" ? "todo" : 
                     task.status === "todo" ? "in-progress" : "completed";
    onUpdate(task.id, { status: newStatus });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <>
      <Card className={`transition-all duration-200 hover:shadow-md ${
        task.status === "completed" ? "opacity-75 bg-gray-50" : "bg-white"
      } ${isOverdue ? "border-red-200 bg-red-50" : ""}`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`text-lg font-semibold ${
                  task.status === "completed" ? "line-through text-gray-500" : "text-gray-900"
                }`}>
                  {task.title}
                </h3>
                {isShared && (
                  <Share2 className="h-4 w-4 text-blue-500" />
                )}
              </div>
              
              <p className={`text-sm mb-3 ${
                task.status === "completed" ? "text-gray-400" : "text-gray-600"
              }`}>
                {task.description}
              </p>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority} priority
                </Badge>
                
                <Badge className={getStatusColor(task.status)}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(task.status)}
                    {task.status.replace("-", " ")}
                  </div>
                </Badge>

                <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                  isOverdue ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"
                }`}>
                  <Calendar className="h-3 w-3" />
                  {formatDate(task.dueDate)}
                  {isOverdue && <AlertTriangle className="h-3 w-3 ml-1" />}
                </div>
              </div>

              {task.assignedTo.length > 1 && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <div className="flex -space-x-2">
                    {task.assignedTo.slice(0, 3).map((person, index) => (
                      <Avatar key={index} className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-xs">
                          {person.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {task.assignedTo.length > 3 && (
                      <div className="h-6 w-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                        <span className="text-xs text-gray-600">+{task.assignedTo.length - 3}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleStatusToggle}
                className={task.status === "completed" ? "text-green-600" : "text-gray-600"}
              >
                <CheckCircle className="h-4 w-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white border shadow-lg">
                  <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)} className="cursor-pointer hover:bg-gray-50">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsShareDialogOpen(true)} className="cursor-pointer hover:bg-gray-50">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete(task.id)} 
                    className="cursor-pointer hover:bg-gray-50 text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditTaskDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        task={task}
        onUpdateTask={(updates) => onUpdate(task.id, updates)}
      />

      <ShareTaskDialog
        open={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        task={task}
        onUpdateTask={(updates) => onUpdate(task.id, updates)}
      />
    </>
  );
};

export default TaskCard;
