
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileEdit, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  BarChart,
  MessageSquare,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Sample data for the editor dashboard
const assignedScripts = [
  { 
    id: 1, 
    title: "The Lost Chapter", 
    author: "Sarah Johnson",
    deadline: "May 20, 2025", 
    status: "In Progress", 
    progress: 65,
    priority: "Medium" 
  },
  { 
    id: 2, 
    title: "Beyond the Stars", 
    author: "Michael Chen",
    deadline: "May 18, 2025", 
    status: "Not Started", 
    progress: 0,
    priority: "High" 
  },
  { 
    id: 3, 
    title: "Shadows of Tomorrow", 
    author: "Elena Rodriguez",
    deadline: "May 30, 2025", 
    status: "In Progress", 
    progress: 25,
    priority: "Low" 
  },
];

const EditorDashboard: React.FC = () => {
  const { user } = useAuth();

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">{priority}</Badge>;
      case "Medium":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">{priority}</Badge>;
      case "Low":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">{priority}</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="text-success" size={18} />;
      case "In Progress":
        return <Clock className="text-amber-500" size={18} />;
      case "Not Started":
        return <AlertCircle className="text-blue-500" size={18} />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout role="editor">
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">Editor Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your assigned manuscripts and tasks</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="gradient-card">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="bg-editor-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-3">
                  <FileEdit className="text-editor-primary" />
                </div>
                <h3 className="font-semibold text-2xl">3</h3>
                <p className="text-muted-foreground">Assigned Scripts</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="gradient-card">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="bg-editor-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-3">
                  <CheckCircle className="text-editor-primary" />
                </div>
                <h3 className="font-semibold text-2xl">1</h3>
                <p className="text-muted-foreground">Due This Week</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="gradient-card">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="bg-editor-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-3">
                  <MessageSquare className="text-editor-primary" />
                </div>
                <h3 className="font-semibold text-2xl">5</h3>
                <p className="text-muted-foreground">New Messages</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Assignments */}
        <Card>
          <CardHeader>
            <CardTitle>Current Assignments</CardTitle>
            <CardDescription>
              Scripts that need your attention, ordered by priority
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignedScripts.map((script) => (
                <div key={script.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                    <div>
                      <h4 className="font-medium text-lg">{script.title}</h4>
                      <p className="text-sm text-muted-foreground">by {script.author}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getPriorityBadge(script.priority)}
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getStatusIcon(script.status)}
                        <span>{script.status}</span>
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{script.progress}%</span>
                    </div>
                    <Progress value={script.progress} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm flex items-center gap-1">
                      <Clock size={14} className="text-muted-foreground" />
                      <span className="text-muted-foreground">Due: {script.deadline}</span>
                    </div>
                    <Button asChild size="sm" className="bg-editor-primary hover:bg-editor-accent">
                      <Link to={`/assignments/${script.id}`}>Edit</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="gap-2">
              <Link to="/assignments">
                <span>View All Assignments</span>
                <TrendingUp size={16} />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Your editing statistics for the past month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <div className="mb-2 text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground text-center">Manuscripts Completed</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="mb-2 text-2xl font-bold">98%</div>
                <div className="text-sm text-muted-foreground text-center">On-time Completion</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="mb-2 text-2xl font-bold">4.9/5</div>
                <div className="text-sm text-muted-foreground text-center">Writer Satisfaction</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" className="gap-2">
              <BarChart size={16} />
              <span>View Full Statistics</span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EditorDashboard;
