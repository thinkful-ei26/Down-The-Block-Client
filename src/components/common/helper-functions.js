export function todaysDate (){
  let date = new Date().toLocaleDateString();
  let dateArr = date.split('/');
  let year = dateArr[2];
  let month = dateArr[0].length===1 ? "0" + dateArr[0] : dateArr[0] ;
  let day = dateArr[1].length===1 ? "0" + dateArr[1] : dateArr[1] ;
  let finalDate = year + "-" + month + "-" + day;
  return finalDate;
}

export function formatDate(dateString){
  let dateArr = dateString.split('-');
  return new Date(dateArr[0], dateArr[1]-1, dateArr[2]);
}

function unabbreviated(str){
  switch(str) {
    case "Mon":
      return "Monday"
    case "Tue":
      return "Tuesday"
    case "Wed":
      return "Wednesday"
    case "Thu":
      return "Thursday"
    case "Fri":
      return "Friday"
    case "Sat":
      return "Saturday"
    case "Sun":
      return "Sunday";
    
    case "Jan":
      return "January"
    case "Feb":
      return "February"
    case "Mar":
      return "March"
    case "Apr":
      return "April"
    case "May":
      return "May"
    case "Jun":
      return "June"
    case "Jul":
      return "July";
    case "Aug":
      return "August"
    case "Sep":
      return "September"
    case "Oct":
      return "October"
    case "Nov":
      return "November";
    case "Dec":
      return "December";
    default:
      return str;
  }
}

export function formatLongDate(dateString){
  let dateArr = dateString.split('-');
  let newDate = new Date(dateArr[0], dateArr[1]-1, dateArr[2]).toDateString();
  //newdate is Wed Jan 02 2019
  dateArr = newDate.split(' ');
  let nameDay = dateArr[0];
  let month = dateArr[1];
  let day = dateArr[2];
  let year = dateArr[3];

  nameDay=unabbreviated(nameDay);
  month = unabbreviated(month);

  return `${nameDay}, ${month} ${day}, ${year}`
}