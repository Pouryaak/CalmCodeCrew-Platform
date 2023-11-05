import { Button, Divider, Typography } from '@mui/material';
import { PageHeaderContainer } from './PageHeader.styles';
import { ElementType } from 'react';

interface PageHeaderProps {
  title: string;
  buttonOptions?: {
    title: string;
    onClick: () => void;
    Icon: ElementType;
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
          >
            {buttonOptions.title}
          </Button>
        )}
      </PageHeaderContainer>
      <Divider />
    </>
  );
};

export default PageHeader;
