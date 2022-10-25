export function detectClash(data) {
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
    console.log(clashes);
    return clashes;
  }
