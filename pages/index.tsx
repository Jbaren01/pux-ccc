/*
 * pages/index.tsx
 * Description: The "homepage", so to speak.
 * Copyright (c) 2021 PredictiveUX
 */
import React, { useState, useEffect } from 'react'
import Head from 'next/head'

import { AlbumTable, FilterInput, PageTitle } from 'components/'

import css from 'styles/Home.module.css'

const Home = (): JSX.Element => {
  const [albumData, setAlbumData] = useState([])
  const [query, setQuery] = useState('')

  /**
   * Fetch data with a GET request to http://localhost:3000/api/albums
   */

  useEffect(() => {
    const data = [
      {
        id: 1,
        country: 'UK',
        album: 'Greatest Hits',
        artist: 'Queen',
        year: 1981,
        sold: 6600000,
        rank: 1
      },
      {
        id: 2,
        country: 'UK',
        album: 'Gold: Greatest Hits',
        artist: 'ABBA',
        year: 1992,
        sold: 5700000,
        rank: 2
      },
      {
        id: 3,
        country: 'UK',
        album: "Sgt. Pepper's Lonely Hearts Club Band",
        artist: 'The Beatles',
        year: 1967,
        sold: 5400000,
        rank: 3
      },
      {
        id: 4,
        country: 'UK',
        album: '21',
        artist: 'Adele',
        year: 2011,
        sold: 5180000,
        rank: 4
      },
      {
        id: 5,
        country: 'UK',
        album: "(What's the Story) Morning Glory?",
        artist: 'Oasis',
        year: 1992,
        sold: 1318000,
        rank: 5
      },
      {
        id: 12,
        country: 'United States',
        album: 'Thriller',
        artist: 'Michael Jackson',
        year: 1982,
        sold: 33000000,
        rank: 2
      },

      {
        id: 7,
        country: 'Canada',
        album: 'Come On Over',
        artist: 'Shania Twain',
        year: 1997,
        sold: 1930000,
        rank: 2
      },
      {
        id: 8,
        country: 'Canada',
        album: '21',
        artist: 'Adele',
        year: 2011,
        sold: 1500000,
        rank: 3
      },
      {
        id: 9,
        country: 'Canada',
        album: "Let's Talk About Love",
        artist: 'Celine Dion',
        year: 1997,
        sold: 1490000,
        rank: 4
      },
      {
        id: 10,
        country: 'Canada',
        album: 'The Bodyguard Soundtrack',
        artist: 'Whitney Houston',
        year: 1992,
        sold: 1318000,
        rank: 5
      },
      {
        id: 11,
        country: 'United States',
        album: 'Their Greatest Hits (1971-1975)',
        artist: 'The Eagles',
        year: 1976,
        sold: 38000000,
        rank: 1
      },
      {
        id: 6,
        country: 'Canada',
        album: 'Thriller',
        artist: 'Michael Jackson',
        year: 1982,
        sold: 2455000,
        rank: 1
      },

      {
        id: 13,
        country: 'United States',
        album: 'Hotel California',
        artist: 'The Eagles',
        year: 1976,
        sold: 26000000,
        rank: 3
      },
      {
        id: 14,
        country: 'United States',
        album: 'Back in Black',
        artist: 'AC/DC',
        year: 1980,
        sold: 25000000,
        rank: 4
      },
      {
        id: 15,
        country: 'United States',
        album: 'Led Zeppelin IV',
        artist: 'Led Zeppelin',
        year: 1971,
        sold: 23000000,
        rank: 5
      }
    ]

    const sorted = sortBy(data)

    setAlbumData(sorted)
    // fetch('http://localhost:3000/api/albums')
    //   .then((responseAsJSON) => responseAsJSON.json()) //parse JSON response
    //   .then((response) => {
    //     sortBy(response)
    //     // console.log('response:', response)
    //     //   const sortedData = response.sort((a, b) => {
    //     //     if (a['country'] < b['country']) return -1
    //     //     if (a['country'] > b['country']) return 1
    //     //     if (a['country'] === b['country']) return 0
    //     //   })
    //     //   setAlbumData(sortedData)
    //   })
  }, [])

  /*

  [3,5,1,2,4,3]
  arr.sort((a, b) => a - b);
            5  3     5 - 3      +1 0 -1

  */

  // sort function
  const sortBy = (dataArray) => {
    const sortedData = dataArray.sort((a, b) => {
      if (a.country < b.country) return -1
      if (a.country > b.country) return 1
      if (a.country === b.country) {
        if (a.rank < b.rank) return -1
        if (a.rank > b.rank) return 1
        if (a.rank === b.rank) return 0
      }
      return 0
    })
    // console.log('sorted:', sortedData)
    // setAlbumData(sortedData)
    console.log('albumdata:', albumData)
    return sortedData
  }

  //filter search function
  const filterBy = (rows) => {
    //const { myQuery } = query
    // const lowerCasedQuery= myQuery.toLowerCase()
    // take row[lowerCasedQuery].indexOf(lowerCased) > -1
    const lowerCased = query.toLowerCase()
    return rows.filter(
      (row) =>
        row.artist.toLowerCase().indexOf(lowerCased) > -1 ||
        row.album.toLowerCase().indexOf(lowerCased) > -1
    )
  }

  // on change handler function
  const changeHandler = (e) => {
    const { value } = e.target
    // lowercase the query
    setQuery(value)
  }

  return (
    <React.Fragment>
      <Head>
        <title>PUX: Candidate Coding Challenge</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={css.header}>
        <div>
          <img src='assets/pux_logo.png' alt='Predictive UX' />
        </div>
        <div className={css.title}>Candidate Coding Challenge</div>
      </div>
      <div className={css.container}>
        <PageTitle />
        <FilterInput query={query} changeHandler={changeHandler} setQuery={setQuery} />
        <AlbumTable data={filterBy(albumData)} />
      </div>
    </React.Fragment>
  )
}

export default Home
