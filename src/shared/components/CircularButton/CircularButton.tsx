import React from 'react';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { SxProps, Theme } from '@mui/system';

// Creating a styled IconButton for the contained look
const ContainedIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.secondary.main),
  backgroundColor: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
  boxShadow: theme.shadows[2],
  overflow: 'hidden',
}));

// Props definition for the reusable component
interface CircularButtonProps {
  Icon: React.ElementType; // Accepts a component to be used as the icon
  onClick: () => void; // onClick event handler
  color?: 'inherit' | 'default' | 'primary' | 'secondary'; // Color prop to override default color
  size?: 'small' | 'medium' | 'large';
  sx?: SxProps<Theme>; // Allows custom styles to be applied through the sx prop
}

const CircularButton: React.FC<CircularButtonProps> = ({
  Icon,
  onClick,
  color = 'primary',
  size = 'small',
  sx,
}) => {
  return (
    <ContainedIconButton
      aria-label="icon button"
      onClick={onClick}
      color={color}
      sx={sx}
      size={size}
    >
      <Icon />
    </ContainedIconButton>
  );
};

export default CircularButton;
