import { useEffect, useState } from 'react';

export const useEmployeeData = (employeeId: string) => {
  const [employee, setEmployee] = useState<{
    id: string;
    lastName: string;
    firstName: string;
  }>();
  const [teamLeaders, setTeamLeaders] = useState<
    Array<{ id: string; name: string; teamName: string }>
  >([]);
  const [salesEmployees, setSalesEmployees] = useState<
    Array<{
      id: string;
      name: string;
    }>
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeeResponse, teamLeadersResponse, salesEmployeesResponse] =
          await Promise.all([
            fetch(`/api/employee/${employeeId}`),
            fetch('/api/leaders'),
            fetch('/api/sales-employee'),
          ]);

        const [employeeData, teamLeadersData, salesEmployeesData] =
          await Promise.all([
            employeeResponse.json(),
            teamLeadersResponse.json(),
            salesEmployeesResponse.json(),
          ]);

        setEmployee(employeeData);
        setTeamLeaders(teamLeadersData);
        setSalesEmployees(salesEmployeesData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [employeeId]);

  return {
    employee,
    teamLeaders,
    salesEmployees,
  };
};
