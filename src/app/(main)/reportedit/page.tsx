'use client';

import React, { useContext, useEffect } from 'react';
import { UserContext } from '@/contexts/UserContext';
import { PeriodSectionPage } from './components/BasicInfo/PeriodSection';
import { SiteInfoSectionPage } from './components/BasicInfo/SiteInfoSection';
import { SalesInfoPage } from './components/SalesInfo';
import { WorkInfo } from './components/WorkInfo/WorkInfo';
import { useWeeklyReport } from '@/hooks/useWeeklyReports';
import { useEmployeeData } from '@/hooks/useEmployeeData';
import { Top } from './components/Top';
import { Bottom } from './components/Bottom';
import { useSearchParams } from 'next/navigation';

export const ReportEditPage = () => {
  const searchParams = useSearchParams();
  const reportId = searchParams.get('reportId');
  const { employeeId } = useContext(UserContext);
  const {
    formData,
    isSubmitting,
    handleChange,
    handleClear,
    handleCopy,
    handleSubmit,
    setFormData,
  } = useWeeklyReport(employeeId);
  const { employee, teamLeaders, salesEmployees } = useEmployeeData(employeeId);

  useEffect(() => {
    const fetchData = async () => {
      if (reportId) {
        try {
          const response = await fetch(`/api/report/detail/${reportId}`);
          const data = await response.json();

          const startDate = data.periodStartDate
            ? data.periodStartDate.split('T')[0]
            : '';
          const endDate = data.periodEndDate
            ? data.periodEndDate.split('T')[0]
            : '';

          setFormData({
            startDate: startDate,
            endDate: endDate,
            selectedTeamLeader: data.leaderEmployeeId,
            selectedSalesEmployee: data.salesEmployeeId,
            userCompanyName: data.userCompanyName,
            primeContractorName: data.primeContractorName,
            onsiteAddress: data.onsiteAddress,
            fixedTime: data.fixedTime,
            sourceOfSalesInfo: data.sourceOfSalesInfo,
            howToCollectSalesInfo: data.howToCollectSalesInfo,
            salesInfo: data.salesInfo,
            averageOvertime: data.averageOvertime,
            workContent: data.workContent,
            minimumWorkTime: data.minimumWorkTime,
            reachability: data.reachability,
            progress: data.progress,
            condition: data.physicalCondition,
            relationship: data.relationship,
            failure: data.failurePointedOut,
            impression: data.impression,
            difficulty: data.difficultyLevel,
            schedule: data.senseOfSchedule,
            otherEmployees: data.situationOfOtherEmployees,
          });
        } catch (error) {
          console.error('Failed to fetch report data:', error);
        }
      }
    };
    fetchData();
  }, [reportId]);

  return (
    <div className="container mx-auto pb-8">
      {/* TOP */}
      <Top onClear={handleClear} onCopy={handleCopy} disabled={isSubmitting} />

      {/* 期間  */}
      <PeriodSectionPage
        startDate={formData.startDate}
        endDate={formData.endDate}
        onChange={handleChange}
      />

      {/* 現場基本情報  */}
      <SiteInfoSectionPage
        employee={employee}
        teamLeaders={teamLeaders}
        salesEmployees={salesEmployees}
        formData={formData}
        onChange={handleChange}
      />

      {/* 営業情報 */}
      <SalesInfoPage formData={formData} onChange={handleChange} />

      {/* 業務内容 */}
      <WorkInfo formData={formData} onChange={handleChange} />

      {/* BOTTOM */}
      <Bottom
        disabled={isSubmitting}
        onClick={handleSubmit}
        isEdit={!!reportId}
      />
    </div>
  );
};

export default ReportEditPage;
