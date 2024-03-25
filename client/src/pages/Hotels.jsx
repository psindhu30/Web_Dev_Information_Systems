import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import HotelCard from "../components/HotelCard";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import "../styles/hotels.css";
import "../styles/hotelrange.css";
import { useFetchNoUrl } from "../hooks/useFetch";
import { SearchContext } from "../context/searchContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Hotels() {
  const { dispatch } = useContext(SearchContext);
  const { state } = useLocation();
  console.log(state)
  const [date, setDate] = useState([
    {
      startDate: state?.date[0]?.startDate ? state?.date[0]?.startDate : new Date(),
      endDate: state?.date[0]?.endDate ? state?.date[0]?.endDate : new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adults: state?.options?.adults,
    children: state?.options?.children,
    rooms: state?.options?.rooms,
    minprice: 0,
    maxprice: 999999,
    destination: state?.destination,
  });
  const [openDate, setOpenDate] = useState(false);
  const { data, loading, refetchData } = useFetchNoUrl(
    `/hotel/getallhotels?city=${options.destination}&min=${options.minprice}&max=${options.maxprice}`
  );

 

  const inputHandler = (e) => {
    const { name, value } = e.target;
    if (
      (name === "minprice" && value < 0) ||
      (name === "maxprice" && value < 0)
    ) {
      return;
    }
    return setOptions({
      ...options,
      [name]: value,
    });
  };

  const btnHandler = () => {
    dispatch({
      type: "NEW_STATE",
      payload: {
        city: options.destination,
        dates: date,
        options: {
          adults: options.adults,
          children: options.children,
          rooms: options.rooms,
        },
      },
    });
    refetchData();
  };

  return (
    <>
      <Navbar />
      <section className="hotel-section">
        {loading ? (
          <h2 className="loading">Loading...</h2>
        ) : (
          <div className="hotel-container">
            <div className="search-container">
              <h3>Search</h3>
              <div className="hotel-input-container">
                <label htmlFor="hotel-input">Destination</label>
                <input
                  type="text"
                  className="header-input hotel-input"
                  value={options.destination}
                  onChange={inputHandler}
                  name="destination"
                />
              </div>
              <div className="hotel-input-container">
                <label htmlFor="hotel-input">Check-in-date</label>
                <span
                  className="header-input hotel-input"
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
              <div className="hotel-options-container">
                <h4>Options</h4>
                <div className="hotel-option">
                  <span>Min price (per night)</span>
                  <input
                    type="number"
                    className="hotel-input"
                    value={options.minprice}
                    onChange={inputHandler}
                    name="minprice"
                  />
                </div>
                <div className="hotel-option">
                  <span>Max price (per night)</span>
                  <input
                    type="number"
                    className="hotel-input"
                    value={options.maxprice}
                    onChange={inputHandler}
                    name="maxprice"
                  />
                </div>
                <div className="hotel-option">
                  <span>Adults</span>
                  <input
                    type="text"
                    className="hotel-input"
                    value={options.adults}
                    onChange={inputHandler}
                    name="adults"
                  />
                </div>
                <div className="hotel-option">
                  <span>Children</span>
                  <input
                    type="text"
                    className="hotel-input"
                    value={options.children}
                    onChange={inputHandler}
                    name="children"
                  />
                </div>
                <div className="hotel-option">
                  <span>Rooms</span>
                  <input
                    type="text"
                    className="hotel-input"
                    value={options.rooms}
                    onChange={inputHandler}
                    name="rooms"
                  />
                </div>
              </div>
              <button
                className="btn btn-header"
                onClick={btnHandler}
              >
                search
              </button>
            </div>

            <div className="hotel-cards-container">
            {data.length === 0 ? (
                <p>No Results found for your searched query</p>
              ) : (
                data.map((ele, i) => (
                  <HotelCard key={i} ele={ele} />
                ))
              )}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

export default Hotels;





