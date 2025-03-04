import { Calendar } from "react-big-calendar";
import { addHours } from "date-fns";

import { Navbar } from "../components/Navbar";
import { localizer } from "../../helpers/calendarLocalizer";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { getMessagesEs } from "../../helpers/getMessages";

const events = [
  {
    title: "Big Meeting",
    notes: "Meeting with clients",
    start: new Date(),
    end: addHours(new Date(), 2),
  },
];

export const CalendarPage = () => {
  const evenStyleGetter = (event, start, end, isSelected) => {
    console.log({ event, start, end, isSelected });

    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return { style };
  };

  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={getMessagesEs()}
        eventPropGetter={evenStyleGetter}
      />
    </>
  );
};
