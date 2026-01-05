export type NodeStatus = 'pending' | 'running' | 'completed' | 'error';

export interface Scene {
  sceneNumber: number;
  description: string;
  characters: string[];
  dialogue?: string;
  setting: string;
  mood: string;
}

export interface Character {
  name: string;
  description: string;
  imageUrl?: string;
}

export interface VideoClip {
  sceneNumber: number;
  videoUrl: string;
  duration: number;
}

export interface WorkflowNodeData {
  label: string;
  type: string;
  status: NodeStatus;
  output?: any;
  error?: string;
}

export interface PromptSettings {
  globalModifier?: string;    // Applied to all generation steps
  storyStyle?: string;        // Specific to story generation
  visualStyle?: string;       // Specific to storyboard/scene descriptions
  imageStyle?: string;        // Specific to image generation
}

export interface APIKeys {
  geminiApiKey: string;
  geminiModel?: string;        // Selected Gemini model version
  vertexProjectId?: string;
  vertexLocation?: string;
  promptSettings?: PromptSettings;
}
