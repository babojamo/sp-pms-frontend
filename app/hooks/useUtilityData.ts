import { SelectItem } from 'primereact/selectitem';
import UtilityService from '../services/UtilityService';
import { Department } from '../types/department';
import { useState } from 'react';

export default function useUtilityData() {
  const [isDepartmentLoading, setIsDeparmentLoading] = useState<boolean>(false);

  const fetchItemTypes = async (): Promise<string[]> => {
    const { data } = await UtilityService.itemTypes();
    return data;
  };

  const fetchBuyers = async (): Promise<string[]> => {
    const { data } = await UtilityService.buyers();
    return data;
  };

  const fetchDepartments = async (): Promise<Department[]> => {
    try {
      setIsDeparmentLoading(true);
      const { data } = await UtilityService.departments();
      return data;
    } catch (error) {
      throw error;
    } finally {
      setIsDeparmentLoading(false);
    }
  };

  const fetchBuyersSelectOption = async (): Promise<SelectItem[]> => {
    const data = await fetchBuyers();
    return data.map((b: string) => ({ value: b, label: b }));
  };

  const fetchDepartmentOptions = async (): Promise<SelectItem[]> => {
    const data = await fetchDepartments();
    return data.map((d: Department) => ({ value: d.id, label: d.name }));
  };

  return {
    fetchItemTypes,
    fetchBuyersSelectOption,
    fetchBuyers,
    fetchDepartments,
    fetchDepartmentOptions,
    isDepartmentLoading
  };
}
