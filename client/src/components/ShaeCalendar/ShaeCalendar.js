import React, { useState, useMemo, useEffect, useCallback } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, Button, toast } from "@mobiscroll/react";
import axios from 'axios';

//how to get session token, verify if student or staff
//depending on account, different route

//detect clash

const detectClash = (data) => {
  let clashes = [];

  for (let i = 0; i < data.length; i++){
    for (let j = i+1; j < data.length; j++){
      //check times of each
      if (data[i].start_time === data[j].start_time || (data[i].start_time < data[j].start_time && data[i].end_time > data[j].start_time) || (data[i].start_time > data[j].start_time && data[j].end_time > data[i].start_time)){
        //check day of each
        let date1 = new Date(data[i].start_date.slice(0, -1));
        const date2 = new Date(data[j].start_date.slice(0, -1));
        if (date1.getDay() === date2.getDay()){
          //check equality if dates are recurring
          if (date1 < date2){
            while (date1 <= date2){
              if (date1.toString() === date2.toString()){
                clashes.push("clash");
              }
              date1.setDate(date1.getDate() + 7);
            }
          }
          else if (date2 < date1) {
            while (date2 <= date1){
              if (date1.toString() === date2.toString()){
                clashes.push("clash");
              }
              date2.setDate(date2.getDate() + 7);
            }
          }
          else {
            clashes.push("clash");
          }
        }
      }
    }
  }

  return clashes;
}


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
        console.log(response);
        console.log(detectClash(response.data));
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

  const onEventClick = useCallback((event) => {
    toast({
      message: event.event.title,
    });
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
    
    if (error === "No classes"){
      return <div>We have no record of your enrolment in any classes. Please contact a course administrator.</div>
    }
  }

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
        renderScheduleEventContent={renderScheduleEventContent}
      />
    </div>
  );
};

export default ShaeCalendar;
