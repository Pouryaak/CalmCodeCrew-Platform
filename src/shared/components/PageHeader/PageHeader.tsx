import { Button, Divider, Typography } from '@mui/material';
import { PageHeaderContainer } from './PageHeader.styles';
import { ElementType } from 'react';

interface PageHeaderProps {
  title: string;
  buttonOptions?: {
    title: string;
    onClick: () => void;
    Icon: ElementType;
    loading: boolean;
  };
}

const PageHeader = ({ title, buttonOptions }: PageHeaderProps) => {
  return (
    <>
      <PageHeaderContainer>
        <Typography variant="h5">{title}</Typography>
        {buttonOptions && (
          <Button
            variant="contained"
            onClick={buttonOptions.onClick}
            endIcon={<buttonOptions.Icon />}
            disabled={buttonOptions.loading}
          >
            {buttonOptions.loading ? 'Loading' : buttonOptions.title}
          </Button>
        )}
      </PageHeaderContainer>
      <Divider />
    </>
  );
};

export default PageHeader;
