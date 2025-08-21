import { SewingLineService } from '@/app/services/SewingLineService';
import { DefaultFormData } from '@/app/types/form';
import { useState } from 'react';

export const useSewingLinePage = () => {
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);

  const saveSewingLine = async (e: DefaultFormData) => {
    try {
      setIsSaveLoading(true);
      const response = await SewingLineService.createSewingLine({
        name: e.name
      });
      return response;
    } catch (error) {
      setIsSaveLoading(false);
      throw error;
    }
  };

  return {
    saveSewingLine,
    isSaveLoading
  };
};
