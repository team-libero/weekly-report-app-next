import { z } from 'zod';

export const weeklyReportSchema = z.object({
  startDate: z.string().min(1, '開始日は必須です'),
  endDate: z.string().min(1, '終了日は必須です'),
  selectedTeamLeader: z.string().min(1, 'チームLD名は必須です'),
  selectedSalesEmployee: z.string().min(1, '担当営業は必須です'),
  userCompanyName: z.string().min(1, 'ユーザー会社名は必須です'),
  primeContractorName: z.string().min(1, '元請会社名は必須です'),
  onsiteAddress: z.string().min(1, '現場住所は必須です'),
  fixedTime: z.string().min(1, '定時は必須です'),
  sourceOfSalesInfo: z.string().min(1, '情報源は必須です'),
  howToCollectSalesInfo: z.string().min(1, '情報収集手段は必須です'),
  salesInfo: z.string().min(1, '営業情報は必須です'),
  averageOvertime: z.string().min(1, '平均残業時間は必須です'),
  minimumWorkTime: z.string().min(1, '最低稼働時間は必須です'),
  reachability: z.string().min(1, '到達可否は必須です'),
  progress: z.string().min(1, '進捗状況は必須です'),
  condition: z.string().min(1, '体調は必須です'),
  relationship: z.string().min(1, '人間関係は必須です'),
  workContent: z.string().min(1, '作業内容は必須です'),
  difficulty: z.string().min(1, '難易度は必須です'),
  schedule: z.string().min(1, 'スケジュール感は必須です'),
  failure: z.string().min(1, '失敗・指摘は必須です'),
  impression: z.string().min(1, '所感は必須です'),
  otherEmployees: z.string().min(1, 'ACT社員の状況は必須です'),
});

export type WeeklyReportFormData = z.infer<typeof weeklyReportSchema>;
