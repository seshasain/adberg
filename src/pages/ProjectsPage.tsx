import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  RefreshCw,
  Clock,
  Trash2,
  Eye,
  Download,
  Image as ImageIcon,
  Maximize,
  Instagram,
  LayoutGrid,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserProjects, Project } from '@/lib/projectService';
import { getTools, Tool } from '@/lib/toolService';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

const ProjectsPage = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectsResult, toolsResult] = await Promise.all([
        getUserProjects(user!.id),
        getTools(),
      ]);

      if (projectsResult.projects) setProjects(projectsResult.projects);
      if (toolsResult.tools) setTools(toolsResult.tools);
    } catch (error) {
      toast({
        title: 'An unexpected error occurred',
        description: 'Could not fetch projects.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getToolIcon = (iconName: string | null) => {
    switch (iconName) {
      case 'image': return <ImageIcon className="h-4 w-4" />;
      case 'maximize': return <Maximize className="h-4 w-4" />;
      case 'instagram': return <Instagram className="h-4 w-4" />;
      case 'layout': return <LayoutGrid className="h-4 w-4" />;
      default: return <LayoutGrid className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'review': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((project) => project.toolId === activeFilter);

  return (
    <>
      <div className="flex items-center justify-between mb-8 mt-4">
        <div>
          <h1 className="text-3xl font-bold">Your Projects</h1>
          <p className="text-muted-foreground">View and manage all your created content</p>
        </div>
        <Button variant="outline" onClick={fetchData} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="mb-8">
        <Tabs defaultValue="all" value={activeFilter} onValueChange={setActiveFilter}>
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            {tools.map((tool) => (
              <TabsTrigger key={tool.id} value={tool.id}>
                <span className="flex items-center gap-2">
                  {getToolIcon(tool.icon)}
                  {tool.name}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const tool = tools.find((t) => t.id === project.toolId);
            return (
              <Card key={project.id} className="group overflow-hidden">
                <div className="relative">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    {project.thumbnailUrl ? (
                      <img src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center text-gray-500">
                        {tool && getToolIcon(tool.icon)}
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="outline"><Eye className="h-4 w-4" /></Button>
                    {project.status === 'completed' && <Button size="sm" variant="outline"><Download className="h-4 w-4" /></Button>}
                    <Button size="sm" variant="destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium">{project.title}</h3>
                    <Badge variant="outline" className={getStatusColor(project.status)}>
                      {project.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      {tool && getToolIcon(tool.icon)}
                      <span>{tool?.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{format(new Date(project.createdAt), 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <LayoutGrid className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">Create a new project to get started.</p>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ProjectsPage; 