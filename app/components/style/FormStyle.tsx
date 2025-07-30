'use client';

import { SelectItem } from 'primereact/selectitem';
import FormCalendar from '../form/calendar/component';
import FormDropdown from '../form/dropdown/component';
import FormInputText from '../form/input-text/component';

interface FormStyleProps {
    styleOptions: SelectItem[];
}

const FormStyle = ({ styleOptions = [] }: FormStyleProps) => {
    return (
        <>
            <FormInputText label="Control #" />
            <FormInputText label="Buyer Name" />
            <FormInputText label="Style #" />
            <FormInputText label="Pleats Name" />
            <FormDropdown label="Item Type" options={styleOptions} />
            <FormCalendar className="md:w-14rem" label="Ship Date form Japan" />
            <FormCalendar className="md:w-14rem" label="Ship Date form Cebu" />
            <FormInputText label="Noumae" />
            <FormInputText label="Sample" />
            <FormInputText label="Pattern" />
        </>
    );
};

export default FormStyle;
