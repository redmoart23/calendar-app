import { Calendar, Views } from "react-big-calendar";
import { useState } from "react";

import { Navbar } from "../components/Navbar";
import { localizer } from "../../helpers/calendarLocalizer";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { getMessagesEs } from "../../helpers/getMessages";
import { CalendarEvent } from "../components/CalendarEvent";
import { CalendarModal } from "../components/CalendarModal";
import { useUiStore, useCalendarStore } from "../../hooks";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelete";

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const [laguage, setLaguage] = useState(false);
  const [lastView, setLastView] =
    useState(localStorage.getItem("lastView")) || "week";
  const [currentDate, setCurrentDate] = useState(new Date());

  const { events, setActiveEvent } = useCalendarStore();

  const onChangeLanguage = () => {
    setLaguage((current) => !current);
  };

  const onDoubleClick = () => {
    openDateModal();
  };

  const onSelectEvent = (event) => {
    setActiveEvent(event);
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
      <FabAddNew />
      <FabDelete />
    </>
  );
};
