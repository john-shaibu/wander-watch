import { Await, useLoaderData } from 'react-router-dom'
import {CalendarIcon, ClockIcon, HistoryIcon} from '../assets'
import { useAsync } from '../hooks/useAsync'
import { getProfile } from '../request'
import Loader from './WebLoader'
import { Suspense } from 'react'

const dateFormatter = (date) => {
  switch (date) {
    case 1:
      return 'January'
      break;
  
    case 2:
      return 'February'
      break;
  
    case 3:
      return 'March'
      break;
  
    case 4:
      return 'April'
      break;
  
    case 5:
      return 'May'
      break;
  
    case 6:
      return 'June'
      break;
  
    case 7:
      return 'July'
      break;
  
    case 8:
      return 'August'
      break;
  
    case 9:
      return 'September'
      break;
  
    case 10:
      return 'October'
      break;
  
    case 11:
      return 'November'
      break;
  
    case 12:
      return 'December'
      break;
  
    default:
      break;
  }
}

const LocationHistory = () => {
  const { profile } = useLoaderData()

  return (
    <div className='location_history'>
      <div className='history_headeer'>
        <HistoryIcon />
        <b>Your Location history</b>
      </div>
      <Suspense fallback={'loading your loaction history...'}>
        <Await resolve={profile}>
          {(data) => {
            const locationsArr = data?.locations
            return <div className="location_history_container">
            {locationsArr.slice(0, 5).map((history) => {
              return (
                <div className="history_container" key={history.id}>
                  <div className="history_date">
                    <CalendarIcon />
                    <span>{history.timestamp.split('-')[2].split('T')[0]} - {dateFormatter(Number((history.timestamp.split('-')[1])))} - {history.timestamp.split('-')[0]}</span>
                  </div>
                  <h4>{history.name}</h4>
                  <div className="time_spent">
                    <ClockIcon />
                    <span>{history.timestamp.split('-')[2].split('T')[1].split(':')[0]} : {history.timestamp.split('-')[2].split('T')[1].split(':')[1]} {history.timestamp.split('-')[2].split('T')[1].split(':')[0] > 12 ? 'PM' : 'AM'}</span>
                  </div>
                  {/* <span className="time_reached">{history.timestamp.split('-')[2].split('T')}</span> */}
                </div>
              )
            })}
        </div>
          }}
        </Await>
      </Suspense>
    </div>
  )
}

export default LocationHistory