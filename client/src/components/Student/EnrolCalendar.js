import React, { useState, useMemo, useEffect, forwardRef, useImperativeHandle } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, setOptions,momentTimezone, CalendarNav, SegmentedGroup, SegmentedItem, CalendarPrev, CalendarToday, CalendarNext } from '@mobiscroll/react';
import axios from 'axios';
import moment from 'moment-timezone';

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

const EnrolCalendar = forwardRef(({id, getAllClasses}, ref) => {
  
  const [myEvents, setEvents] = useState([]);
  const [numClasses, setNumClasses] = useState(0);
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
      await axios
      .get(`/student/classes`, { params: { id: id } })
      .then((response) => {
        // if (detectClash(response.data).length > 0){
        //   displayClashes(detectClash(response.data));
        // }
        let data = response.data.map(element => {  
          return {
            id: element.class_id,
            title: element.class_code,
            className: element.class_name,
            classType: element.class_type,
            classSize: element.class_size,
            color: "#56ca70",
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
        setEvents(data);
        setNumClasses(data.length);
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

  useImperativeHandle(ref, () => ({
    addTempClass(tempClass) {
      let newEvents = [...myEvents];

      if (newEvents.length != numClasses){
        newEvents.pop();
      }
      console.log(tempClass);
      if (tempClass != null){
        newEvents.push({
          id: tempClass.class_id,
          title: tempClass.class_code,
          className: tempClass.class_name,
          classType: tempClass.class_type,
          classSize: tempClass.class_size,
          color: "#56ca70",
          date: moment(tempClass.start_date).format('YYYY-MM-DD'),
          start: new Date(moment(tempClass.start_date).format('YYYY-MM-DD') + "T" + tempClass.start_time),
          end: new Date(moment(tempClass.start_date).format('YYYY-MM-DD') +"T" + tempClass.end_time),
          venue: tempClass.room_code + " / " + tempClass.building,
          recurring: {
            repeat: 'weekly',
            interval: 1
          }
        })
      }
      console.log(newEvents[newEvents.length-1]);
      setEvents(newEvents);
    },
    getAllClasses() {
      return myEvents;
    }
  }));


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
      return <div style={ { textAlign: "center" } }>There has been an error fetching your class details. Please refresh your page and try again</div>
    }
    
    if (error === "No classes"){
      return <div style={ { textAlign: "center" } }>We have no record of your enrolment in any classes. Please contact a course administrator.</div>
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
        // onEventClick={onEventClick}
        // onEventDoubleClick={onEventDoubleClick}
        renderScheduleEventContent={renderScheduleEventContent}
      />
    </div>
  );
});

export default EnrolCalendar;