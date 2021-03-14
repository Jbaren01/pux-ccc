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
   * Fetch data when the component mounts with a GET request
   * to http://localhost:3000/api/albums
   */

  useEffect(() => {
    fetch('http://localhost:3000/api/albums')
      .then((responseAsJSON) => responseAsJSON.json()) //parse JSON response
      .then((response) => {
        sortByCountryAndRank(response)
      })
  }, [])

  /**
   * sortByCountryAndRank sorts the input data first by country and
   * then by rank
   */

  const sortByCountryAndRank = (dataArray) => {
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
    setAlbumData(sortedData)
  }

  /**
   * filterBy filters the rows by checking if the input typed
   * by the user matches any artist or album
   *
   * When the input field is cleared all the rows are displayed once again
   */

  const filterBy = (rows) => {
    const lowerCased = query.toLowerCase()
    return rows.filter(
      (row) =>
        row.artist.toLowerCase().indexOf(lowerCased) > -1 ||
        row.album.toLowerCase().indexOf(lowerCased) > -1
    )
  }

  /**
   * changeHandler listens for user input in the filter box
   * and sets the state with that input value
   */

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
        <FilterInput query={query} changeHandler={changeHandler} />
        <AlbumTable data={filterBy(albumData)} />
      </div>
    </React.Fragment>
  )
}

export default Home
