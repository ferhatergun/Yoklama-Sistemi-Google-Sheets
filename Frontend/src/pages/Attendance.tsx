import { BsPerson } from "react-icons/bs";
import Person from "../components/Person";
import { useState } from "react";
import getPerson from "../api/getPerson";
import Loader from "../components/Loader";

export default function Attendance() {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);
  const [persons, setPersons] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(false);
    setSearch(true);
    const data = await getPerson(name);
    setPersons(data.data);
    setLoading(true);
    setSearch(false);
  };

  return (
    <div>
      <h2 className="mb-5">Yoklama için kalan süreniz: 00:00:00</h2>

      <form
        className="flex items-center 2xl:w-[25%] lg:w-[30%] md:w-[60%] sm:w-[70%] w-[90%] justify-center mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <BsPerson color="gray" />
          </div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="İsminizi Giriniz"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-2 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          Ara
        </button>
      </form>
      <div className="2xl:w-[25%] lg:w-[30%] md:w-[60%] sm:w-[70%] w-[90%] mx-auto mt-3">
        {search && (
          <div className={"flex justify-center mt-5"}>
            Yükleniyor
            <Loader />
          </div>
        )}

        <div
          className={`relative overflow-x-auto shadow-md sm:rounded-lg ${
            loading ? null : "hidden"
          }`}
        >
          <p className="text-start">Bulunan Kişiler</p>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  İsim
                </th>
                <th scope="col" className="pl-4 pr-1 py-3">
                  Soyisim
                </th>
                <th scope="col" className="px-4 py-3">
                  <span className="sr-only">Seç</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {persons?.map((person, index) => (
                <Person key={index} person={person} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
