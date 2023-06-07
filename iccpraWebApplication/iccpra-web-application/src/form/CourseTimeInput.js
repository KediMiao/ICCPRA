import { startOfTomorrow, getDay, getHours } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

function CourseTimeInput({ value, onChange }) {
  //calendar time filter
  const isSaturday = (date) => {
    return getDay(date) === 6;
  };
  //calendar time filter
  const filterTime = (time) => {
    const hours = getHours(time);
    return hours === 10;
  };
  return (
    <label>
      Course Time *
      <div className="form-note">
        Only 10:00 AM at Saturday is available currently
      </div>
      <DatePicker
        selected={value.courseTime}
        onChange={onChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={60}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
        minDate={startOfTomorrow()}
        filterDate={isSaturday}
        filterTime={filterTime}
        placeholderText="Select Course Time"
        required
      />
    </label>
  );
}
export default CourseTimeInput;
