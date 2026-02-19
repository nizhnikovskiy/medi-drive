import { useState } from 'react';
import { Box, Button, Toolbar, Typography, Tooltip } from '@mui/material';
import { DeleteSweep } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { clearAllDrafts, selectDrafts } from '@/features/serviceLogs/serviceLogsSlice';
import { useSnackbar } from '@/components/feedback/SnackbarProvider';
import { DraftsTable } from './DraftsTable';
import { DraftEditDialog } from './DraftEditDialog';

export const DraftsView = () => {
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbar();
  const drafts = useAppSelector(selectDrafts);

  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null);

  const handleClearAll = () => {
    if (drafts.length === 0) return;
    dispatch(clearAllDrafts());
    showSnackbar('All drafts cleared', 'info');
  };

  return (
    <Box>
      <Toolbar disableGutters sx={{ mb: 1, gap: 2 }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1, fontWeight: 600 }}>
          {drafts.length} {drafts.length === 1 ? 'draft' : 'drafts'}
        </Typography>
        <Tooltip title="Remove all saved drafts" arrow>
          <span>
            <Button
              startIcon={<DeleteSweep />}
              variant="outlined"
              color="warning"
              onClick={handleClearAll}
              disabled={drafts.length === 0}
              size="small"
            >
              Clear All Drafts
            </Button>
          </span>
        </Tooltip>
      </Toolbar>

      <DraftsTable drafts={drafts} onRowClick={setSelectedDraftId} />

      {selectedDraftId && (
        <DraftEditDialog
          draftId={selectedDraftId}
          onClose={() => setSelectedDraftId(null)}
        />
      )}
    </Box>
  );
};
