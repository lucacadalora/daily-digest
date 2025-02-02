import { FC } from "react";
import { format } from "date-fns";
import { Badge } from "./ui/badge";

interface Story {
  id: string;
  title: string;
  createdAt: Date;
  isPremium?: boolean;
}

interface LatestStoriesListProps {
  stories: Story[];
}

export const LatestStoriesList: FC<LatestStoriesListProps> = ({ stories }) => {
  return (
    <div className="space-y-6">
      {stories.map((story) => (
        <div key={story.id} className="space-y-1">
          <div className="text-sm text-muted-foreground uppercase tracking-wide">
            {format(story.createdAt, "'2 DAYS AGO'")}
          </div>
          <div className="flex items-start gap-2">
            {story.isPremium && (
              <Badge variant="secondary" className="mt-0.5">
                S+
              </Badge>
            )}
            <h3 className="text-lg font-medium leading-tight">
              {story.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};
