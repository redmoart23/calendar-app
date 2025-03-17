import { Calendar, Views } from "react-big-calendar";
import { useEffect, useState } from "react";

import { Navbar } from "../components/Navbar";
import { CalendarModal } from "../components/CalendarModal";
import { localizer } from "../../helpers/calendarLocalizer";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { getMessagesEs } from "../../helpers/getMessages";
import { CalendarEvent } from "../components/CalendarEvent";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelete";

export const CalendarPage = () => {

  const {user} = useAuthStore();

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent , startLoadingEvents} = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem("lastView")  || "week");
  const [laguage, setLaguage] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // eslint-disable-next-line no-unused-vars
  const evenStyleGetter = (event, start, end, isSelected) => {
    
    const isMyEvent = (user.uid === event.user._id) ||  (user.uid === event.user.uid)
    
    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    }

    return {
      style
    }
  };

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

  useEffect(() => {
    startLoadingEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar onChangeLanguage={onChangeLanguage} />
      <Calendar
        culture={laguage && "es"}
        messages={laguage ? getMessagesEs() : {}}
        localizer={localizer}
        events={events || []}
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
        styleEvent={evenStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
      />
      <FabAddNew />
      <FabDelete />
      <CalendarModal />
    </>
  );
};
