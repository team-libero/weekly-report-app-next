'use client';

import React, { useContext, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/contexts/UserContext';

interface Employee {
  emp_id: string;
  emp_lname: string;
  emp_fname: string;
  mail_address: string;
}

interface Teams {
  id: string;
  name: string;
}

interface Employee {
  emp_id: string;
  emp_lname: string;
  emp_fname: string;
  mail_address: string;
}

interface Teams {
  id: string;
  name: string;
}

export default function EmployeeTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [teams, setTeams] = useState<Teams[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState('all');
  const { role } = useContext(UserContext);
  const router = useRouter();

  // チーム一覧取得
  useEffect(() => {
    if (role === '1' || !role) {
      router.push('/error/');
      return;
    }
    const fetchTeams = async () => {
      try {
        const response = await fetch('/api/team');
        if (!response.ok) throw new Error('Failed to fetch teams');
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  // 社員一覧取得
  const fetchEmployees = async (teamId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/employeelist?teamId=${teamId}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(selectedTeam);
  }, [selectedTeam]);

  const handleTeamChange = (teamId: string) => {
    setSelectedTeam(teamId);
  };
  const handleSelect = (empId: string) => {
    router.push(`/reports?employeeId=${empId}`);
  };
  const LoadingRows = () => (
    <>
      {[1, 2, 3].map((index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-48" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-8 w-16 ml-auto" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm font-medium">チーム選択</span>
          <Select value={selectedTeam} onValueChange={handleTeamChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="-" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">-</SelectItem>
              {teams.map((team) => (
                <SelectItem key={team.id} value={team.id}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>社員ID</TableHead>
            <TableHead>氏名</TableHead>
            <TableHead>メールアドレス</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <LoadingRows />
          ) : employees.length > 0 ? (
            employees.map((employee) => (
              <TableRow key={employee.emp_id}>
                <TableCell className="font-medium">{employee.emp_id}</TableCell>
                <TableCell>{`${employee.emp_lname} ${employee.emp_fname}`}</TableCell>
                <TableCell>{employee.mail_address}</TableCell>
                <TableCell className="text-right">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    variant="secondary"
                    size="sm"
                    onClick={() => handleSelect(employee.emp_id)}
                  >
                    選択
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                データが存在しません
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
