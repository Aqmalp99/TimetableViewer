import React, { useMemo, useEffect, useCallback } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, Button, getJson, toast } from "@mobiscroll/react";

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

  // React.useEffect(() => {
  //   getJson(
  //     "https://trial.mobiscroll.com/multi-events/",
  //     (events) => {
  //       setEvents(events);
  //     },
  //     "jsonp"
  //   );
  // }, []);

  // const getCategory = (id) => {
  //   switch (id) {
  //     case 1:
  //       return {
  //         name: "Project X",
  //         color: "#ff825d",
  //       };
  //     case 2:
  //       return {
  //         name: "Stakeholder Mtg.",
  //         color: "#bd75d0",
  //       };
  //     case 3:
  //       return {
  //         name: "Status Update",
  //         color: "#7f9230",
  //       };
  //     case 4:
  //       return {
  //         name: "Information Sharing",
  //         color: "#f14590",
  //       };
  //     case 5:
  //       return {
  //         name: "Team Building",
  //         color: "#64cad4",
  //       };
  //     default:
  //       return {
  //         name: "No category",
  //         color: "#5ac8fa",
  //       };
  //   }
  // };

  // const getParticipant = (id) => {
  //   switch (id) {
  //     case 1:
  //       return {
  //         name: "Lisa",
  //         img: "https://img.mobiscroll.com/demos/f1.png",
  //       };
  //     case 2:
  //       return {
  //         name: "Sharon",
  //         img: "https://img.mobiscroll.com/demos/f2.png",
  //       };
  //     case 3:
  //       return {
  //         name: "Emily",
  //         img: "https://img.mobiscroll.com/demos/f3.png",
  //       };
  //     case 4:
  //       return {
  //         name: "Rose",
  //         img: "https://img.mobiscroll.com/demos/f4.png",
  //       };
  //     case 5:
  //       return {
  //         name: "Matt",
  //         img: "https://img.mobiscroll.com/demos/m1.png",
  //       };
  //     case 6:
  //       return {
  //         name: "Rick",
  //         img: "https://img.mobiscroll.com/demos/m2.png",
  //       };
  //     case 7:
  //       return {
  //         name: "John",
  //         img: "https://img.mobiscroll.com/demos/m3.png",
  //       };
  //     case 8:
  //       return {
  //         name: "Ethan",
  //         img: "https://img.mobiscroll.com/demos/m4.png",
  //       };
  //   }
  // };

  // const edit = () => {
  //   toast({ message: "Edit clicked" });
  // };

  // const renderScheduleEvent = React.useCallback((data) => {
  //   const cat = getCategory(data.original.category);
  //   if (data.allDay) {
  //     return (
  //       <div
  //         style={{ background: cat.color }}
  //         className="md-custom-event-allday-title"
  //       >
  //         {data.title}
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div
  //         className="md-custom-event-cont"
  //         style={{
  //           // border: "2px solid " + cat.color,
  //           border: "2px solid black",
  //           background: cat.color,
  //         }}
  //       >
  //         <div className="md-custom-event-wrapper">
  //           <div
  //             style={{ background: cat.color }}
  //             className="md-custom-event-category"
  //           >
  //             {cat.name}
  //           </div>
  //           <div className="md-custom-event-details">
  //             <div className="md-custom-event-title">{data.title}</div>
  //             <div className="md-custom-event-time">
  //               {data.start} - {data.end}
  //             </div>
  //             <Button
  //               className="md-custom-event-btn"
  //               color="dark"
  //               variant="outline"
  //               onClick={edit}
  //             >
  //               Edit
  //             </Button>
  //             <div className="md-cutom-event-img-cont">
  //               {data.original.participants &&
  //                 data.original.participants.map(function (p) {
  //                   return (
  //                     <img
  //                       key={p}
  //                       className="md-custom-event-img"
  //                       src={getParticipant(p).img}
  //                     />
  //                   );
  //                 })}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }
  // });
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
    toast({
      message: event.event.title,
    });
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
        onEventClick={onEventClick}
        // renderScheduleEvent={renderScheduleEvent}
      />
    </div>
  );
};

export default ShaeCalendar;
