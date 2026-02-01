import { ReactNode } from "react";

export type EntityHeaderProps = {
  title: string;
  newLabel: string;
  addLabel: string;
  renderForm: (onCreated: () => void) => ReactNode;
};

export type Option = {
  label: string;
  value: string;
};

export type FilterSelectProps = {
  paramKey: string;
  options: Option[];
  allowEmpty?: boolean;
  emptyLabel?: string;
  className?: string;
  size?: "sm" | "md";
};

export type LogoutConfirmModalProps = {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export type PaginationSummaryProps = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  makeHref: (page: number) => string;
  itemLabel?: string;
  showSummary?: boolean;
};

export type SearchBarProps = {
  paramKey?: string;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
};
