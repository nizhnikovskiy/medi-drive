import { ReactNode } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';

interface FormDialogProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export const FormDialog = ({ title, onClose, children }: FormDialogProps) => (
  <Dialog open fullWidth maxWidth="lg" onClose={onClose}>
    <DialogTitle
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pb: 1,
      }}
    >
      <Typography variant="h6" component="span">
        {title}
      </Typography>
      <IconButton onClick={onClose} size="small" aria-label="close">
        <Close />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers sx={{ pt: 2 }}>
      {children}
    </DialogContent>
  </Dialog>
);
