import { Chip, CircularProgress, Fade } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

interface DraftStatusIndicatorProps {
  isSaving: boolean;
  isSaved: boolean;
}

export const DraftStatusIndicator = ({ isSaving, isSaved }: DraftStatusIndicatorProps) => {
  if (isSaving) {
    return (
      <Fade in>
        <Chip
          icon={<CircularProgress size={16} />}
          label="Saving..."
          color="default"
          size="small"
        />
      </Fade>
    );
  }

  if (isSaved) {
    return (
      <Fade in>
        <Chip
          icon={<CheckCircle />}
          label="Draft saved"
          color="success"
          size="small"
        />
      </Fade>
    );
  }

  return null;
};
