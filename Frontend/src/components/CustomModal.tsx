import { Modal } from "flowbite-react";
import { useState } from "react";
import { GoNumber } from "react-icons/go";
import { CustomModalProps } from "../types";
import PostAttendance from "../api/PostAttendance";
import toast from "react-hot-toast";

export function CustomModal({
  openModal,
  setOpenModal,
  person,
}: CustomModalProps) {
  const [number, setNumber] = useState<number>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (number && number.toString().length === 3) {
      // Eğer numara 3 haneli ise
      if (person.values[0] === number.toString()) {
        // Eğer numara eşleşiyor ise
        toast
          .promise(PostAttendance(Number(person.index)), {
            loading: "Yoklama alınıyor...",
            success: "Yoklama alındı",
            error: "Yoklama alınamadı",
          })
          .then(() => {
            setOpenModal(false);
          });
      } else {
        toast.error("Öğrenci Numarası Hatalı !");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // max 3 karakter alması için
    const inputValue = e.target.value;
    // İçeriği sadece ilk üç karakter ile sınırla
    const newValue = inputValue.slice(0, 3);
    // Yeni değeri ayarla
    setNumber(Number(newValue));
  };

  return (
    <>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        dismissible
        position="top-center"
      >
        <Modal.Header>Yoklamayı Tamamla</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              İsim : {person.values[1]}
              <br />
              Soyisim : {person.values[2].substring(0, 2) + "***"} <br />
              Öğrenci Numarası : {person.values[0].substring(0, 3) + "******"}
            </div>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Yoklamayı Tamamlamak için Öğrenci Numaranızın son 3 hanesini
              giriniz.
            </p>
            <form
              className="max-w-80 mx-auto flex flex-col items-center"
              onSubmit={handleSubmit}
            >
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <GoNumber color="gray" />
                </div>
                <input
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Son 3 Hanesini Giriniz"
                  required
                  value={number || ""}
                  onChange={handleChange}
                  maxLength={3}
                />
              </div>
              <button
                type="submit"
                className="inline-flex  items-center py-2.5 px-2 mt-2 w-[80%]  justify-center text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Tamamla
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
