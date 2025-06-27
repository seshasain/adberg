import { supabase } from './supabase'

export interface Project {
  id: string
  title: string
  description?: string
  status: 'draft' | 'in_progress' | 'review' | 'completed'
  projectData?: any // Flexible JSON data for tool-specific content
  thumbnailUrl?: string
  createdAt: string
  updatedAt: string
  userId: string
  toolId: string
}

export interface CreateProjectData {
  title: string
  description?: string
  toolId: string
  projectData?: any
  thumbnailUrl?: string
}

export interface ProjectStats {
  totalProjects: number
  completedProjects: number
  creditsUsed: number
  creditsLimit: number
}

export const createProject = async (projectData: CreateProjectData) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data: userProfile } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', user.id)
      .single()

    if (!userProfile) throw new Error('User profile not found')

    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          ...projectData,
          user_id: userProfile.id,
          status: 'draft'
        }
      ])
      .select()
      .single()

    if (error) throw error
    return { project: data, error: null }
  } catch (err: any) {
    console.error('Error creating project:', err)
    return { project: null, error: err.message }
  }
}

export const getUserProjects = async (userId: string, limit?: number) => {
  try {
    // Try to get user projects without requiring authentication
    console.log('Fetching projects for userId:', userId)
    
    // For development, we'll use the test user if no userId is provided
    let query;
    
    if (userId) {
      query = supabase
        .from('projects')
        .select('*, tool:tools(*)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
    } else {
      // Get test user
      const { data: testUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', 'test@example.com')
        .single()
      
      if (testUser) {
        query = supabase
          .from('projects')
          .select('*, tool:tools(*)')
          .eq('user_id', testUser.id)
          .order('created_at', { ascending: false })
      } else {
        return { projects: [], error: 'No test user found' }
      }
    }

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching projects:', error)
      throw error
    }
    
    console.log('Projects fetched:', data?.length || 0)
    return { projects: data || [], error: null }
  } catch (err: any) {
    console.error('Error fetching projects:', err)
    return { projects: [], error: err.message }
  }
}

export const getUserProjectsByTool = async (userId: string, toolId: string, limit?: number) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    let query = supabase
      .from('projects')
      .select('*, tool:tools(*)')
      .eq('user_id', userId)
      .eq('tool_id', toolId)
      .order('created_at', { ascending: false })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) throw error
    return { projects: data || [], error: null }
  } catch (err: any) {
    console.error('Error fetching projects by tool:', err)
    return { projects: [], error: err.message }
  }
}

export const getProjectStats = async (userId: string): Promise<{ stats: ProjectStats | null, error: string | null }> => {
  try {
    console.log("getProjectStats called with userId:", userId)
    
    // Try to get the authenticated user
    const { data: { user } } = await supabase.auth.getUser()
    
    // First try with the authenticated user
    if (user) {
      console.log("Auth user found:", user.id)
      
      // Get the user profile using the auth ID
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('id, credits_used, credits_limit')
        .eq('auth_id', user.id)
        .single()

      if (profileError) {
        console.error('Error fetching user profile:', profileError)
      } else if (userProfile) {
        console.log("User profile found:", userProfile)
        
        // Get projects using the database user ID
        const { data: projects, error: projectsError } = await supabase
          .from('projects')
          .select('status')
          .eq('user_id', userProfile.id)

        if (projectsError) {
          console.error('Error fetching projects:', projectsError)
        } else {
          console.log("Projects found:", projects?.length || 0)
          
          const stats: ProjectStats = {
            totalProjects: projects?.length || 0,
            completedProjects: projects?.filter(p => p.status === 'completed').length || 0,
            creditsUsed: userProfile.credits_used || 0,
            creditsLimit: userProfile.credits_limit || 100
          }
          
          console.log("Returning stats:", stats)
          return { stats, error: null }
        }
      }
    }
    
    // If we get here, either there's no authenticated user or there was an error
    // Fall back to using the test user
    console.log("Falling back to test user")
    
    // Get the test user
    const { data: testUser, error: testUserError } = await supabase
      .from('users')
      .select('id, credits_used, credits_limit')
      .eq('email', 'test@example.com')
      .single()
    
    if (testUserError) {
      console.error('Error fetching test user:', testUserError)
      return { 
        stats: {
          totalProjects: 0,
          completedProjects: 0,
          creditsUsed: 0,
          creditsLimit: 100
        }, 
        error: 'Could not find user' 
      }
    }
    
    if (testUser) {
      console.log("Test user found:", testUser)
      
      // Get projects for test user
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('status')
        .eq('user_id', testUser.id)
      
      if (projectsError) {
        console.error('Error fetching test user projects:', projectsError)
      } else {
        console.log("Test user projects found:", projects?.length || 0)
        
        const stats: ProjectStats = {
          totalProjects: projects?.length || 0,
          completedProjects: projects?.filter(p => p.status === 'completed').length || 0,
          creditsUsed: testUser.credits_used || 0,
          creditsLimit: testUser.credits_limit || 100
        }
        
        console.log("Returning test user stats:", stats)
        return { stats, error: null }
      }
    }
    
    // If we get here, we couldn't get stats for either the authenticated user or the test user
    console.log("Returning default stats")
    return { 
      stats: {
        totalProjects: 0,
        completedProjects: 0,
        creditsUsed: 0,
        creditsLimit: 100
      }, 
      error: null 
    }
  } catch (err: any) {
    console.error('Error fetching project stats:', err)
    return { 
      stats: {
        totalProjects: 0,
        completedProjects: 0,
        creditsUsed: 0,
        creditsLimit: 100
      }, 
      error: err.message 
    }
  }
}

export const updateProject = async (projectId: string, updates: Partial<Project>) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data: userProfile } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', user.id)
      .single()

    if (!userProfile) throw new Error('User profile not found')

    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId)
      .eq('user_id', userProfile.id)
      .select()
      .single()

    if (error) throw error
    return { project: data, error: null }
  } catch (err: any) {
    console.error('Error updating project:', err)
    return { project: null, error: err.message }
  }
}

export const deleteProject = async (projectId: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')
    
    const { data: userProfile } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', user.id)
      .single()

    if (!userProfile) throw new Error('User profile not found')

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId)
      .eq('user_id', userProfile.id)

    if (error) throw error
    return { error: null }
  } catch (err: any) {
    console.error('Error deleting project:', err)
    return { error: err.message }
  }
}

export const getProject = async (projectId: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data: userProfile } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', user.id)
      .single()

    if (!userProfile) throw new Error('User profile not found')

    const { data, error } = await supabase
      .from('projects')
      .select('*, tool:tools(*)')
      .eq('id', projectId)
      .eq('user_id', userProfile.id)
      .single()

    if (error) throw error
    return { project: data, error: null }
  } catch (err: any) {
    console.error('Error fetching project:', err)
    return { project: null, error: err.message }
  }
}
