import useUtilityData from '@/app/hooks/useUtilityData';
import { OperatorProcessService } from '@/app/services/OperatorProcessService';
import { ProductionTrackService } from '@/app/services/ProductionTrackService';
import { DefaultFormData } from '@/app/types/form';
import { Operator, OperatorProcess } from '@/app/types/operator';
import { ProductionTrack } from '@/app/types/production-track';
import { generateSimpleId } from '@/app/utils';
import { LayoutContext } from '@/layout/context/layoutcontext';
import moment from 'moment';
import { SelectItem } from 'primereact/selectitem';
import { useContext, useEffect, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

interface TrackFilter {
  date?: any;
  section_id?: any;
  process_ids?: string[];
}

export interface FormData extends DefaultFormData {
  tracks: ProductionTrack[];
}

export const useProductionOperations = () => {
  const [loadings, setLoadings] = useState<{
    fetchingProcesses: boolean;
    fetchingOperator: boolean;
    fetchingSections: boolean;
    storingTracks: boolean;
    fetchingTracks: boolean;
  }>({
    fetchingProcesses: false,
    fetchingOperator: false,
    fetchingSections: false,
    storingTracks: false,
    fetchingTracks: false
  });

  const [trackFilter, setTrackFilter] = useState<TrackFilter>({
    date: new Date()
  });
  const [selectedOperatorProcess, setSelectedOperatorProcess] = useState<OperatorProcess | undefined>();
  const [productionTracks, setProductionTracks] = useState<ProductionTrack[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [operatorsOption, setOperatorsOption] = useState<SelectItem[]>([]);
  const [processOptions, setProcessOptions] = useState<SelectItem[]>();
  const [sewingLineOptions, setSewingLineOptions] = useState<SelectItem[]>();
  const [tracksToDelete, setTracksToDelete] = useState<string[]>([]);
  const { showApiError, showSuccess } = useContext(LayoutContext);
  const { fetchProcessOptions, fetchOperators, fetchSectionSelectOption } = useUtilityData();
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      tracks: []
    }
  });

  const { append, remove } = useFieldArray({
    control,
    name: 'tracks'
  });

  const items = useWatch({ control, name: 'tracks' }) || [];

  const addNewItem = () => {
    append(emptyItem());
  };

  const emptyItem = (): ProductionTrack => ({
    id: generateSimpleId() + (items?.length + 1).toString(),
    date: trackFilter.date,
    section_id: trackFilter.section_id,
    target: 0,
    process_id: '',
    operator_id: '',
    remarks: ''
  });

  const setLoading = (loading: any) => {
    setLoadings({
      ...loadings,
      ...loading
    });
  };

  const getProcessOptions = (rowIndex: number): SelectItem[] => {
    const option = items[rowIndex];
    return operators?.find((s) => s.id == option.operator_id)?.operator_processes?.map((p) => ({ value: p.process.id, label: p.process.name })) ?? [];
  };

  const storeTracks = async (e: FormData) => {
    try {
      setLoading({ storingTracks: true });
      await ProductionTrackService.storeTracks({
        tracks: e.tracks.map((r) => ({
          id: r.id ?? false,
          date: r.date,
          section_id: trackFilter.section_id,
          operator_id: r.operator_id ?? '',
          process_id: r.process_id ?? '',
          target: r.target,
          remarks: r.remarks
        })),
        delete_tracks: tracksToDelete
      });
      showSuccess('Production process successfully saved.');
    } catch (e: any) {
      showApiError(e, 'Error saving production process.');
    } finally {
      setLoading({ storingTracks: false });
    }
  };

  const fetchTracks = async () => {
    try {
      setLoading({ fetchingTracks: true });

      const { data } = await ProductionTrackService.getTracks(trackFilter.section_id, {
        track_date: moment(trackFilter.date).format('YYYY-MM-DD'),
        process_ids: trackFilter.process_ids
      });

      reset();

      data.forEach((d) => {
        append({
          id: d.id,
          date: d.date,
          section_id: d.section_id,
          operator_id: d.operator_id,
          process_id: d.process_id,
          target: d.target,
          remarks: d.remarks
        });
      });
      addNewItem();
    } catch (e: any) {
      showApiError(e, 'Error fetching production process.');
    } finally {
      setLoading({ fetchingTracks: false });
    }
  };

  useEffect(() => {
    if (trackFilter.section_id) fetchTracks();
  }, [trackFilter]);

  const initData = () => {
    setLoading({ fetchingProcesses: true, fetchingOperator: true, fetchingSections: true });

    // Fetch processes
    fetchProcessOptions()
      .then((data) => {
        setProcessOptions(data);
      })
      .finally(() => setLoading({ fetchingProcesses: false }));

    // Fetch processes
    fetchOperators()
      .then((data) => {
        setOperators(data);
        setOperatorsOption(data.map((r) => ({ label: r.name, value: r.id })));
      })
      .finally(() => setLoading({ fetchingOperator: false }));

    // Fetch sections
    fetchSectionSelectOption()
      .then((data) => {
        setSewingLineOptions(data);
      })
      .finally(() =>
        setTimeout(() => {
          setLoading({ fetchingSections: false });
        }, 1000)
      );
  };

  const onProcessDeleteClick = (id: any) => {
    setProductionTracks(productionTracks.filter((e) => e.id != id));
  };

  const fetchProcess = async (process_id: any) => {
    return await OperatorProcessService.getProcess(process_id);
  };

  const removeTrack = (track: ProductionTrack, rowIndex: number) => {
    setTracksToDelete([...tracksToDelete, track.id ?? '']);
    remove(rowIndex);
  };

  return {
    onProcessDeleteClick,
    setProductionTracks,
    setSelectedOperatorProcess,
    getProcessOptions,
    handleSubmit,
    reset,
    removeTrack,
    fetchProcess,
    initData,
    addNewItem,
    storeTracks,
    fetchTracks,
    operatorsOption,
    sewingLineOptions,
    processOptions,
    productionTracks,
    selectedOperatorProcess,
    loadings,
    operators,
    items,
    control,
    trackFilter,
    setTrackFilter
  };
};
