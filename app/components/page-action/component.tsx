import { Button } from 'primereact/button';

export enum PageActions {
    BACK = 'back',
    ADD = 'add'
}
interface PageActionProps {
    actions?: string[];
    actionBack?: any;
    actionAdd?: any;
}

const PageAction = ({ actions, actionBack, actionAdd }: PageActionProps) => {
    return (
        <>
            {actions?.includes(PageActions.BACK) && <Button onClick={actionBack} label="Back" icon="pi pi-arrow-left" style={{ marginRight: '.5em' }} />}
            {actions?.includes(PageActions.ADD) && <Button onClick={actionAdd} label="New" icon="pi pi-plus" style={{ marginRight: '.5em' }} />}
        </>
    );
};

export default PageAction;
