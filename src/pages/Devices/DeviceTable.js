import { BsFillExclamationTriangleFill } from "react-icons/bs";

export const DeviceTable = ({devices}) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            { devices.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Serial
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {devices.map((d) => (
                  <tr key={d.id} >
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {d.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {d.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {d.location}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <a className="text-green-500 hover:text-green-700" href="#">
                        Edit
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <a className="text-red-500 hover:text-red-700" href="#">
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> ) : (
                <div className="flex flex-col space-y-4 justify-center items-center p-4 sm:m-10">
                  <div className="text-4xl text-gray-400">
                    <BsFillExclamationTriangleFill />
                  </div>
                  <h2 className="font-medium text-sm sm:text-lg text-gray-500 text-center">There are currently no devices in this workspace, please click Add Device above to add your first workspace device.</h2>
                </div>
            ) }
          </div>
        </div>
      </div>
    </div>
  );
};