import { Calendar, Views } from "react-big-calendar";
import { addHours } from "date-fns";
import { useState } from "react";

import { Navbar } from "../components/Navbar";
import { localizer } from "../../helpers/calendarLocalizer";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { getMessagesEs } from "../../helpers/getMessages";
import { CalendarEvent } from "../components/CalendarEvent";
import { CalendarModal } from "../components/CalendarModal";

const events = [
  {
    title: "Birthday",
    note: "Buy the cake",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
      _id: "123",
      name: "Alberto",
    },
  },
];

export const CalendarPage = () => {
  const [laguage, setLaguage] = useState(false);
  //const [currentView, setCurrentView] = useState(Views.MONTH);
  const [lastView, setLastView] = useState(localStorage.getItem("lastView")) || "week";
  const [currentDate, setCurrentDate] = useState(new Date());

  const onChangeLanguage = () => {
    setLaguage((current) => !current);
  };

  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
  };

  const onSelectEvent = (event) => {
    console.log({ click: event });
  };

  const onViewChange = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
    console.log({ view: event });
  };

  return (
    <>
      <Navbar onChangeLanguage={onChangeLanguage} />
      <Calendar
        culture={laguage && "es"}
        messages={laguage ? getMessagesEs() : {}}
        localizer={localizer}
        events={events}
        //defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        view={lastView}
        onNavigate={setCurrentDate}
        components={{
          event: CalendarEvent,
        }}
        style={{ height: "calc(100vh - 80px)", width: "100%" }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
      />
      <CalendarModal />
    </>
  );
};
