import React, { useState, useMemo, useEffect, useCallback } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, Button, getJson, toast } from "@mobiscroll/react";

const ShaeCalendar = ({ifEventSelected}) => {
  const [myEvents, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({});

  //events object has color, end, id, start, title
  useEffect(() => {
    setEvents([
      {
        // base properties
        title: "Product planning",
        color: "#56ca70",
        start: new Date(2022, 7, 17, 13),
        end: new Date(2022, 7, 17, 14),
        // add any property you'd like
        description: "Weekly meeting with team",
        location: "Office",
      },
    ]);
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

  const view = useMemo(() => {
    return {
      schedule: {
        type: "week",
        startTime: "07:00",
        endTime: "19:00",
      },
    };
  }, []);

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

  return (
    <div className="calendar-container">
      {/* {console.log(myEvents)} */}
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
        // renderScheduleEvent={renderScheduleEvent}
      />
    </div>
  );
};

export default ShaeCalendar;
