import { Button } from 'primereact/button';

export enum FormActions {
    BACK = 'back',
    CANCEL = 'cancel',
    UPDATE = 'update',
    SAVE = 'save',
    DELETE = 'delete'
}
interface FormActionProps {
    actions?: string[];
    actionBack?: any;
    actionSave?: any;
    actionDelete?: any;
    actionUpdate?: any;
    actionCancel?: any;
}

const FormAction = ({ actions, actionCancel, actionBack, actionSave, actionDelete, actionUpdate }: FormActionProps) => {
    return (
        <div className="flex gap-2">
            {actions?.includes(FormActions.BACK) && <Button onClick={actionBack} type="button" label="Back" severity={'secondary'} icon="pi pi-arrow-left" />}
            {actions?.includes(FormActions.CANCEL) && <Button onClick={actionCancel} type="button" label="Cancel" severity={'secondary'} icon="pi pi-arrow-left" />}

            {actions?.includes(FormActions.SAVE) && <Button onClick={actionSave} type="submit" severity={'success'} label="Save" icon="pi pi-save" />}
            {actions?.includes(FormActions.UPDATE) && <Button onClick={actionUpdate} type="submit" severity={'warning'} label="Update" icon="pi pi-save" />}
            {actions?.includes(FormActions.DELETE) && <Button onClick={actionDelete} type="submit" label="Delete" icon="pi pi-trash" />}
        </div>
    );
};

export default FormAction;
