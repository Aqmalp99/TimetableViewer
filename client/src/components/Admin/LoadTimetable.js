import React, { useState, useMemo, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, momentTimezone  } from "@mobiscroll/react";
import axios from 'axios';
import moment from 'moment-timezone';

const detectClash = (data) => {
  let clashes = [];
  console.log(data);
  for (let i = 0; i < data.length; i++){
    for (let j = i+1; j < data.length; j++){
      //check times of each
      
      let start_i=data[i].start.toLocaleTimeString('en-US',{ hour12: false });
      let start_j=data[j].start.toLocaleTimeString('en-US',{ hour12: false });
      let end_i=data[i].end.toLocaleTimeString('en-US',{ hour12: false });
      let end_j=data[j].end.toLocaleTimeString('en-US',{ hour12: false });
      if (start_i === start_j || (start_i < start_j && end_i > start_j) || (start_i > start_j && end_j > start_i)){
        //check day of each
        let date1 = new Date(data[i].date);
        
        let date2 = new Date(data[j].date);
        
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


const LoadTimetable = forwardRef(({ifEventSelected, displayClashes, ChangeSelectedClass, id, role, onClassClick}, ref) => {
  
  const [myEvents, setEvents] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
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
       
        displayClashes(detectClash(data));
      
       setEvents(data);
    },
    deEnrol({id}){
      const newData = myEvents.filter((element) => {
        return element.id !==id;
      });
      displayClashes(detectClash(newData));
      setEvents(newData);
    }
  }));
  //events object has color, end, id, start, title
  useEffect(() => {
    const getClasses = async () => {
      // const studentID= "/student/"+ toString(id);
      await axios
      .get(`/${role}/${id}`)
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
              interval: 1
            }
          };
        })
        if (detectClash(data).length > 0){
            displayClashes(detectClash(data));
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
        onCellClick={onCellClick}
        onEventClick={onEventClick}
        onEventDoubleClick={onEventDoubleClick}
        renderScheduleEventContent={renderScheduleEventContent}
      />
    </div>
  );
});

export default LoadTimetable;