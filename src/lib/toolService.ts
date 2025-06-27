import { supabase } from './supabase';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  path: string;
  icon: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const getTools = async (): Promise<{ tools: Tool[], error: string | null }> => {
  try {
    console.log('Fetching tools from Supabase')
    
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Supabase query error:', error)
      throw error;
    }
    
    const mappedTools = data?.map(tool => ({
      id: tool.id,
      name: tool.name,
      description: tool.description,
      category: tool.category,
      path: tool.path,
      icon: tool.icon,
      isActive: tool.is_active,
      createdAt: tool.created_at,
      updatedAt: tool.updated_at
    })) || [];
    
    console.log('Tools fetched successfully:', mappedTools.length)
    return { tools: mappedTools, error: null };
  } catch (err: any) {
    console.error('Error fetching tools:', err);
    return { tools: [], error: err.message };
  }
};

export const getToolsByCategory = async (category: string): Promise<{ tools: Tool[], error: string | null }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('is_active', true)
      .eq('category', category)
      .order('name');

    if (error) throw error;
    return { tools: data || [], error: null };
  } catch (err: any) {
    console.error('Error fetching tools by category:', err);
    return { tools: [], error: err.message };
  }
};

export const getToolById = async (id: string): Promise<{ tool: Tool | null, error: string | null }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { tool: data, error: null };
  } catch (err: any) {
    console.error('Error fetching tool:', err);
    return { tool: null, error: err.message };
  }
};

export const getToolByPath = async (path: string): Promise<{ tool: Tool | null, error: string | null }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('path', path)
      .single();

    if (error) throw error;
    return { tool: data, error: null };
  } catch (err: any) {
    console.error('Error fetching tool by path:', err);
    return { tool: null, error: err.message };
  }
}; 