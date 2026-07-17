import { Search, Heart, MapPin, Inbox } from 'lucide-react';
import Button from './Button';

interface EmptyStateProps {
  icon?: 'search' | 'heart' | 'map' | 'inbox' | React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const iconMap: Record<'search' | 'heart' | 'map' | 'inbox', React.ReactNode> = {
  search: <Search size={48} className="text-slate-300 mx-auto mb-4" />,
  heart: <Heart size={48} className="text-slate-300 mx-auto mb-4" />,
  map: <MapPin size={48} className="text-slate-300 mx-auto mb-4" />,
  inbox: <Inbox size={48} className="text-slate-300 mx-auto mb-4" />,
};

export default function EmptyState({
  icon = 'inbox',
  title,
  description,
  action,
}: EmptyStateProps) {
  const displayIcon = typeof icon === 'string' ? iconMap[icon as keyof typeof iconMap] : icon;

  return (
    <div className="flex flex-col items-center justify-center min-h-96 py-12 px-4">
      {displayIcon}
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-center max-w-sm mb-6">{description}</p>
      {action && (
        <Button onClick={action.onClick} variant="primary" size="md">
          {action.label}
        </Button>
      )}
    </div>
  );
}
