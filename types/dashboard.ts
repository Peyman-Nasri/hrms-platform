export type DashboardOverviewProps = {
  totalEmployees: number;
  activeEmployees: number;
  openContracts: number;
};

export type QuickActionProps = {
  title: string;
  description: string;
  href: string;
};

export type StatCardProps = {
  title: string;
  value: string | number;
};
