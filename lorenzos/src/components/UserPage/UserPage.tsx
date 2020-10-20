import React from 'react';
import Box from '@material-ui/core/Box';
import { useQuery } from 'urql';
import useAutheticated from '../../hooks/useAuthenticated';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import { Link, useParams } from 'react-router-dom';
import List from '../List';
import TopRatingsList from '../TopRatingsList';

interface UserData {
  id: string;
  name?: string;
  username: string;
  tours: Array<{
    id: string;
    name: string;
  }>;
}

const USER_PAGE_QUERY = `
  query($id: Int!) {
    user(id: $id) {
      id
      name
      username
      tours {
        id
        name
        users {
          id
          name
          email
          username
        }
        tourLocations {
          id
          date
          location {
            id
            name
          }
        }
      }
    }
  }
`;

const UserPage = () => {
  // const { user } = useAutheticated();
  const { userId } = useParams();

  const [{ data, fetching }] = useQuery({
    query: USER_PAGE_QUERY,
    variables: {
      id: parseInt(userId, 10),
    },
  });

  const userData: UserData = data?.user || {};
  const userTours = userData.tours;

  return (
    <Box height="100%" width="100%">
      {fetching ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px" width="100%">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box width="100%" display="flex" justifyContent="flex-start" p={2}>
            <Box
              width="100%"
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              alignItems="flex-start"
              height="100%"
            >
              <Typography variant="h4" component="h1" style={{ fontWeight: 700 }} color="primary">
                {userData.username}
              </Typography>
              <Typography variant="body2">{userData.name || 'Pizza Eater'}</Typography>
            </Box>
            <Avatar
              style={{ height: 80, width: 80, border: '5px solid #FEA430' }}
              src="https://cdn.vox-cdn.com/thumbor/yZVpqUtmjd-8KWtxb5pXz5Y8RKc=/85x0:1013x619/1200x800/filters:focal(85x0:1013x619)/cdn.vox-cdn.com/uploads/chorus_image/image/47771399/tmnt.0.0.jpg"
            />
          </Box>
          <TopRatingsList />
          <List label="Tours" creatable={true}>
            {userTours.map((tour) => {
              return (
                <ListItem key={tour.id}>
                  <Box py={1}>
                    <Link style={{ textDecoration: 'none' }} to={`/tour/${tour.id}`}>
                      <Typography variant="body2" color="primary" style={{ fontWeight: 500 }}>
                        {tour.name}
                      </Typography>
                    </Link>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </>
      )}
    </Box>
  );
};

export default UserPage;
