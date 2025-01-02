import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Employee {
  id: string;
  lastName: string;
  firstName: string;
}

interface TeamLeader {
  id: string;
  name: string;
  teamName: string;
}

interface SalesEmployee {
  id: string;
  name: string;
}

interface FormData {
  selectedTeamLeader: string;
  selectedSalesEmployee: string;
  userCompanyName: string;
  primeContractorName: string;
  onsiteAddress: string;
  fixedTime: string;
}

interface SiteInfoSectionProps {
  employee: Employee | undefined;
  teamLeaders: TeamLeader[];
  salesEmployees: SalesEmployee[];
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

export const SiteInfoSectionPage = ({
  employee,
  teamLeaders,
  salesEmployees,
  formData,
  onChange,
}: SiteInfoSectionProps) => {
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4">現場基本情報</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="font-bold">氏名</Label>
            <div className="p-2 ">
              {employee ? `${employee.lastName} ${employee.firstName}` : ''}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="font-bold">所属チームLD名</Label>
            <select
              name="selectedTeamLeader"
              value={formData.selectedTeamLeader}
              onChange={onChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="">選択してください</option>
              {teamLeaders.map((leader) => (
                <option key={leader.id} value={leader.id}>
                  {`${leader.name} (${leader.teamName})`}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label className="font-bold">自社担当営業</Label>
            <select
              name="selectedSalesEmployee"
              value={formData.selectedSalesEmployee}
              onChange={onChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="">選択してください</option>
              {salesEmployees.map((sales) => (
                <option key={sales.id} value={sales.id}>
                  {`${sales.name}`}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <div className="space-y-2">
            <Label className="font-bold">ユーザー会社名</Label>
            <Input
              name="userCompanyName"
              value={formData.userCompanyName}
              onChange={onChange}
              placeholder=""
            />
          </div>
          <div className="space-y-2">
            <Label className="font-bold">元請会社名</Label>
            <Input
              name="primeContractorName"
              value={formData.primeContractorName}
              onChange={onChange}
              placeholder=""
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div className="space-y-2">
            <Label className="font-bold">現場住所</Label>
            <Input
              name="onsiteAddress"
              value={formData.onsiteAddress}
              onChange={onChange}
              placeholder="東京都新宿区新宿1-11-5 不二越ビル4F"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div className="space-y-2">
            <Label className="font-bold">定時</Label>
            <Input
              name="fixedTime"
              value={formData.fixedTime}
              onChange={onChange}
              placeholder="HH:MM～HH:MM ※金曜日はHH:MM～HH:MMの定時退社日"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
