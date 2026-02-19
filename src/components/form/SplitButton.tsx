import { useState, useRef } from 'react';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Tooltip,
} from '@mui/material';
import { ArrowDropDown, Save } from '@mui/icons-material';

interface SplitButtonProps {
  onCreateServiceLog: () => void;
  onSaveDraft: () => void;
}

export const SplitButton = ({
  onCreateServiceLog,
  onSaveDraft,
}: SplitButtonProps) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  const handleSaveDraft = () => {
    onSaveDraft();
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup 
        variant="contained" 
        ref={anchorRef}
        sx={{ boxShadow: 'none' }}
      >
        <Button
          size="large"
          startIcon={<Save />}
          onClick={onCreateServiceLog}
        >
          Create Service Log
        </Button>
        <Button
          size="small"
          onClick={handleToggle}
          sx={{ px: 1 }}
        >
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-end"
        sx={{ zIndex: 1, mt: 1 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper elevation={3}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem>
                  <Tooltip title="Save as Draft (Ctrl+S)" arrow placement="left">
                    <MenuItem onClick={handleSaveDraft}>
                      Save as Draft
                    </MenuItem>
                  </Tooltip>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
