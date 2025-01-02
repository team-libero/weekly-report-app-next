import { Button } from '@/components/ui/button';

interface TopProps {
  onClear: () => void;
  onCopy: () => void;
  disabled?: boolean;
}

export const Top = ({ onClear, onCopy, disabled = false }: TopProps) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="flex gap-4 ml-auto mt-4">
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={onCopy}
          disabled={disabled}
        >
          前回の内容をコピー
        </Button>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={onClear}
          disabled={disabled}
        >
          クリア
        </Button>
      </div>
    </div>
  );
};
