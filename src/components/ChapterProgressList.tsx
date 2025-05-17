
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  Clock, 
  AlertCircle
} from "lucide-react";

interface Chapter {
  id: number;
  title: string;
  progress: number;
  status: "Not Started" | "In Progress" | "Completed";
}

interface ManuscriptWithChapters {
  id: number;
  title: string;
  author: string;
  authorId: string;
  deadline: string;
  chapters: Chapter[];
  priority: "High" | "Medium" | "Low";
}

interface ChapterProgressListProps {
  manuscript: ManuscriptWithChapters;
}

const ChapterProgressList: React.FC<ChapterProgressListProps> = ({ manuscript }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
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

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant="outline" className="flex items-center gap-1">
        {getStatusIcon(status)}
        <span>{status}</span>
      </Badge>
    );
  };

  const overallProgress = Math.round(
    manuscript.chapters.reduce((acc, chapter) => acc + chapter.progress, 0) / manuscript.chapters.length
  );

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{manuscript.title}</CardTitle>
            <CardDescription>by {manuscript.author}</CardDescription>
          </div>
          <Badge variant={manuscript.priority === "High" ? "destructive" : 
                         manuscript.priority === "Medium" ? "default" : "outline"}>
            {manuscript.priority} Priority
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Overall Progress</span>
            <span>{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
        
        <div className="text-sm text-muted-foreground mb-4">
          <span className="flex items-center">
            <Clock size={14} className="mr-1" /> Due: {manuscript.deadline}
          </span>
          <span className="mt-1 block">
            {manuscript.chapters.length} {manuscript.chapters.length === 1 ? 'Chapter' : 'Chapters'}
          </span>
        </div>
        
        {isExpanded && (
          <div className="mt-4 space-y-3 border-t pt-3">
            <h4 className="text-sm font-medium mb-2">Chapter Progress</h4>
            {manuscript.chapters.map((chapter) => (
              <div key={chapter.id} className="border rounded-md p-3">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-medium">Chapter {chapter.id}: {chapter.title}</h5>
                  {getStatusBadge(chapter.status)}
                </div>
                <div className="mb-1 flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{chapter.progress}%</span>
                </div>
                <Progress value={chapter.progress} className="h-1.5" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center justify-center gap-1"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp size={16} />
              <span>Hide Chapters</span>
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              <span>View Chapters</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChapterProgressList;
