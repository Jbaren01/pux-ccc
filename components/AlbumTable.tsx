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
  const addCommas = (num) => {
    // addComas: formats the numbers in the "Sold" column to have commas

    if (typeof num !== 'number') return num // if number has been formatted return it
    const numStr = num.toString().split('') // convert number into an array of strings
    const newStrArr = []
    let counter = 0

    /**
     * Iterate over the array
     * Add each element from the front of the array
     * Every third number add a comma
     */

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
    /**
     * Join the array back into a string and return it
     */

    const finalNum = newStrArr.join('')
    return finalNum
  }

  const generateAlbumCells = (currentAlbumObj) => {
    /**
     * Generate an array that contains one cell for
     * each key in each album object
     */

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
     * Map over the array of data for each album and
     * generate a row for that album
     */

    const albumRows = data.map((albumObj) => {
      const { id, album } = albumObj
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
        </thead>
        <tbody>{generateAlbumRows()}</tbody>
      </table>
    </Wrapper>
  )
}

export default AlbumTable
