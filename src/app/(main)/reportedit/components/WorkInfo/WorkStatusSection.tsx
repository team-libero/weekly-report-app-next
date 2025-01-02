import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StatusSelect } from './StatusSelect';

interface FormData {
  averageOvertime: string;
  minimumWorkTime: string;
  reachability: string;
  progress: string;
  condition: string;
  relationship: string;
}

interface WorkStatusSectionPageProps {
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
}

export const WorkStatusSectionPage = ({
  formData,
  onChange,
}: WorkStatusSectionPageProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label className="font-bold whitespace-nowrap">平均残業時間</Label>
          <Input
            name="averageOvertime"
            value={formData.averageOvertime}
            onChange={onChange}
            className="w-24"
          />
          <span>時間</span>
        </div>
        <div className="flex items-center gap-2">
          <Label className="font-bold whitespace-nowrap">最低稼働時間</Label>
          <Input
            name="minimumWorkTime"
            value={formData.minimumWorkTime}
            onChange={onChange}
            className="w-24"
          />
          <span>時間</span>
        </div>
        <div>
          <select
            name="reachability"
            value={formData.reachability}
            onChange={onChange}
            className="rounded-md border border-input bg-background px-3 py-2"
          >
            <option value="">-</option>
            <option value="1">到達できる</option>
            <option value="2">到達できない</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <StatusSelect
          label="進捗状況"
          name="progress"
          value={formData.progress}
          onChange={onChange}
        />
        <StatusSelect
          label="体調"
          name="condition"
          value={formData.condition}
          onChange={onChange}
        />
        <StatusSelect
          label="現場の上位会社メンバーとの人間関係"
          name="relationship"
          value={formData.relationship}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
