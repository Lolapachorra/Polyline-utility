import Button from '../atoms/Button';

interface MapControlsProps {
  pointsCount: number;
  onClose?: () => void;
  onClear: () => void;
}

export default function MapControls({ pointsCount, onClose, onClear }: MapControlsProps) {
  return (
    <div className="flex items-center justify-between mb-2">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        Clique no mapa para adicionar pontos:
      </label>
      <div className="flex gap-2">
        {onClose && (
          <Button
            variant="success"
            onClick={onClose}
            disabled={pointsCount < 2}
            className="text-xs px-3 py-1.5"
          >
            Fechar Polígono
          </Button>
        )}
        <Button
          variant="danger"
          onClick={onClear}
          disabled={pointsCount === 0}
          className="text-xs px-3 py-1.5"
        >
          Limpar Pontos
        </Button>
      </div>
    </div>
  );
}
