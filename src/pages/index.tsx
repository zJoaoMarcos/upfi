import { Box, Button } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { CardList } from '../components/CardList';
import { Error } from '../components/Error';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { api } from '../services/api';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    async ({ pageParam = null }) => {
      const response = await api.get('/api/images', {
        params: {
          after: pageParam,
        },
      });

      return response.data;
    },

    // TODO GET AND RETURN NEXT PAGE PARAM
    { getNextPageParam: lastPage => lastPage.after || null }
  );

  // eslint-disable-next-line consistent-return
  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    if (data !== undefined) {
      const formatted = data.pages
        .map(imageData => {
          return imageData.data;
        })
        .flat();

      return formatted;
    }
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading) {
    return <Loading />;
  }
  // TODO RENDER ERROR SCREEN
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}

        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} mt="40px">
            {isFetchingNextPage ? 'Carregando ... ' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
