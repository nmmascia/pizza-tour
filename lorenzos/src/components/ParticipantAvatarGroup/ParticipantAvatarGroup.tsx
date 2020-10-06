import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/Icon';

interface ParticipantAvatarGroupProps {
  participants: Array<{
    id: number;
    username: string;
  }>;
  activeIds: number[];
  onClick: (value: number) => void;
}

const ACTIVE_STYLES = {
  height: 35,
  width: 35,
  border: '2px solid #FEA430',
};

const INACTIVE_STYLES = {
  height: 30,
  width: 30,
  margin: '0 4px',
  filter: 'grayscale(80%)',
};

const ParticipantAvatarGroup = ({ participants, activeIds, onClick }: ParticipantAvatarGroupProps) => {
  return (
    <Box minHeight="40px" display="flex" justifyContent="center" alignItems="center" py={1}>
      {participants.map(({ id, username }) => {
        const style = activeIds.includes(id) ? ACTIVE_STYLES : INACTIVE_STYLES;

        return (
          <Tooltip key={id} title={username}>
            <Avatar
              onClick={() => {
                onClick(id);
              }}
              style={style}
              src="https://cdn.vox-cdn.com/thumbor/yZVpqUtmjd-8KWtxb5pXz5Y8RKc=/85x0:1013x619/1200x800/filters:focal(85x0:1013x619)/cdn.vox-cdn.com/uploads/chorus_image/image/47771399/tmnt.0.0.jpg"
            />
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default memo(ParticipantAvatarGroup);
