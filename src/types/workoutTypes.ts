export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type MuscleGroup =
  | 'Chest'
  | 'Arms'
  | 'Back'
  | 'Legs'
  | 'Core'
  | 'Shoulders'
  | 'Full Body';

export interface WorkoutType {
  id: number;
  name: string;
  image: string;
  muscleGroups: MuscleGroup[];
  equipment: string;
  difficulty: DifficultyLevel;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string; 
  rating: number;
  description: string;
  instructions: string[];
}