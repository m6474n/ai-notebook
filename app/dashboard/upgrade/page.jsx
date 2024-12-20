import React from 'react'

export default function page() {
  return (
    <div className='p-10  text-center'>
        <h2 className='text-4xl font-'>Plans</h2>
        <p>Upgrade your plan to add multiple files and take notes.</p>
<div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
  
      <div className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-900">
            Starter
            <span className="sr-only">Plan</span>
          </h2>
  
          <p className="mt-2 sm:mt-4">
            <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> 0$ </strong>
  
            <span className="text-sm font-medium text-gray-700">/month</span>
          </p>
        </div>
  
        <ul className="mt-6 space-y-2 flex items-center justify-center">
          <li className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-slate-700"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
  
            <span className="text-gray-700"> Upload 5 files only. </span>
          </li>
  
          {/* <li className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-slate-700"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
  
            <span className="text-gray-700">  </span>
          </li>
  
          <li className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-slate-700"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
  
            <span className="text-gray-700"> Email support </span>
          </li>
  
          <li className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-slate-700"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
  
            <span className="text-gray-700"> Help center access </span>
          </li> */}
        </ul>
  
        <a
          href="#"
          className="mt-8 block rounded-full border border-slate-600 bg-white px-12 py-3 text-center text-sm font-medium text-slate-600 hover:bg-slate-200   active:text-slate-500"
        >
          Get Started
        </a>
      </div>
      <div className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-900">
            Starter
            <span className="sr-only">Plan</span>
          </h2>
  
          <p className="mt-2 sm:mt-4">
            <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> 8$ </strong>
  
            <span className="text-sm font-medium text-gray-700">/month</span>
          </p>
        </div>
  
        <ul className="mt-6 space-y-2 flex items-center justify-center flex-col ">
          <li className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-slate-700"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
  
            <span className="text-gray-700"> Upload unlimited files. </span>
          </li>
  
          <li className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-slate-700"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
  
            <span className="text-gray-700"> Store unlimited notes.</span>
          </li>
  
          <li className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-slate-700"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
  
            <span className="text-gray-700">Make unlimited AI Requests</span>
          </li>
  
         
        </ul>
  
        <a
          href="#"
          className="mt-8 block rounded-full border border-slate-600 bg-slate-600 px-12 py-3 text-center text-sm font-medium text-white hover:ring-1 hover:ring-slate-600 focus:outline-none "
        >
          Comming Soon!
        </a>
      </div>
    </div>
  </div>
    </div>
  )
}
