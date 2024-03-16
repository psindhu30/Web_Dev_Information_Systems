import React, { useContext, useState } from "react";
import "../styles/header.css";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { IoBedOutline } from "react-icons/io5";
import { FiCalendar } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/searchContext";

function Header() {
  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adults: 1,
    children: 0,
    rooms: 1,
  });

  const setNum = (name, operation) => {
    if (operation === "i") {
      setOptions({
        ...options,
        [name]: parseInt([options[name]]) + 1,
      });
    } else if (operation === "d") {
      setOptions({
        ...options,
        [name]: parseInt([options[name]]) - 1,
      });
    }
  };

  const searchBtn = () => {
    dispatch({
      type: "NEW_STATE",
      payload: { city: destination, dates: date, options },
    });
    return navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    <section className="header-section">
      <div className="header-container">
        <div className="header-text">
          <h2>Find your next home away from home</h2>
          <p>Discover unbeatable deals on hotels, homes, and more...</p>
        </div>
        <div className="header-range-container">
          <div className="header-beach-resort header-input-container">
            <IoBedOutline />
            <input
              type="text"
              className="header-input"
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              placeholder="Where are you going?"
              value={destination}
            />
          </div>
          <div className="header-date-range header-input-container">
            <FiCalendar />
            <span
              className="header-input"
              onClick={() => {
                setOpenDate(!openDate);
              }}
            >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
              date[0].endDate,
              "dd/MM/yyyy"
            )}`}</span>
            {openDate && (
              <DateRangePicker
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
                minDate={new Date()}
              />
            )}
          </div>
          <div className="header-count header-input-container">
            <BsPerson />
            <span
              className="header-input"
              onClick={() => {
                setOpenOptions(!openOptions);
              }}
            >
              {`${options.adults} adults ${options.children} children ${options.rooms} rooms`}
            </span>
            {openOptions && (
              <div className="range-box">
                <div className="header-adult-cont">
                  <span className="header-adult-name">Adults</span>
                  <div className="header-adult-btn">
                    <button
                      className="incdec-btn"
                      onClick={() => {
                        setNum("adults", "d");
                      }}
                    >
                      ➖
                    </button>
                    <span className="header-adult-value">{options.adults}</span>
                    <button
                      className="incdec-btn"
                      onClick={() => {
                        setNum("adults", "i");
                      }}
                    >
                      ➕
                    </button>
                  </div>
                </div>
                <div className="header-adult-cont">
                  <span className="header-adult-name">Children</span>
                  <div className="header-adult-btn">
                    <button
                      className="incdec-btn"
                      onClick={() => {
                        setNum("children", "d");
                      }}
                    >
                      ➖
                    </button>
                    <span className="header-adult-value">
                      {options.children}
                    </span>
                    <button
                      className="incdec-btn"
                      onClick={() => {
                        setNum("children", "i");
                      }}
                    >
                      ➕
                    </button>
                  </div>
                </div>
                <div className="header-adult-cont">
                  <span className="header-adult-name">Rooms</span>
                  <div className="header-adult-btn">
                    <button
                      className="incdec-btn"
                      onClick={() => {
                        setNum("rooms", "d");
                      }}
                    >
                      ➖
                    </button>
                    <span className="header-adult-value">{options.rooms}</span>
                    <button
                      className="incdec-btn"
                      onClick={() => {
                        setNum("rooms", "i");
                      }}
                    >
                      ➕
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button className="btn btn-header" onClick={searchBtn}>
            search
          </button>
        </div>
      </div>
    </section>
  );
}

export default Header;
