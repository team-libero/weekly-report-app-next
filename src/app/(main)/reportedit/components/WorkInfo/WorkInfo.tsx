import { Card, CardContent } from '@/components/ui/card';
import { WorkStatusSectionPage } from './WorkStatusSection';
import { WorkContentSection } from './WorkContentSection';

interface FormData {
  averageOvertime: string;
  minimumWorkTime: string;
  reachability: string;
  progress: string;
  condition: string;
  relationship: string;
  workContent: string;
  difficulty: string;
  schedule: string;
  failure: string;
  impression: string;
  otherEmployees: string;
}

interface WorkInfoProps {
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

export const WorkInfo = ({ formData, onChange }: WorkInfoProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4">業務内容</h2>
        <div className="space-y-8">
          <WorkStatusSectionPage formData={formData} onChange={onChange} />
          <WorkContentSection formData={formData} onChange={onChange} />
        </div>
      </CardContent>
    </Card>
  );
};
