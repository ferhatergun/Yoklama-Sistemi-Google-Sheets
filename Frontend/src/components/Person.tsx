import { CustomModal } from "./CustomModal";
import { useState } from "react";

export default function Person({ person }: any) {
  console.log(person.values[1]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="pl-4 pr-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {person.values[1]}
      </th>
      <td className="pl-4 pr-1 py-4">
        {person.values[2].substring(0, 2) + "***"}
      </td>
      <td className="pr-4 py-4 text-right" onClick={() => setOpenModal(true)}>
        <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Seç
        </a>
      </td>
      <CustomModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        person={person}
      />
    </tr>
  );
}
