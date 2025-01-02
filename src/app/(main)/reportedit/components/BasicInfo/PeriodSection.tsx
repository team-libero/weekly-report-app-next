import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PeriodSectionProps {
  startDate: string;
  endDate: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PeriodSectionPage = ({
  startDate,
  endDate,
  onChange,
}: PeriodSectionProps) => {
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4">期間</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label className="font-bold whitespace-nowrap">開始日</Label>
            <Input
              type="date"
              name="startDate"
              value={startDate}
              onChange={onChange}
              className="w-40"
            />
          </div>
          <span className="text-lg">～</span>
          <div className="flex items-center gap-2">
            <Label className="font-bold whitespace-nowrap">終了日</Label>
            <Input
              type="date"
              name="endDate"
              value={endDate}
              onChange={onChange}
              className="w-40"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
