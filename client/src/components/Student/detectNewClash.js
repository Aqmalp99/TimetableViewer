import moment from 'moment-timezone';

export function detectNewClash(newClass, data) {
    let clashes = [];
    for (let i = 0; i < data.length; i++){
        //check times of each
        if (newClass.start_time === moment(data[i].start).format("HH:mm:ss") || (newClass.start_time < moment(data[i].start).format("HH:mm:ss") && newClass.end_time > moment(data[i].start).format("HH:mm:ss")) || (newClass.start_time > moment(data[i].start).format("HH:mm:ss") && moment(data[i].end).format("HH:mm:ss") > newClass.start_time)){
          //check day of each
          let date1 = new Date(moment(newClass.start_date).format('YYYY-MM-DD'));
          let date2 = new Date(moment(data[i].date).format('YYYY-MM-DD'));
          if (date1.getDay() === date2.getDay()){
            //check equality if dates are recurring
            if (date1 < date2){
              while (date1 <= date2){
                if (date1.toString() === date2.toString()){
                  clashes.push({
                    a: newClass,
                    b: data[i],
                  });
                }
                date1.setDate(date1.getDate() + 7);
              }
            }
            else if (date2 < date1) {
              while (date2 <= date1){
                if (date1.toString() === date2.toString()){
                  clashes.push({
                    a: newClass,
                    b: data[i],
                  });
                }
                date2.setDate(date2.getDate() + 7);
              }
            }
            else {
              clashes.push({
                a: newClass,
                b: data[i],
              });
            }
          }
        }
      }
    console.log(clashes);
    return clashes;
  }