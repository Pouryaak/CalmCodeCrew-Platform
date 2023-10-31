import { Button, Divider, Typography } from '@mui/material';
import { PageHeaderContainer } from './PageHeader.styles';
import AddIcon from '@mui/icons-material/Add';

interface PageHeaderProps {
  title: string;
  onClick?: () => void;
}

const PageHeader = ({ title, onClick }: PageHeaderProps) => {
  return (
    <>
      <PageHeaderContainer>
        <Typography variant="h5">{title}</Typography>
        {onClick && (
          <Button variant="contained" onClick={onClick} endIcon={<AddIcon />}>
            Add
          </Button>
        )}
      </PageHeaderContainer>
      <Divider />
    </>
  );
};

export default PageHeader;
