import '../styles/discover.css'

import { LocationIcon } from '../assets'

const Filter = () => {
  return (
    <div className='filter'>
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
                <div className='time_filter'>   
                    <span>Hours</span>
                    <div>
                        <div>
                            <label htmlFor="time_from">From</label>
                            <input type="time" name="time_from" id="time_from" />
                        </div>
                        <div>
                            <label htmlFor="time_to">To</label>
                            <input type="time" name="time_to" id="time_to" />
                        </div>
                    </div>
                </div>
                <div className='time_spent'>   
                    <span>Time spent</span>
                    <div>
                        <div>
                            <label htmlFor="time_spent_from">From</label>
                            <input type="text" name="time_spent_from" id="time_spent_from" placeholder='From' />
                        </div>
                        <div>
                            <label htmlFor="time_spent_to">To</label>
                            <input type="text" name="time_spent_to" id="time_spent_to" placeholder='To' />
                        </div>
                    </div>
                </div>
                <button type="submit" className='primary-btn'>Filter locations</button>
            </form>
        </div>
    </div>
  )
}

export default Filter