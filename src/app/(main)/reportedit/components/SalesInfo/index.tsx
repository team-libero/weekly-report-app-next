import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FormData {
  sourceOfSalesInfo: string;
  howToCollectSalesInfo: string;
  salesInfo: string;
}

interface SalesInfoProps {
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const SalesInfoPage = ({ formData, onChange }: SalesInfoProps) => {
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4">営業に関する情報</h2>
        <div className="mb-4 ml-4 space-y-1 text-sm">
          <p>・PJやチームの今後の展開（増員や減員など）</p>
          <p>・自分自身の延長や途中切り上げなどの情報</p>
          <p>・他のACT社員の評判</p>
          <p>・誰からの情報かできるだけ記入してください</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="font-bold">
              情報源（上位会社 ・ 協力会社 ・ ACT社員 ・ その他）
            </Label>
            <Input
              name="sourceOfSalesInfo"
              value={formData.sourceOfSalesInfo}
              onChange={onChange}
              placeholder=""
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold">
              情報収集手段（直接問合せ ・ 先輩社員から ・ 全体周知 ・
              小耳に挟んだ ・ その他）
            </Label>
            <Input
              name="howToCollectSalesInfo"
              value={formData.howToCollectSalesInfo}
              onChange={onChange}
              placeholder=""
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold">営業に関する情報</Label>
            <Textarea
              name="salesInfo"
              value={formData.salesInfo}
              onChange={onChange}
              placeholder=""
              className="h-24"
              maxLength={500}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
