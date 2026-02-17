export type EmployeesByStatusItem = { name: string; value: number };
export type MonthlyMetricItem = { month: string; value: number };
export type DonutItem = { name: string; value: number };

export type TwoLevelPieGroup = { name: string; value: number; fill?: string };
export type TwoLevelPieDetail = {
  name: string;
  value: number;
  group: string;
  fill?: string;
};

export const employeeStatusGroupData = [
  { name: "Working", value: 80 },
  { name: "Not Working", value: 20 },
];

export const employeeStatusDetailData = [
  { name: "Active", value: 68 },
  { name: "Onboarding", value: 12 },
  { name: "On Leave", value: 7 },
  { name: "Inactive", value: 13 },
];

export const employeesByStatusMock: EmployeesByStatusItem[] = [
  { name: "Active", value: 68 },
  { name: "Onboarding", value: 12 },
  { name: "On Leave", value: 7 },
  { name: "Inactive", value: 13 },
];

export const contractsByStatusMock: DonutItem[] = [
  { name: "Open", value: 22 },
  { name: "Pending", value: 9 },
  { name: "Signed", value: 31 },
  { name: "Expired", value: 6 },
];

export const headcountTrendMock: MonthlyMetricItem[] = [
  { month: "Aug", value: 98 },
  { month: "Sep", value: 105 },
  { month: "Oct", value: 112 },
  { month: "Nov", value: 121 },
  { month: "Dec", value: 128 },
  { month: "Jan", value: 135 },
];

export const contractsTrendMock: MonthlyMetricItem[] = [
  { month: "Aug", value: 18 },
  { month: "Sep", value: 21 },
  { month: "Oct", value: 24 },
  { month: "Nov", value: 22 },
  { month: "Dec", value: 27 },
  { month: "Jan", value: 29 },
];
