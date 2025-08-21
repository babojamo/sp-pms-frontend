import { ProcessOffsetService } from "@/app/services/ProcessOffsetService";
import { DefaultFormData } from "@/app/types/form";
import { useState } from "react";


export const useProcessOffsetPage = () => {
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);

  const saveProcessOffset = async (e: DefaultFormData) => {
    try {
      setIsSaveLoading(true);
      const response = await ProcessOffsetService.createProcessOffset({
        name: e.name,
        description: e.description,
      });
      return response;
    } catch (error) {
      setIsSaveLoading(false);
      throw error;
    }
  }

  return {
    saveProcessOffset,
    isSaveLoading
  };
};
