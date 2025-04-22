
export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  category: 'productivity' | 'hobby' | 'personal';
  color?: string;
  description?: string;
  location?: string;
  tags?: string[];
  isCompleted?: boolean;
}

