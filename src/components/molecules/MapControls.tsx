"use client";

import { useTranslations } from 'next-intl';
import Button from '../atoms/Button';

interface MapControlsProps {
  pointsCount: number;
  onClose?: () => void;
  onClear: () => void;
}

export default function MapControls({ pointsCount, onClose, onClear }: MapControlsProps) {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-between mb-2">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {t('labels.clickMapToAdd')}
      </label>
      <div className="flex gap-2">
        {onClose && (
          <Button
            variant="success"
            onClick={onClose}
            disabled={pointsCount < 2}
            className="text-xs px-3 py-1.5"
          >
            {t('buttons.closePolygon')}
          </Button>
        )}
        <Button
          variant="danger"
          onClick={onClear}
          disabled={pointsCount === 0}
          className="text-xs px-3 py-1.5"
        >
          {t('buttons.clearPoints')}
        </Button>
      </div>
    </div>
  );
}
