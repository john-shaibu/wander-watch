import React from 'react'
import { LocationIcon } from '../assets'

const Filter = () => {
  return (
    <div>
        <div className="filter_header">
            <LocationIcon />
            <b>Filter locations</b>
        </div>
        <div className="filter_form">
            <form action="" method="get">
                <div className='date_filter'>   
                    <span>Date</span>
                    <div>
                        <div>
                            <label htmlFor="date_from">From</label>
                            <input type="date" name="date_from" id="date_from" />
                        </div>
                        <div>
                            <label htmlFor="date_to">To</label>
                            <input type="date" name="date_to" id="date_to" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Filter