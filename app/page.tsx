'use client'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, {
	Draggable,
	DropArg
} from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Fragment, useEffect, useState } from 'react'
import moment from 'moment'
import { Dialog, Transition } from '@headlessui/react'

interface IEvent {
	title: string
	startTime: Date | string
	allDay: boolean
	id: number
}

export default function Home() {
	const [events, setEvents] = useState([
		{ title: 'event 1', id: '1' },
		{ title: 'event 2', id: '2' },
		{ title: 'event 3', id: '3' },
		{ title: 'event 4', id: '4' },
		{ title: 'event 5', id: '5' }
	])

	const [allEvents, setAllEvents] = useState<IEvent[]>([])
	const [showModal, setShowModal] = useState<boolean>(false)
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>()
	const [idToDelete, setIdToDelete] = useState<number | null>(null)
	const [newEvent, setNewEvent] = useState<IEvent | null>({
		title: '',
		startTime: '',
		allDay: false,
		id: 0
	})

	useEffect(() => {
		let draggableEl = document.getElementById('draggable-el')

		if (draggableEl) {
			new Draggable(draggableEl, {
				itemSelector: '.fc-event',
				eventData: function (eventEl) {
					let title = eventEl.getAttribute('title')
					let id = eventEl.getAttribute('data')
					let start = eventEl.getAttribute('start')

					return { title, id, start }
				}
			})
		}
	}, [])

	function handleDateClick(arg: { date: Date; allDay: boolean }) {
		setNewEvent({
			...newEvent,
			start: arg.date,
			allDay: arg.allDay,
			id: new Date().getTime()
		})

		console.log(moment(arg.date).format('DD/MM/YYYY'))

		setShowModal(true)
	}

	function addEvent(data: DropArg) {
		const event = {
			...newEvent,
			start: data.date.toISOString(),
			title: data.draggedEl.innerText,
			allDay: data.allDay,
			id: new Date().getTime()
		}

		console.log('DATA', data)

		setAllEvents([...allEvents, event])
	}

	function handleDeleteModal(data: { event: { id: string } }) {
		setShowDeleteModal(true)
		setIdToDelete(Number(data.event.id))
	}

	return (
		<>
			<nav className='flex justify-between mb-12 border-b border-violet-100 p-4'>
				<h1 className='font-bold text-2xl text-gray-700'>Calendar</h1>
			</nav>
			<main className='flex h-full flex-col items-center justify-between p-24'>
				<div className='grid grid-cols-10'>
					<div className='col-span-8'>
						<FullCalendar
							plugins={[
								dayGridPlugin,
								interactionPlugin,
								timeGridPlugin
							]}
							headerToolbar={{
								left: 'prev,next today',
								center: 'title',
								right: 'resourceTimeLineWeek, dayGridMonth, timeGridWeek'
							}}
							events={allEvents}
							nowIndicator={true}
							editable={true}
							droppable={true}
							selectable={true}
							selectMirror={true}
							dateClick={handleDateClick}
							drop={(data) => addEvent(data)}
							eventClick={(data) => handleDeleteModal(data)}
						/>
					</div>
					<div
						id='draggable-el'
						className='ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50'
					>
						<h1 className='font-bold text-lg text-center'>
							Drag Event
						</h1>
						{events.map((event) => (
							<div
								className='fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white'
								title={event.title}
								key={event.id}
							>
								{event.title}
							</div>
						))}
					</div>
				</div>
				<Transition.Root show={showDeleteModal} as={Fragment}>
					<Dialog
						as={'div'}
						className='relative z-10'
						onClose={setShowDeleteModal}
					>
						<Transition.Child
							as={Fragment}
							enter={'ease-out duration-300'}
							enterFrom={'opacity-0'}
							enterTo={'opacity-100'}
							leave={'ease-in duration-200'}
							leaveFrom={'opacity-100'}
							leaveTo={'opacity-0'}
						>
							<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>
						</Transition.Child>
						<div className='fixed inset-0 z-10 overflow-y-auto'>
							<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
								<Transition.Child
									as={Fragment}
									enter='ease-out duration-300'
									enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
									enterTo='opacity-100 transition-y-0 sm:scale-100'
									leave='ease-in duration-200'
									leaveFrom='opacity-100 transition-y-0 sm:scale-100'
									leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
								></Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition.Root>
			</main>
		</>
	)
}
