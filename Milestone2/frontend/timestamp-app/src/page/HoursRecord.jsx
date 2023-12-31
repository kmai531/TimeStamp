import React, { useState } from "react";
import Modal from "../components/Modal";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from 'react-hot-toast';

const HoursRecord = () => {
  const navigate = useNavigate();
  let user;
  // let records;
  let recordCards;
  const [records, setRecords] = useState([]);
  const [status, setStatus] = useState("idle");
  const [selectedRecord, setSelectedRecord] = useState({date: '', minutes: 0, notes: ''});
  const date = useRef();
  useEffect(() => {
    // re-render modal when selectedRecord changes
  }, [selectedRecord])
  const checkUser = async () => {
    setStatus("loading");
    user = await (await fetch("/api/login/users/current")).json();
    console.log("USER IS", user);
    if (user !== undefined && user !== null && user.role !== undefined) {
      if (user.role === "employer") {
        // TODO: Navigate employer to employer page
        navigate('/dashboard/employer_home');
      }
      try {
        const data = await (await fetch("/api/records/" + user.id)).json();
        console.log(data);
        setRecords(data);
        setStatus("success");
      } catch (error) {
        setStatus("Error");
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const [open, setOpen] = useState(false);
  //Enter time manually
  const [manualHours, setManualHours] = useState("");
  const [manualMinutes, setManualMinutes] = useState("");
  const handleManualHoursInput = (e) => {
    if (!isNaN(e.target.value)) {
      setManualHours(e.target.value);
    }
  };
  const message = useRef();
  const handleSubmitEditedTime = async () => {
    if (manualHours === "" || manualMinutes === "" || isNaN(manualHours) || isNaN(manualMinutes) || (manualHours === "0" || manualMinutes === "0") || manualHours > 24 || manualMinutes > 59 || date.current.value === '') {
      toast.error("Please enter a valid date and hours and minutes.");
      return;
    }
    console.log(manualHours);
    console.log(await message.current.value);
    let minutes = parseInt(manualMinutes) + parseInt(manualHours) * 60;
    selectedRecord.minutes = minutes;
    selectedRecord.date = await date.current.value;
    selectedRecord.notes = await message.current.value;
    let body = {
      date: await date.current.value,
      notes: await message.current.value,
      minutes: minutes
    };
    console.log("BODY IS", body, "BEFORE PUT");
    let updatedRecord = await (await fetch('/api/records/' + selectedRecord.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    })).json();
    console.log("AFTER PUT, UPDATED RECORD IS", updatedRecord);
    setManualHours("");
    setManualMinutes("");
    message.current.value = "";
    setOpen(false);
    toast.success("Record updated successfully!");
  };
  const formatDate = (date) => {
    let tempDate = new Date(date.setDate(date.getDate() + 1));
    let month = tempDate.getMonth() + 1;
    // // let temp = [];
    let day = tempDate.getDate();
    let year = tempDate.getFullYear();
    console.log("THIS IS THE NEW DATE", tempDate.toDateString());
    let temp;
    if (month < 10 && day < 10) {
      temp = ''.concat(year, "-0", month, "-0", day);
    }
    else if (month < 10) {
      temp = ''.concat(year, "-0", month, "-", day);
    }
    else if (day < 10) {
      temp = ''.concat(year, "-", month, "-0", day);
    }
    else {
      temp = ''.concat(year, "-", month, "-", day);
    }
    // let temp = date.toLocaleDateString("en-US");
    // let temp2 = temp.replaceAll('/', '-');
    return temp;
  }
  const formatDateString = (date) => {
    let tempDate = new Date(date.setDate(date.getDate() + 1));
    return tempDate.toDateString();
  }
  const handleManualMinutesInput = (e) => {
    if (!isNaN(e.target.value)) {
      setManualMinutes(e.target.value);
    }
  }
  const renderRecords = () => {
    switch (status) {
      case "loading":
        return <div>Loading</div>;
      case "error":
        return <div>Error</div>;
      case "success":
        console.log("was i ehre");
        return records.map((item) => {
          return (
            <div id="${item.id}" className="relative mt-6 flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div className="p-6 pb-0">
                <div className="flex justify-between">
                  <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    {formatDateString(new Date(item.date))}
                  </h5>
                  <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    {Math.floor(item.minutes / 60)}H {item.minutes % 60}M
                  </h5>
                </div>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                  {item.notes}
                </p>
              </div>
              <div className="p-6 pt-4">
                <a
                  className="!font-medium !text-blue-gray-900 !transition-colors hover:!text-pink-500 cursor-default"
                  href="#"
                >
                  <button
                    className="flex select-none items-center gap-2 rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    data-ripple-dark="true"
                    onClick={() => { setOpen(true); setSelectedRecord(item); console.log("THIS IS THE ITEM", item); console.log("THIS IS THE RECORD", selectedRecord); }}
                  >
                    Edit
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      ></path>
                    </svg>
                  </button>
                </a>
              </div>
            </div >
          );
        });
      default:
        return <div>Idle...</div>;
    }
  };
  return (
    <div
      className="overflow-y-auto w-full flex flex-col items-center"
      style={{ maxHeight: "calc(100vh - 5rem)" }}
    >
      <h1 className=" text-4xl mt-8 text-center">My Hours</h1>
      {renderRecords()}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-center w-64 flex flex-col justify-center">
          <h1 className="text-4xl mb-4 text-center">Edit your time</h1>
          <form className="flex flex-col gap-7 justify-center">
            <div className="flex gap-3 justify-center items-center">
              <label>Date: </label>
              <input name="date" type="date" ref={date} required /*defaultValue={formatDate(new Date(selectedRecord.date))}*/ />
            </div> 
            <div className="">
              <div className="relative h-11 w-full min-w-[180]">
                <input
                  placeholder="hours"
                  className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  // defaultValue={`${parseInt(parseInt(selectedRecord.minutes) / 60)}`}
                  onInput={(e) => handleManualHoursInput(e)}
                />
                <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Enter your hours
                </label>
              </div>
            </div>
            <div className="">
              <div className="relative h-11 w-full min-w-[180]">
                <input
                  placeholder="minutes"
                  className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  // defaultValue={parseInt(parseInt(selectedRecord.minutes) % 60)}
                  onInput={(e) => handleManualMinutesInput(e)}
                />
                <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Enter your minutes
                </label>
              </div>
            </div>
            <div className="">
              <div className="relative w-full min-w-[200px]">
                <textarea
                  // ref={selectedRecord.notes}
                  defaultValue={selectedRecord.notes}
                  ref={message}
                  className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                ></textarea>
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Enter your note
                </label>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="block w-full select-none rounded-lg bg-teal-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-teal-800/20 transition-all hover:shadow-lg hover:shadow-teal-800/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-ripple-light="true"
                onClick={handleSubmitEditedTime}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default HoursRecord;
