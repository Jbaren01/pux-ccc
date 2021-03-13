/*
 * components/AlbumTable.tsx
 * Description: Table displaying album information
 * Copyright (c) 2021 PredictiveUX
 */
import styled from 'styled-components'

import css from 'styles/Home.module.css'

const Wrapper = styled.div`
  margin-top: 20px;
`

type AlbumTableProps = {
  data: any[]
}

const AlbumTable: React.FC<AlbumTableProps> = ({ data }: AlbumTableProps): JSX.Element => {
  // add comas function
  const addCommas = (num) => {
    if (typeof num !== 'number') return num
    const numStr = num.toString().split('')
    const newStrArr = []
    let counter = 0

    for (let i = numStr.length - 1; i >= 0; i -= 1) {
      const current = numStr[i]
      counter += 1
      if (counter % 3 === 0) {
        newStrArr.unshift(current)
        newStrArr.unshift(',')
      } else {
        newStrArr.unshift(current)
      }
    }
    const finalNum = newStrArr.join('')
    return finalNum
  }

  const generateAlbumCells = (currentAlbumObj) => {
    /**
     * generate an array that contains one cell for each key in each album object
     */

    // console.log('currentAlbumObj:', currentAlbumObj['sold'])
    const numTimesSold = addCommas(currentAlbumObj['sold'])
    console.log(numTimesSold)

    const { id } = currentAlbumObj
    const albumKeys = Object.keys(currentAlbumObj).slice(1)
    const albumCells = albumKeys.map((key) => {
      if (currentAlbumObj[key] === currentAlbumObj['sold']) currentAlbumObj[key] = numTimesSold
      return <td key={`${id}-${key}-${currentAlbumObj[key]}`}>{currentAlbumObj[key]}</td>
    })

    return albumCells
  }

  const generateAlbumRows = () => {
    /**
     * map over the array of data for each album generate a row for that album
     */
    // sort here on country
    const albumRows = data.map((albumObj) => {
      const { id, album } = albumObj
      // console.log('albumObj:', albumObj)
      return <tr key={`${id}-${album}`}>{generateAlbumCells(albumObj)}</tr>
    })

    return albumRows
  }

  return (
    <Wrapper>
      <table className={css.albumTable}>
        <thead>
          <tr>
            <th>Country</th>
            <th>Album</th>
            <th>Artist</th>
            <th>Year</th>
            <th>Sold</th>
            <th>Rank</th>
          </tr>
          {/* <tr>
            <th>Country</th>
            <th>Rank</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Year</th>
            <th>Sold</th>
          </tr> */}
        </thead>
        <tbody>{generateAlbumRows()}</tbody>
      </table>
    </Wrapper>
  )
}

export default AlbumTable
