import { SelectItem } from 'primereact/selectitem';
import UtilityService from '../services/UtilityService';

export default function useUtilityData() {
  const fetchItemTypes = async (): Promise<string[]> => {
    const { data } = await UtilityService.itemTypes();
    return data;
  };

  const fetchBuyers = async (): Promise<string[]> => {
    const { data } = await UtilityService.buyers();
    return data;
  };

  const fetchBuyersSelectOption = async (): Promise<SelectItem[]> => {
    const data = await fetchBuyers();
    return data.map((b: string) => ({ value: b, label: b }));
  };

  return {
    fetchItemTypes,
    fetchBuyersSelectOption,
    fetchBuyers
  };
}
