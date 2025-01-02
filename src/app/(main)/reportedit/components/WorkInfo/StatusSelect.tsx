import { Label } from '@/components/ui/label';

interface StatusSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const StatusSelect = ({
  label,
  name,
  value,
  onChange,
}: StatusSelectProps) => {
  return (
    <div className="flex items-center gap-2">
      <Label className="font-bold whitespace-nowrap">{label}</Label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="rounded-md border border-input bg-background px-3 py-2 w-32"
      >
        <option value="">-</option>
        <option value="1">良い</option>
        <option value="2">普通</option>
        <option value="3">悪い</option>
      </select>
    </div>
  );
};
