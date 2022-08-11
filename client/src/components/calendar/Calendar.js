import React from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Eventcalendar, getJson, toast } from '@mobiscroll/react';

const Calendar = () => {
    const [myEvents, setEvents] = React.useState([]);

    React.useEffect(() => {
        getJson('https://trial.mobiscroll.com/events/?vers=5', (events) => {
            setEvents(events);
        }, 'jsonp');
    }, []);

    const onEventClick = React.useCallback((event) => {
        toast({
            message: event.event.title
        });
    }, []);

    const view = React.useMemo(() => {
        return {
            schedule: { 
                type: 'week',
                startTime:'07:00',
                endTime:'19:00'
             }
        };
    }, []);

    const inv = [{
        start: '12:00',
        end: '13:00',
        title: 'Lunch break',
        recurring: {
            repeat: 'weekly',
            weekDays: 'MO,TU,WE,TH,FR'
        }
    },  {
        start: '17:00',
        end: '23:59',
        recurring: {
            repeat: 'weekly',
            weekDays: 'MO,TU,WE,TH,FR'
        }
    }];


  return (
    <div className="calendar-container">
      <Eventcalendar 
            className='calendar-width'
            theme="ios" 
            themeVariant="light"
            clickToCreate={true}
            dragToCreate={false}
            dragToMove={true}
            dragToResize={true}
            eventDelete={false}
            data={myEvents}
            view={view}
            invalidateEvent="strict"
            invalid={inv}
            onEventClick={onEventClick}
       />{console.log(myEvents)}
       
    </div>
  )
}

export default Calendar


