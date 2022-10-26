import React, { useState, useMemo, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, setOptions,momentTimezone, CalendarNav, SegmentedGroup, SegmentedItem, CalendarPrev, CalendarToday, CalendarNext } from '@mobiscroll/react';
import axios from 'axios';
import moment from 'moment-timezone';
import { detectClash } from "../Student/detectClash";
setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

const LoadTimetable = forwardRef(({ifEventSelected, displayClashes, ChangeSelectedClass, id, role, onClassClick}, ref) => {
  
  const [myEvents, setEvents] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [calView, setCalView] = React.useState(
    {
        
        schedule: {
          labels: true,
          type: "week",
          startTime: "08:00",
          endTime: "18:00",
          allDay: false,
          startDay: 1,
          endDay: 5
        }
    }
);
  
  useImperativeHandle(ref, () => ({
    updateClass({id,date,start,end}) {
       
      let data = myEvents.map(element => {
            if(element.id === id){
                return {...element, 
                    date: date,
                    start: new Date(date + "T" + start),
                    end: new Date(date + "T" + end)};
            }
            return element;
       });
       
        // displayClashes(detectClash(data));
      
       setEvents(data);
    },
    deEnrol({id}){
      const newData = myEvents.filter((element) => {
        return element.id !==id;
      });
      // displayClashes(detectClash(newData));
      setEvents(newData);
    },
    newClass(newClassData){
      console.log(newClassData);
      let newEvents = [...myEvents];
      if (newClassData != null){
        newEvents.push({
          id: newClassData.class_id,
          title: newClassData.class_code,
          className: newClassData.class_name,
          classType: newClassData.class_type,
          classSize: newClassData.class_size,
          color: "#56ca70",
          date: moment(newClassData.date).format('YYYY-MM-DD'),
          start: new Date(moment(newClassData.date).format('YYYY-MM-DD') + "T" + newClassData.start),
          end: new Date(moment(newClassData.date).format('YYYY-MM-DD') +"T" + newClassData.end),
          recurring: {
            repeat: 'weekly',
            interval: 1
          }
        })
      }
      setEvents(newEvents);
    },
    alternateClass(newData){
      console.log(newData);
      let data = myEvents.map(element => {
        if(element.id === newData.class_id){
            return {...element, 
                id: parseInt(newData.newClass_id),
                date: moment(newData.date).format('YYYY-MM-DD'),
                start: newData.start,
                end:newData.end};
            }
            return element;
          
   });
   
    
  
   setEvents(data);
    }
  }));

  const changeView = (event) => {
    let calView;
    
    switch (event.target.value) {
        case 'year':
            calView = {
                calendar: { type: 'year' }
            }
            break;
        case 'month':
            calView = {
                calendar: { labels: true }
            }
            break;
        case 'week':
            calView = {
              schedule: {
                labels: true,
                type: "week",
                startTime: "08:00",
                endTime: "18:00",
                allDay: false,
                startDay: 1,
                endDay: 5
              }
            }
            break;
        case 'day':
            calView = {
                schedule: { type: 'day',
                startTime: "08:00",
                endTime: "18:00",
                allDay: false, }
            }
            break;
        case 'agenda':
            calView = {
                calendar: { type: 'week' },
                agenda: { type: 'week' }
            }
            break;
    }

    
    setCalView(calView);
}

const customWithNavButtons = () => {
    return <React.Fragment>
        <CalendarNav className="cal-header-nav" />
        <div className="cal-header-picker">
            <SegmentedGroup value={view} onChange={changeView}>
                <SegmentedItem value="year">
                    Year
                </SegmentedItem>
                <SegmentedItem value="month">
                    Month
                </SegmentedItem>
                <SegmentedItem value="week">
                    Week
                </SegmentedItem>
                <SegmentedItem value="day">
                    Day
                </SegmentedItem>
                <SegmentedItem value="agenda">
                    Agenda
                </SegmentedItem>
            </SegmentedGroup>
        </div>
        <CalendarPrev className="cal-header-prev" />
        <CalendarToday className="cal-header-today" />
        <CalendarNext className="cal-header-next" />
    </React.Fragment>;
}
  //events object has color, end, id, start, title
  useEffect(() => {
    const getClasses = async () => {
      // const studentID= "/student/"+ toString(id);
      await axios
      .get(`/${role}`, { params: { id: id } })
      .then((response) => {
        
        let data = response.data.map(element => {
          return {
            id: element.class_id,
            title: element.class_code,
            className: element.class_name,
            classType: element.class_type,
            classSize: element.class_size,
            color: element.class_size >= element.capacity ? "#FF0000" : "#56ca70",
            date: moment(element.start_date).format('YYYY-MM-DD'),
            start: new Date(moment(element.start_date).format('YYYY-MM-DD') + "T" + element.start_time),
            end: new Date(moment(element.start_date).format('YYYY-MM-DD') +"T" + element.end_time),
            venue: element.room_code + " / " + element.building,
            recurring: {
              repeat: 'weekly',
              interval: element.recurring_factor
            }
          };
        })
        if (detectClash(response.data).length > 0){
          displayClashes(detectClash(response.data));
        }
        console.log(response.data[0].start_time);
        setEvents(data);
        if (response.data.length === 0)
          setError("No classes");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(500);
      });
    }

    getClasses();
  }, []);

  const onEventDoubleClick = useCallback((event) => {
    ifEventSelected(true);
    ChangeSelectedClass(event.event);
    onClassClick(event);
  }, []);

  const onEventClick = useCallback((event) => {
    ifEventSelected(true);
    ChangeSelectedClass(event.event);
  }, []);

  const onCellClick = useCallback(() => {
    ifEventSelected(false);
  }, []);

  //make start time and end time dynamic based on the classes for that day
  const view = useMemo(() => {
    return {
      schedule: {
        type: "week",
        startTime: "08:00",
        endTime: "18:00",
        allDay: false,
        startDay: 1,
        endDay: 5
      },
    };
  }, []);

  //custom content in calendar item
  const renderScheduleEventContent = React.useCallback((data) => {
    return (
      <div>
        <div>
           <div>{data.original.title}</div>
           <div>{data.original.className}</div>
           <div>{data.original.venue}</div>
           <div>{data.original.classType}</div>
          </div>
      </div>
    );
    });

  if (loading){
    return <div>Loading...</div>;
  }

  if (error){
    if (error === 500){
      return <div>There has been an error fetching your class details. Please refresh your page and try again</div>
    }
    
    if (error === "No classes"){
      return <div>We have no record of your enrolment in any classes. Please contact a course administrator.</div>
    }
  }
  momentTimezone.moment = moment;

  return (
    <div className="calendar-container">
      <Eventcalendar
        renderHeader={customWithNavButtons}
        className="calendar-width"
        theme="ios"
        themeVariant="light"
        clickToCreate={false}
        dragToCreate={false}
        dragToMove={false}
        dragToResize={false}
        eventDelete={false}
        data={myEvents}
        view={calView}
        invalidateEvent="strict"
        onCellClick={onCellClick}
        onEventClick={onEventClick}
        onEventDoubleClick={onEventDoubleClick}
        renderScheduleEventContent={renderScheduleEventContent}
      />
    </div>
  );
});

export default LoadTimetable;