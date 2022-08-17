import React from 'react';
import CardTodo from './../../components/Card/Card';
import Grid from '@mui/material/Grid';

import Skeleton from '@mui/material/Skeleton';
import { isAuth } from '../../redux/slice/auth';
import { fetchPostData } from '../../redux/slice/post';
import { useDispatch, useSelector } from 'react-redux';
const Home = () => {
  const isAuthSelect = useSelector(isAuth);
  const { post } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPostData());
  }, []);

  return (
    <div>
      {isAuthSelect ? (
        ''
      ) : (
        <h2 style={{ display: 'flex', justifyContent: 'center' }}>
          You should be authorized to see your Todo
        </h2>
      )}

      <Grid sx={{ mt: 5 }} container spacing={2} columns={16}>
        {isAuthSelect ? (
          post.items.length === 0 ? (
            <h2>You dont have toodos</h2>
          ) : (
            post.items.map((obj, i) => (
              <Grid key={obj._id} item xs={2} sm={4} md={4}>
                <CardTodo {...obj} />
              </Grid>
            ))
          )
        ) : (
          [...new Array(5)].map((_, i) => (
            <Grid xs={2} sm={4} md={4} key={i} item>
              <Skeleton sx={{ m: 2 }} variant="rectangular" width={200} height={100} />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default Home;
