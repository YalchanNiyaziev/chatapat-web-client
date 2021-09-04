import { confirmDialog } from 'primereact/confirmdialog';

const useConfirmDialog = props => {
    const confirm = props => confirmDialog(props);
    return confirm
};

export default useConfirmDialog;
