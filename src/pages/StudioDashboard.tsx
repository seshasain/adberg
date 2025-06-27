import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Image as ImageIcon, 
  Clock, 
  TrendingUp,
  RefreshCw,
  LayoutGrid,
  Video,
  Instagram,
  Maximize,
  Loader2
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { getTools, Tool } from '@/lib/toolService'
import { getProjectStats, ProjectStats } from '@/lib/projectService'
import { toast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'

const StudioDashboard = () => {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [tools, setTools] = useState<Tool[]>([])
  const [stats, setStats] = useState<ProjectStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const fetchDashboardData = async () => {
    if (!user) return
    setLoading(true)
    try {
      const [toolsResult, statsResult] = await Promise.all([
        getTools(),
        getProjectStats(user.id),
      ])

      if (toolsResult && !toolsResult.error) setTools(toolsResult.tools)
      if (statsResult && statsResult.stats) setStats(statsResult.stats)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast({
        title: 'Error',
        description: 'Could not load dashboard data.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading) {
      fetchDashboardData()
    }
  }, [user, authLoading])

  const handleOpenTool = (tool: Tool) => {
    navigate(tool.path)
  }

  const getToolIcon = (iconName: string | null) => {
    switch (iconName) {
      case 'image':
        return <ImageIcon className="h-8 w-8" />
      case 'video':
        return <Video className="h-8 w-8" />
      case 'instagram':
        return <Instagram className="h-8 w-8" />
      case 'maximize':
        return <Maximize className="h-8 w-8" />
      case 'layout':
        return <LayoutGrid className="h-8 w-8" />
      default:
        return <LayoutGrid className="h-8 w-8" />
    }
  }

  const filteredTools = activeCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category.toLowerCase() === activeCategory.toLowerCase())

  const categories = ['all', ...Array.from(new Set(tools.map(tool => tool.category)))]

  return (
    <>
      {/* Header */}
      <div className="mb-8 mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-montserrat font-bold text-3xl">
              Welcome back, {user?.user_metadata?.name || 'Creator'}!
            </h1>
            <p className="font-opensans text-gray-400">
              Select a tool below to start creating amazing content.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={fetchDashboardData}
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Projects Created</p>
              <LayoutGrid className="h-5 w-5 text-primary" />
            </div>
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <>
                <span className="text-2xl font-bold">{stats?.totalProjects ?? 0}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {stats?.completedProjects ?? 0} completed
                </p>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Credits Used</p>
              <Clock className="h-5 w-5 text-yellow-500" />
            </div>
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{stats?.creditsUsed ?? 0}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">/ {stats?.creditsLimit ?? 100}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {(stats?.creditsLimit ?? 100) - (stats?.creditsUsed ?? 0)} remaining
                </p>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Completion Rate</p>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <>
                <span className="text-2xl font-bold">
                  {`${(stats?.totalProjects ?? 0) > 0 ?
                    Math.round(((stats?.completedProjects ?? 0) / stats!.totalProjects) * 100) : 0}%`}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">of all projects</p>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Current Plan</p>
              <Badge variant="secondary">{user?.user_metadata?.plan || "Free"}</Badge>
            </div>
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <>
                <span className="text-2xl font-bold">{user?.user_metadata?.plan || "Free"}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Upgrade for more features</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tool Categories */}
      <div className="mb-8">
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="bg-white dark:bg-gray-800 h-64 animate-pulse">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))
        ) : (
          filteredTools.map((tool) => (
            <Card key={tool.id} className="bg-white dark:bg-gray-800 flex flex-col">
              <CardContent className="p-6 flex-grow flex flex-col">
                <div className="mb-4 text-center">{getToolIcon(tool.icon)}</div>
                <h3 className="text-lg font-bold mb-2 text-center">{tool.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center flex-grow">
                  {tool.description}
                </p>
              </CardContent>
              <div className="p-6 pt-0 flex items-center justify-between">
                <Badge variant="secondary">{tool.category}</Badge>
                <Button variant="ghost" onClick={() => handleOpenTool(tool)}>Open Tool</Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  );
}

export default StudioDashboard;
