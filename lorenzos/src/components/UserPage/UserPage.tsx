import React from 'react';
import Box from '@material-ui/core/Box';
import { useQuery } from 'urql';
import useAutheticated from '../../hooks/useAuthenticated';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import List from '../List';
import TrophyIcon from '@material-ui/icons/EmojiEvents';
import { FormatListBulleted } from '@material-ui/icons';

interface UserData {
  id: string;
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
      username
      tours {
        id
        name
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
  const { user } = useAutheticated();
  console.log('id:', user);

  const [{ data, fetching }] = useQuery({
    query: USER_PAGE_QUERY,
    variables: {
      id: 2,
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
              <Typography variant="body2">Nicholas Mascia</Typography>
            </Box>
            <Avatar
              style={{ height: 80, width: 80, border: '5px solid #FEA430' }}
              src="https://cdn.vox-cdn.com/thumbor/yZVpqUtmjd-8KWtxb5pXz5Y8RKc=/85x0:1013x619/1200x800/filters:focal(85x0:1013x619)/cdn.vox-cdn.com/uploads/chorus_image/image/47771399/tmnt.0.0.jpg"
            />
          </Box>
          <List label="Top Ratings" creatable={false}>
            <ListItem>
              <TrophyIcon
                fontSize="large"
                htmlColor="#d4af37"
                style={{ paddingLeft: '4px', height: '40px', width: '40px' }}
              />
              <Box mx="auto" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                <Typography variant="body1" color="primary" style={{ fontWeight: 500 }}>
                  Margherita Pizza
                </Typography>
                <Typography variant="caption">Lorenzo's Pizzeria</Typography>
              </Box>
              <Avatar>
                <Typography variant="h6" component="p">
                  9.1
                </Typography>
              </Avatar>
            </ListItem>
            <ListItem>
              <TrophyIcon
                fontSize="large"
                htmlColor="#9b9b9b"
                style={{ paddingLeft: '4px', height: '40px', width: '40px' }}
              />
              <Box mx="auto" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                <Typography variant="body1" color="primary" style={{ fontWeight: 500 }}>
                  Margherita Pizza
                </Typography>
                <Typography variant="caption">Lorenzo's Pizzeria</Typography>
              </Box>
              <Avatar>
                <Typography variant="h6" component="p">
                  8.8
                </Typography>
              </Avatar>
            </ListItem>
            <ListItem>
              <TrophyIcon
                fontSize="large"
                htmlColor="#9e865b"
                style={{ paddingLeft: '4px', height: '40px', width: '40px' }}
              />
              <Box mx="auto" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                <Typography variant="body1" color="primary" style={{ fontWeight: 500 }}>
                  Margherita Pizza
                </Typography>
                <Typography variant="caption">Lorenzo's Pizzeria</Typography>
              </Box>
              <Avatar>
                <Typography variant="h6" component="p">
                  8.7
                </Typography>
              </Avatar>
            </ListItem>
          </List>
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
