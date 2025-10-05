import { ReactNode } from 'react';

interface CodeBlockProps {
  children: ReactNode;
  label?: string;
  height?: string;
  onCopy?: () => void;
  actions?: ReactNode;
}

export default function CodeBlock({
  children,
  label,
  height = 'h-96',
  onCopy,
  actions,
}: CodeBlockProps) {
  return (
    <div>
      {(label || onCopy || actions) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {label}
            </label>
          )}
          <div className="flex gap-2">
            {actions}
            {onCopy && (
              <button
                onClick={onCopy}
                className="text-xs text-blue-500 hover:text-blue-600"
              >
                Copiar
              </button>
            )}
          </div>
        </div>
      )}
      <div className={`bg-slate-50 dark:bg-slate-900 rounded-lg p-4 ${height} overflow-auto`}>
        <pre className="text-xs font-mono text-slate-800 dark:text-slate-200 break-all whitespace-pre-wrap">
          {children}
        </pre>
      </div>
    </div>
  );
}
