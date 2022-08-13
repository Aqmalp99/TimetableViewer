import React, { useEffect } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, getJson, toast } from "@mobiscroll/react";

const ShaeCalendar = () => {
  const [myEvents, setEvents] = React.useState([]);

  // React.useEffect(() => {
  //   getJson(
  //     "https://trial.mobiscroll.com/events/?vers=5",
  //     (events) => {
  //       setEvents(events);
  //     },
  //     "jsonp"
  //   );
  // }, []);

  //events object has color, end, id, start, title
  useEffect(() => {
    setEvents([
      {
        // base properties
        title: "Product planning",
        color: "#56ca70",

        start: new Date(2022, 7, 10, 13),
        end: new Date(2022, 7, 10, 14),
        // add any property you'd like
        description: "Weekly meeting with team",
        location: "Office",
      },
    ]);
  }, []);

  const onEventClick = React.useCallback((event) => {
    toast({
      message: event.event.title,
    });
  }, []);

  const view = React.useMemo(() => {
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
      <Eventcalendar
        className="calendar-width"
        theme="ios"
        themeVariant="light"
        clickToCreate={true}
        dragToCreate={false}
        dragToMove={false}
        dragToResize={false}
        eventDelete={false}
        data={myEvents}
        view={view}
        invalidateEvent="strict"
        // invalid={inv}
        onEventClick={onEventClick}
      />
      {console.log(myEvents)}
    </div>
  );
};

export default ShaeCalendar;
