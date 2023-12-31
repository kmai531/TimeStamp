import React, { useState } from 'react';
import Modal from '../components/Modal';

const Homepage = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex flex-col items-center">
            <h1 className=" text-5xl mt-24 text-center">Total Hours</h1>
            <h2 className=" text-center text-4xl mt-4">23H56M</h2>
            <div className="flex gap-8 mt-8">
                <button
                    className="block w-full select-none rounded-lg bg-zinc-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-zinc-500/20 transition-all hover:shadow-lg hover:shadow-zinc-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    data-ripple-light="true"
                >
                    Enter Hours
                </button>
                <button
                    className="block w-full select-none rounded-lg bg-zinc-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-zinc-500/20 transition-all hover:shadow-lg hover:shadow-zinc-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    data-ripple-light="true"
                    onClick={() => setOpen(true)}
                >
                    Enter hours manually
                </button>
            </div>
            {/* <button className="w-60 h-60 mt-10 flex items-center justify-center bg-white hover:bg-slate-50 text-white font-bold py-2 px-4 rounded-full focus:outline-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="15em"
                    viewBox="0 0 512 512"
                >
                    <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                </svg>
            </button> */}
            <button
                className=" middle none center w-60 h-60 mt-10 rounded-full bg-slate-500 py-3.5 px-7 font-sans text-4xl font-bold uppercase text-white shadow-md shadow-slate-500/20 transition-all hover:shadow-lg hover:shadow-slate-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
            >
                CLOCK IN
            </button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="text-center w-64 flex flex-col justify-center">
                    <h1 className="text-4xl mb-4 text-center">
                        Enter your time
                    </h1>
                    <form className="flex flex-col gap-7 justify-center">
                        <div className='flex gap-3 justify-center items-center'>
                            <label>Date: </label>
                            <input name="date" type="date" required />
                        </div>
                        <div className="">
                            <div className="relative h-11 w-full min-w-[180]">
                                <input
                                    placeholder="hours"
                                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                />
                                <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Enter your hours
                                </label>
                            </div>
                        </div>
                        <div className="">
                            <div className="relative w-full min-w-[200px]">
                                <textarea
                                    className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                                    placeholder=" "
                                ></textarea>
                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Message
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button
                                className="block w-full select-none rounded-lg bg-teal-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-teal-800/20 transition-all hover:shadow-lg hover:shadow-teal-800/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                                data-ripple-light="true"
                                onClick={() => setOpen(false)}
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default Homepage;
