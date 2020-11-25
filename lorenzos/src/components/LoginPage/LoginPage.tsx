import React, { memo, useState } from 'react';
import Box from '@material-ui/core/Box';
import Form from '@rjsf/material-ui';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import { useMutation } from 'urql';
import PizzaIcon from '@material-ui/icons/LocalPizza';
import { useNavigate } from 'react-router-dom';

const LOGIN_MUTATION = `
  mutation($username: String!, $password: String!) {
    userLogin(username: $username, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

const LoginPage = () => {
  const [, loginMutation] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();
  const [, setError] = useState(false);

  return (
    <Box display="flex" minHeight="60vh" width="100%" alignItems="center" justifyContent="center">
      <Slide in direction="up">
        <Paper elevation={1} square variant="outlined">
          <Box position="relative" height="50px" width="100%" bgcolor="#910012">
            <Box
              position="absolute"
              left="calc(50% - 25px)"
              bottom="calc(0% - 25px)"
              borderRadius="50%"
              height="50px"
              width="50px"
              bgcolor="white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              border="5px solid #FEA430"
            >
              <PizzaIcon fontSize="large" color="primary" />
            </Box>
          </Box>
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
              uiSchema={{
                password: {
                  'ui:widget': 'password',
                },
              }}
              onSubmit={async ({ formData }) => {
                try {
                  const response = await loginMutation(formData);
                  localStorage.setItem('token', response.data.userLogin.token);
                  navigate(`/user/${response.data.userLogin.user.id}`);
                } catch (error) {
                  setError(true);
                }
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="center" pt={1}>
                <Button type="submit" color="primary" variant="contained" size="small">
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
