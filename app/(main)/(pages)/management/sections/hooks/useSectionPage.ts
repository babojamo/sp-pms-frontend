import { SectionService } from '@/app/services/SectionService';
import { DefaultFormData } from '@/app/types/form';
import { useState } from 'react';

export const useSectionPage = () => {
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);

  const saveSection = async (e: DefaultFormData) => {
    try {
      setIsSaveLoading(true);
      const response = await SectionService.createSection({
        name: e.name,
        department_id: e.department_id,
      });
      return response;
    } catch (error) {
      setIsSaveLoading(false);
      throw error;
    }
  };

  return {
    saveSection,
    isSaveLoading
  };
};
