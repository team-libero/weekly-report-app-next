import { Button } from '@/components/ui/button';

interface BottomProps {
  disabled?: boolean;
  onClick: () => void;
  isEdit?: boolean;
}

export const Bottom = ({ disabled, onClick, isEdit }: BottomProps) => {
  return (
    <div className="flex justify-center mt-6">
      <Button
        variant="secondary"
        size="lg"
        className="bg-blue-600 hover:bg-blue-700 text-white px-32 py-8"
        onClick={onClick}
        disabled={disabled}
      >
        {disabled ? (
          <span>送信中...</span>
        ) : (
          <span>{isEdit ? '編集' : '登録'}</span>
        )}
      </Button>
    </div>
  );
};
