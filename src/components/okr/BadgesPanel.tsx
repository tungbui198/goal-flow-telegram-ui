
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Award, Star } from 'lucide-react';

interface BadgesPanelProps {
  badges: string[];
  streakCount: number;
}

const BadgesPanel: React.FC<BadgesPanelProps> = ({ badges, streakCount }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Award className="h-5 w-5 text-yellow-500" /> Achievements
        </h3>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
          <span className="font-bold">{streakCount} day streak</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {badges.length > 0 ? (
          badges.map((badge, index) => (
            <Badge key={index} variant="outline" className="px-3 py-1">
              {badge}
            </Badge>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">Complete OKRs to earn badges!</p>
        )}
      </div>
    </div>
  );
};

export default BadgesPanel;
