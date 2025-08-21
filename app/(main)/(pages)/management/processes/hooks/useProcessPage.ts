import { ProcessService } from '@/app/services/ProcessService';
import { DefaultFormData } from '@/app/types/form';
import { useState } from 'react';

export const useProcessPage = () => {
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);

  const saveProcess = async (e: DefaultFormData) => {
    try {
      setIsSaveLoading(true);
      const response = await ProcessService.createProcess({
        name: e.name
      });
      return response;
    } catch (error) {
      setIsSaveLoading(false);
      throw error;
    }
  };

  return {
    saveProcess,
    isSaveLoading
  };
};
