import React from 'react'
import RowCard from './RowCard/RowCard'
import requests from '../../utils/requests';
import RowList from './RowLists/RowList';

const Row = () => {

  
  return (
    <>
      <RowCard
        title="NETFLIX ORIGINALS"
        reqUrl={requests.fetchNetflixOriginals}
      />
      {/* 
      <RowCard title="Trending Now" reqUrl={requests.fetchTrending} />
      <RowCard title="Top Rated Movies" reqUrl={requests.fetchTopRatedMovies} />
      <RowCard title="Romance Movies" reqUrl={requests.fetchRomanceMovies} />
      <RowCard title="Action Movies" reqUrl={requests.fetchActionMovies} />
      <RowCard title="Comedy Movies" reqUrl={requests.fetchComedyMovies} />
      <RowCard title="Horror Movies" reqUrl={requests.fetchHorrorMovies} />
      <RowCard
        title="Documentary Movies"
        reqUrl={requests.fetchDocumentaryMovies}
      /> */}
      {/* <RowList
        title="NETFLIX ORIGINALS"
        reqUrl={requests.fetchNetflixOriginals}
      /> */}
      {/* <RowList title="Trending Now" reqUrl={requests.fetchTrending} /> */}
      {/* <RowList title="Trending Now" reqUrl={requests.fetchTrending} /> */}
    </>
  );
}

export default Row