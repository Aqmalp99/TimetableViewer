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
            schedule: { type: 'week' }
        };
    }, []);

  return (
    <div>
      <Eventcalendar
            theme="ios" 
            themeVariant="light"
            clickToCreate={true}
            dragToCreate={true}
            dragToMove={true}
            dragToResize={true}
            eventDelete={true}
            data={myEvents}
            view={view}
            onEventClick={onEventClick}
       />
    </div>
  )
}

export default Calendar
