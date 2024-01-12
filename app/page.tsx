'use client'
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"

export default function Home() {
	return (
		<>
			<nav className='flex justify-between mb-12 border-b border-violet-100 p-4'>
        <h1 className="font-bold text-2xl text-gray-700">Calendar</h1>
      </nav>
			<main className='flex h-full flex-col items-center justify-between p-24'>
        <div className="grid grid-cols-10">
          <div className="col-span-8">
            <FullCalendar
              plugins={[
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin
              ]}
            />
          </div>
        </div>
      </main>
		</>
	)
}
