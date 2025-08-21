import { StyleService } from '@/app/services/StyleService';
import { StyleCreatePayload, StylePaginatedResponse } from '@/app/types/api/styles';
import { DefaultFormData } from '@/app/types/form';
import { Style, StyleItem } from '@/app/types/styles';
import dayjs from 'dayjs';
import { useState } from 'react';

export const useStylePage = () => {

  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  const [styles, setStyles] = useState<Style[]>([]);
  const [isFetchStyleLoading, setIsFetchStyleLoading] = useState<boolean>(false);

  const formatStyleTable = ({ data }: StylePaginatedResponse): Style[] => {
    return data ?? [];
  };

  const fetchStyles = async () => {
    try {
      setIsFetchStyleLoading(true);
      const { data } = await StyleService.getStyles();
      setStyles(formatStyleTable(data));
    } catch (error) {
      setIsFetchStyleLoading(false);

      throw error;
    } finally {
      setIsFetchStyleLoading(false);

    }
  }

  const formatSavePayload = (data: DefaultFormData): StyleCreatePayload => {
    return {
      control_number: data.control_number ?? "",
      buyer_name: data.buyer_name ?? "",
      style_number: data.style_number ?? "",
      pleats_name: data.pleats_name ?? null,
      item_type: data.item_type ?? null,

      noumae: data.noumae ?? null,
      sample: data.sample ?? null,
      pattern: data.pattern ?? null,

      ship_date_from_japan: data.ship_date_from_japan
        ? dayjs(data.ship_date_from_japan).format("YYYY-MM-DD")
        : null,
      ship_date_from_cebu: data.ship_date_from_cebu
        ? dayjs(data.ship_date_from_cebu).format("YYYY-MM-DD")
        : null,
    };
  }

  const saveStyle = async (e: DefaultFormData, items?: StyleItem[]) => {
    try {
      if (!items || (items && !items.length)) throw new Error("Style items required.");
      setIsSaveLoading(true);
      const response = await StyleService.createStyle(formatSavePayload(e));
      return response;
    } catch (error) {
      setIsSaveLoading(false);
      throw error;
    }
  }

  return {
    isSaveLoading,
    saveStyle,
    styles,
    isFetchStyleLoading,
    fetchStyles,
  };
};
