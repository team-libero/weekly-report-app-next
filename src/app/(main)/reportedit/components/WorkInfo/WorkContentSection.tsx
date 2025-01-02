import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { InfoIcon } from 'lucide-react';

interface FormData {
  workContent: string;
  difficulty: string;
  schedule: string;
  failure: string;
  impression: string;
  otherEmployees: string;
}

interface WorkContentSectionProps {
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const WorkContentSection = ({
  formData,
  onChange,
}: WorkContentSectionProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label className="font-bold">作業内容</Label>
        <Textarea
          name="workContent"
          value={formData.workContent}
          onChange={onChange}
          className="h-24"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-3">
          <Label className="font-bold">難易度</Label>
          <Input
            name="difficulty"
            value={formData.difficulty}
            onChange={onChange}
          />
        </div>
        <div className="flex-3">
          <Label className="font-bold">スケジュール感</Label>
          <Input
            name="schedule"
            value={formData.schedule}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="flex item-center gap-1 text-red-500 mb-2">
        <Label>※難易度について </Label>
        <Popover>
          <PopoverTrigger>
            <InfoIcon className="h-4 w-4 cursor-pointer"></InfoIcon>
          </PopoverTrigger>
          <PopoverContent className="space-y-2">
            <ul className="list-disc pl-4 text-sm space-y-1">
              <li className="list-none">
                「一人前のエンジニアが通常求められるレベル」を、難易度：100と定めています。
              </li>
              <li>
                200以上：初めての言語での開発 サーバ構築などのインフラ系の作業
              </li>
              <li>
                150：開発環境の構築を主体的に行っている 各工程でのレビュアー作業
                WBSの管理やプロジェクトの進捗管理
                顧客折衝しながらの要件定義書作成
              </li>
              <li>
                130：先行開発作業 業務知識が多く求められる基本設計書作成
                他チームとの調整作業
              </li>
              <li>110：自チームの進捗管理 システムテストでの障害調査作業</li>
              <li>
                100：設計書の作成、修正 開発作業 結合テスト仕様書作成、修正
              </li>
              <li>
                70：単体テスト仕様書の作成、修正 単体テストでの障害調査作業
              </li>
              <li>50：テスト実施（打鍵者） 開発チュートリアル作業</li>
              <li>
                30以下：ログ収集や監視業務などの運用作業
                エビデンス整理やドキュメント類の整備作業
                キッティング等の事務系作業
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label className="font-bold">
          失敗したこと、指摘を受けた点（指摘した人も明記のこと）
        </Label>
        <Textarea
          name="failure"
          value={formData.failure}
          onChange={onChange}
          className="h-24"
        />
      </div>

      <div>
        <Label className="font-bold">
          所感（現場に対する苦情や困っていることや伝達事項なども記入）
        </Label>
        <Textarea
          name="impression"
          value={formData.impression}
          onChange={onChange}
          className="h-24"
        />
      </div>

      <div>
        <Label className="font-bold">現場で従事しているACT社員の状況</Label>
        <Textarea
          name="otherEmployees"
          value={formData.otherEmployees}
          onChange={onChange}
          className="h-24"
        />
      </div>
    </div>
  );
};
