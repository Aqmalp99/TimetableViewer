// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <p>My app</p>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Eventcalendar, getJson, toast } from '@mobiscroll/react';

function App() {

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
    ); 
}

export default App;
