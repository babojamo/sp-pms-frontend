import { SelectItem } from 'primereact/selectitem';
import UtilityService from '../services/UtilityService';
import { Department } from '../types/department';
import { useState } from 'react';
import { Section } from '../types/section';
import { Process } from '../types/process';
import { Operator } from '../types/operator';

export default function useUtilityData() {
  const [isDepartmentLoading, setIsDepartmentLoading] = useState<boolean>(false);
  const [isSectionLoading, setIsSectionLoading] = useState<boolean>(false);
  const [isProcessLoading, setIsProcessLoading] = useState<boolean>(false);
  const [isOperatorLoading, setIsOperatorLoading] = useState<boolean>(false);

  const fetchItemTypes = async (): Promise<string[]> => {
    const { data } = await UtilityService.itemTypes();
    return data;
  };

  const fetchBuyers = async (): Promise<string[]> => {
    const { data } = await UtilityService.buyers();
    return data;
  };

  const fetchOperators = async (): Promise<Operator[]> => {
    try {
      setIsOperatorLoading(true);
      const { data } = await UtilityService.operators();
      return data;
    } catch (error) {
      throw error;
    } finally {
      setIsOperatorLoading(false);
    }
  };

  const fetchDepartments = async (): Promise<Department[]> => {
    try {
      setIsDepartmentLoading(true);
      const { data } = await UtilityService.departments();
      return data;
    } catch (error) {
      throw error;
    } finally {
      setIsDepartmentLoading(false);
    }
  };

  const fetchProcesses = async (): Promise<Process[]> => {
    try {
      setIsProcessLoading(true);
      const { data } = await UtilityService.processes();
      return data;
    } catch (error) {
      throw error;
    } finally {
      setIsProcessLoading(false);
    }
  };

  const fetchSections = async (): Promise<Section[]> => {
    try {
      setIsSectionLoading(true);
      const { data } = await UtilityService.sections();
      return data;
    } catch (error) {
      throw error;
    } finally {
      setIsSectionLoading(false);
    }
  };

  const fetchSectionSelectOption = async (): Promise<SelectItem[]> => {
    const data = await fetchSections();
    return data.map((b: Section) => ({ value: b.id, label: b.name }));
  };

  const fetchBuyersSelectOption = async (): Promise<SelectItem[]> => {
    const data = await fetchBuyers();
    return data.map((b: string) => ({ value: b, label: b }));
  };

  const fetchDepartmentOptions = async (): Promise<SelectItem[]> => {
    const data = await fetchDepartments();
    return data.map((d: Department) => ({ value: d.id, label: d.name }));
  };

  const fetchSectionOptions = async (): Promise<SelectItem[]> => {
    const data = await fetchSections();
    return data.map((d: Section) => ({ value: d.id, label: d.name }));
  };

  const fetchProcessOptions = async (): Promise<SelectItem[]> => {
    const data = await fetchProcesses();
    return data.map((d: Process) => ({ value: d.id, label: d.name }));
  };

  const fetchOperatorOptions = async (): Promise<SelectItem[]> => {
    const data = await fetchOperators();
    return data.map((d: Operator) => ({ value: d.id, label: d.name }));
  };

  return {
    fetchItemTypes,
    fetchBuyersSelectOption,
    fetchBuyers,
    fetchDepartments,
    fetchDepartmentOptions,
    fetchSections,
    fetchSectionOptions,
    fetchProcesses,
    fetchSectionSelectOption,
    fetchProcessOptions,
    fetchOperators,
    fetchOperatorOptions,
    isOperatorLoading,
    isDepartmentLoading,
    isSectionLoading,
    isProcessLoading
  };
}
