import { AppointmenData } from "../interfaces/appointment.interface";

interface Props {
  filterOption: string;
  appointmentList: AppointmenData
}

export default function FilterAppointmentList({ filterOption, appointmentList }: Props) {
  let statusColor: string;

  switch (filterOption) {
    case 'pending':
      statusColor = 'bg-amber-600';
      break;
    case 'attended':
      statusColor = 'bg-green-800';
      break;
    case 'lost':
      statusColor = 'bg-red-800';
      break;

    default:
      statusColor = 'bg-gray-800';
      break;
  }

  return (
    <section className="flex flex-col w-3/12 shadow-lg shadow-gray-800 rounded-md">
      <h1 className={`text-2xl py-4 px-6 ${statusColor} text-white text-center font-bold uppercase`}>
        {filterOption}
      </h1>
      <ul className="w-full py-4 px-6 h-96 overflow-auto">

        {
          appointmentList.filter(appo => appo.status === filterOption).map((appointmentData, idx) => (
            <li key={idx} className="w-full flex justify-between bg-gray-200 shadow-gray-400 rounded-lg mb-3">
              <section className="w-4/5 p-2">
                <h1><span className="font-bold">Hour: </span>{appointmentData.hour}</h1>
                <h1><span className="font-bold">Date: </span>{(new Date(appointmentData.date).toDateString())}</h1>
              </section>
            </li>
          ))
        }
      </ul>
    </section >
  )
}
