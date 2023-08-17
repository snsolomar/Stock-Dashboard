import React from 'react'
import Cards from './Cards'

const Details = () => {

  const companyDetails = {
    name: "Name",
    country: 'Country',
  }
  const companySummary = {
    previousClose: 'Previous Close',
    open: 'Open',
    daysRange: "Day's Range",
    fiftyTwoRange: '52 Week Range',
    volume: 'Volume',
    marketCap: 'Market Cap',
    peRation: 'PE Ratio (TTM)',
    eps: 'EPS (TTM)'
  }

  return (
    <Cards>
        <ul>

        </ul>
    </Cards>
  )
}

export default Details
