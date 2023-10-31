import PageHeader from '../../../../shared/PageHeader/PageHeader';
import { useModal } from '../../../../shared/hooks/useModal';
import { WorkshopModalType } from '../../models';
import WorkshopModal from '../WorkshopModal/WorkshopModal';

const WorkshopHeader = () => {
  const { showModal, isOpen, hideModal } = useModal();

  return (
    <>
      <PageHeader title="Workshops" onClick={() => showModal()} />
      <WorkshopModal
        type={WorkshopModalType.ADD}
        open={isOpen}
        handleClose={hideModal}
      />
    </>
  );
};

export default WorkshopHeader;
