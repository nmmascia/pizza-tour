import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import Form from '@rjsf/material-ui';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

const LoginPage = () => {
  return (
    <Box display="flex" minHeight="60vh" width="100%" alignItems="center" justifyContent="center">
      <Slide in direction="up">
        <Paper elevation={1} square variant="outlined">
          <Box height="50px" width="100%" bgcolor="#910012" />
          <Box px={2} pb={2}>
            <Form
              schema={{
                type: 'object',
                required: ['username', 'password'],
                properties: {
                  username: {
                    type: 'string',
                    minLength: 1,
                    title: 'Username',
                  },
                  password: {
                    type: 'string',
                    minLength: 6,
                    title: 'Password',
                  },
                },
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="center" pt={1}>
                <Button color="primary" variant="contained" size="small">
                  Submit
                </Button>
              </Box>
            </Form>
          </Box>
        </Paper>
      </Slide>
    </Box>
  );
};

export default memo(LoginPage);
