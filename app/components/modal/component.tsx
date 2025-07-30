import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

interface ModalProps {
    visible?: boolean;
    onHide?: any;
    onConfirm?: any;
    children?: any;
    title?: string;
    confirmSeverity?: 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'help' | undefined;
    cancelSeverity?: 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'help' | undefined;
}

const Modal = ({ visible, onHide, onConfirm, children, title, confirmSeverity = 'success', cancelSeverity = 'secondary' }: ModalProps) => {
    return (
        <Dialog header={title} visible={visible} style={{ width: '40vw' }} onHide={onHide}>
            {children}
            <div className="flex">
                <div className="ml-auto">
                    <Button onClick={onConfirm} icon="pi pi-check" severity={confirmSeverity} label="Confirm" className="mr-2" />
                    <Button onClick={onHide} icon="pi pi-times" severity={cancelSeverity} label="Cancel" />
                </div>
            </div>
        </Dialog>
    );
};

export default Modal;
