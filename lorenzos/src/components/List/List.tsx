import React, { memo } from 'react';
import MuiList from '@material-ui/core/List';
import MuiListSubheader from '@material-ui/core/ListSubheader';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlusIcon from '@material-ui/icons/AddCircle';
import Divider from '@material-ui/core/Divider';

/*
        <ListSubheader color="primary" style={{ paddingRight: 0 }}>
          <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" pb={0.5}>
            <Typography variant="h6">Tours</Typography>
            <Tooltip title="Create Tour">
              <IconButton aria-label="Create Tour" color="primary">
                <PlusIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Divider />
        </ListSubheader>
*/

interface ListProps {
  label: string;
  creatable: boolean;
  children: React.ReactNode;
}

const List = ({ label, creatable, children }: ListProps) => {
  return (
    <MuiList>
      <MuiListSubheader color="primary" style={{ paddingRight: 0 }}>
        <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" pb={0.5}>
          <Typography variant="h6" component="h2" style={{ fontWeight: 700 }}>
            {label}
          </Typography>
          {creatable && (
            <IconButton aria-label="Create Tour" color="primary">
              <PlusIcon />
            </IconButton>
          )}
        </Box>
        <Divider />
      </MuiListSubheader>
      {children}
    </MuiList>
  );
};

export default memo(List);
