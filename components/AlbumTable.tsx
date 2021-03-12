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
  const generateAlbumCells = (currentAlbumObj) => {
    /**
     * generate an array that contains one cell for each key in each album object
     */

    const { id } = currentAlbumObj
    const albumKeys = Object.keys(currentAlbumObj).slice(1)
    console.log('albumKeys:', albumKeys)
    const albumCells = albumKeys.map((key) => (
      <td key={`${id}-${key}-${currentAlbumObj[key]}`}>{currentAlbumObj[key]}</td>
    ))
    return albumCells
  }

  const generateAlbumRows = () => {
    /**
     * map over the array of data for each album generate a row for that album
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
            <th>Rank</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Year</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>{generateAlbumRows()}</tbody>
      </table>
    </Wrapper>
  )
}

export default AlbumTable
