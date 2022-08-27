import React, { useMemo, useEffect, useCallback } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, Button, getJson, toast } from "@mobiscroll/react";

const ShaeCalendar = () => {
  const [myEvents, setEvents] = React.useState([]);

  //events object has color, end, id, start, title
  useEffect(() => {
    setEvents([
      {
        // base properties
        title: "COMPSCI 3304",
        className: "Engineering Software as Services II",
        venue: "Ingkarni Wardli / B17 / Teaching Room",
        classType: "Lecture",
        color: "#56ca70",
        start: new Date(2022, 7, 27, 13),
        end: new Date(2022, 7, 27, 15),
      },
    ]);
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

  
  const onEventClick = useCallback((event) => {
    toast({
      message: event.event.title,
    });
  }, []);


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
        onEventClick={onEventClick}
        renderScheduleEventContent={renderScheduleEventContent}
      />
    </div>
  );
};

export default ShaeCalendar;
