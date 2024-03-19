// activity.model.ts

export interface Activity {
  _id: string;
  activityName: string;
  duration: number;
  caloriesBurned: number;
  steps?: number;
  distance?: number;
  date: Date;
} 