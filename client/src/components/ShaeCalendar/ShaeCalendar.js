import React, { useState, useMemo, useEffect, useCallback } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, Button, toast } from "@mobiscroll/react";
import axios from 'axios';

const ShaeCalendar = ({ifEventSelected}) => {
  const [myEvents, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
  //events object has color, end, id, start, title
  useEffect(() => {
    const getClasses = async () => {
      await axios
      .get("/staff/1")
      .then((response) => {
        let data = response.data.map(element => {
          return {
            title: element.class_code,
            className: element.class_name,
            classType: element.class_type,
            color: "#56ca70",
            start: new Date(element.start_date.slice(0,10) + "T" + element.start_time),
            end: new Date(element.start_date.slice(0,10) +"T" + element.end_time),
            venue: element.room_code + " / " + element.building,
            recurring: {
              repeat: 'weekly',
              interval: 1
            }
          };
        })
        setEvents(data);
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

  const onEventClick = useCallback((event) => {
    // toast({
    //   message: event.event.title,
    // });
    setSelectedEvent({
      eventName: event.event.title,
    });
    ifEventSelected(true);
  }, []);

  const onCellClick = useCallback((event) => {
    setSelectedEvent({});
    ifEventSelected(false);
  }, []);

  // const renderScheduleEvent = useCallback((data) => {});

  //make start time and end time dynamic based on the classes for that day
  const view = useMemo(() => {
    return {
      schedule: {
        type: "week",
        startTime: "08:00",
        endTime: "18:00",
        allDay: false
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

  //   const inv = [
  //     {
  //       start: "12:00",
  //       end: "13:00",
  //       title: "Lunch break",
  //       recurring: {
  //         repeat: "weekly",
  //         weekDays: "MO,TU,WE,TH,FR",
  //       },
  //     },
  //     {
  //       start: "17:00",
  //       end: "23:59",
  //       recurring: {
  //         repeat: "weekly",
  //         weekDays: "MO,TU,WE,TH,FR",
  //       },
  //     },
  //   ];

  if (loading){
    return <div>Loading...</div>;
  }

  if (error){
    if (error === 500){
      return <div>There has been an error fetching your class details. Please refresh your page and try again</div>
    }  
  }

  return (
    <div className="calendar-container">
      {console.log(myEvents)}
      <Eventcalendar
        className="calendar-width"
        theme="ios"
        themeVariant="light"
        clickToCreate={false}
        dragToCreate={false}
        dragToMove={false}
        dragToResize={false}
        eventDelete={false}
        data={myEvents}
        view={view}
        invalidateEvent="strict"
        // invalid={inv}
        onCellClick={onCellClick}
        onEventClick={onEventClick}
        renderScheduleEventContent={renderScheduleEventContent}
      />
    </div>
  );
};

export default ShaeCalendar;
