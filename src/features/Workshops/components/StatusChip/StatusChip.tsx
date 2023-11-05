import Chip from '@mui/material/Chip';
import { WorkshopStatus } from '../../models';
import { capitalizeFirstLetter } from '../../../../utils';

interface StatusChipProps {
  status: WorkshopStatus;
}

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  const color =
    status === WorkshopStatus.UPCOMING
      ? 'primary'
      : status === WorkshopStatus.CANCELLED
      ? 'error'
      : 'success';

  return (
    <>
      <Chip label={capitalizeFirstLetter(status)} color={color} size="small" />
    </>
  );
};

export default StatusChip;
