import {CalendarIcon, ClockIcon, HistoryIcon} from '../assets'

const random_date = new Date(new Date() - Math.random()*(1e+12))

const locationHistoryData = [
  {
    date : '12th January, 2024',
    name_of_loaction: 'Mellanby Hall, UI',
    time_reached: '4:30pm',
    time_spent: 4,
  },
  {
    date : '12th January, 2024',
    name_of_loaction: 'Independence Hall',
    time_reached: '4:30pm',
    time_spent: 4,
  },
  {
    date : '12th January, 2024',
    name_of_loaction: 'CBN lecture theatre',
    time_reached: '4:30pm',
    time_spent: 4,
  },
  {
    date : '12th January, 2024',
    name_of_loaction: 'Trenchard Hall, UI',
    time_reached: '4:30pm',
    time_spent: 4,
  },
]

const LocationHistory = () => {
  return (
    <div className='location_history'>
      <div className='history_headeer'>
        <HistoryIcon />
        <b>Your Location history</b>
      </div>
      <div className="location_history_container">
        {
          locationHistoryData.map((history, key) => {
            return (
              <div className="history_container" key={key}>
                <div className="history_date">
                  <CalendarIcon />
                  <span>{history.date}</span>
                </div>
                <h4>{history.name_of_loaction}</h4>
                <div className="time_spent">
                  <ClockIcon />
                  <span>Spent {history.time_spent} Hours</span>
                </div>
                <span className="time_reached">{history.time_reached}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default LocationHistory