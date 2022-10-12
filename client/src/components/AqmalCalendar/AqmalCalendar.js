import React, { useState, useMemo, useEffect, useCallback } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, Button, toast, momentTimezone  } from "@mobiscroll/react";
import axios from 'axios';
import  { useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';
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
        let date2 = new Date(data[j].start_date.slice(0, -1));
        if (date1.getDay() === date2.getDay()){
          //check equality if dates are recurring
          if (date1 < date2){
            while (date1 <= date2){
              if (date1.toString() === date2.toString()){
                clashes.push({
                  a: data[i],
                  b: data[j],
                });
              }
              date1.setDate(date1.getDate() + 7);
            }
          }
          else if (date2 < date1) {
            while (date2 <= date1){
              if (date1.toString() === date2.toString()){
                clashes.push({
                  a: data[i],
                  b: data[j],
                });
              }
              date2.setDate(date2.getDate() + 7);
            }
          }
          else {
            clashes.push({
              a: data[i],
              b: data[j],
            });
          }
        }
      }
    }
  }
  return clashes;
}


const AqmalCalendar = ({ifEventSelected, displayClashes, SelectedClass, id, role, onClassClick}) => {
  
  
  const [myEvents, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
  //events object has color, end, id, start, title
  useEffect(() => {
    const getClasses = async () => {
      // const studentID= "/student/"+ toString(id);
      await axios
      .get(`/${role}/${id}`)
      .then((response) => {
        if (detectClash(response.data).length > 0){
          displayClashes(detectClash(response.data));
        }
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

  const onEventDoubleClick = useCallback((event) => {
    setSelectedEvent(event.event);
    ifEventSelected(true);
    SelectedClass(event.event);
    onClassClick(event);

  }, []);

  const onEventClick = useCallback((event) => {
    setSelectedEvent(event.event);
    ifEventSelected(true);
    SelectedClass(event.event);
    

  }, []);
  const onCellClick = useCallback((event) => {
    setSelectedEvent({});
    ifEventSelected(false);
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
        onEventDoubleClick={onEventDoubleClick}
        renderScheduleEventContent={renderScheduleEventContent}
      />
    </div>
  );
};

export default AqmalCalendar;
