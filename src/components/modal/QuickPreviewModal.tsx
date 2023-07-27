import { Dialog, DialogTitleProps, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function QuickPreviewModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500 delay-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-50"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 w-[80%] z-30 p-6 pointer-events-none flex items-start justify-end">
              <button className="text-sm pointer-events-auto font-medium text-gray-600 px-2 py-1 rounded-md hover:bg-gray-100">
                close
              </button>
            </div>
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200 "
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black z-10 backdrop-blur-sm bg-opacity-25" />
          </Transition.Child>

          <div className="fixed z-20 inset-0 overflow-y-auto w-[80%]">
            <div className="w-full h-full min-h-full flex items-start justify-start text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-50 -translate-x-full"
                enterTo="opacity-100 transalate-x-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-50 -translate-x-full"
              >
                <Dialog.Panel className="w-full h-full flex-1 transform overflow-y-auto bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>

                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="my-5">
                    <p className="text-sm max-w-md text-gray-800 leading-7">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Magni enim vitae exercitationem, molestias quasi, dolorem
                      cumque itaque nisi doloribus iste consequuntur quia
                      placeat maxime quas quo animi corporis nobis distinctio.
                      Quaerat suscipit accusantium voluptas amet voluptatem?
                      Illo delectus, eos adipisci minima, nulla corporis a
                      soluta voluptatum, praesentium voluptate quisquam nam.
                      Impedit quod corporis, illum sint voluptate esse adipisci
                      voluptates consequuntur eius dolorem, a alias. Voluptatum
                      et esse placeat maiores cumque dolorum asperiores dolores
                      vitae consequuntur unde vero fugiat, ullam at expedita.
                      Quisquam modi natus doloremque quibusdam voluptatem, ad
                      id, ducimus, omnis excepturi iure harum nesciunt rerum
                      mollitia vitae quas ex!
                    </p>
                  </div>

                  <div className="my-5">
                    <p className="text-sm max-w-md text-gray-800 leading-7">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Magni enim vitae exercitationem, molestias quasi, dolorem
                      cumque itaque nisi doloribus iste consequuntur quia
                      placeat maxime quas quo animi corporis nobis distinctio.
                      Quaerat suscipit accusantium voluptas amet voluptatem?
                      Illo delectus, eos adipisci minima, nulla corporis a
                      soluta voluptatum, praesentium voluptate quisquam nam.
                      Impedit quod corporis, illum sint voluptate esse adipisci
                      voluptates consequuntur eius dolorem, a alias. Voluptatum
                      et esse placeat maiores cumque dolorum asperiores dolores
                      vitae consequuntur unde vero fugiat, ullam at expedita.
                      Quisquam modi natus doloremque quibusdam voluptatem, ad
                      id, ducimus, omnis excepturi iure harum nesciunt rerum
                      mollitia vitae quas ex!
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
