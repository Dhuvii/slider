import { useState } from "react";
import QuickPreviewModal from "../modal/QuickPreviewModal";

const EmployeeCard = () => {
  const [showQuickPreviewModal, setShowQuickPreviewModal] = useState(false);

  return (
    <>
      <div className="w-full max-w-5xl bg-white p-3 border rounded-2xl flex">
        <div className="p-3 w-72 flex-shrink-0 border rounded-xl bg-white shadow-lg">
          <div className="w-full h-full flex items-center justify-center flex-col">
            <div className="p-1 border rounded-xl">
              <img
                className="w-24 h-24 object-cover rounded-lg"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=5&w=96&q=80"
                alt=""
              />
            </div>

            <div className="w-full mt-2">
              <h3 className="text-xl text-center font-bold text-gray-700">
                Elenie Fernando
              </h3>
              <p className="text-[0.7rem] text-center text-gray-600">
                Administrative and accounting
              </p>
            </div>

            <div className="mt-5 flex items-center justify-center gap-3">
              <div className="flex flex-col items-end justify-center">
                <span className="text-[0.6rem] uppercase font-medium text-gray-400 tracking-wide">
                  hourly rate
                </span>
                <p className="font-bold text-base text-gray-800">$3.75</p>
              </div>

              <span className="text-gray-400">|</span>

              <div className="flex flex-col items-start justify-center">
                <span className="text-[0.6rem] uppercase font-medium text-gray-400 tracking-wide">
                  monthly rate
                </span>
                <p className="font-bold text-base text-gray-800">$500</p>
              </div>
            </div>

            <div className="my-8 grid grid-cols-2 items-center justify-items-center gap-10">
              <div className=" flex items-center justify-center flex-col">
                <svg className="w-6 h-6 text-gray-600" viewBox="0 0 16 16">
                  <path
                    fill="currentColor"
                    d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zm2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86A8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527a8.035 8.035 0 0 0-3.527-3.527z"
                  />
                </svg>
                <p className="text-base font-medium text-gray-800">
                  80
                  <span className="ml-1 text-[0.7rem] text-gray-500">
                    hrs / month
                  </span>
                </p>
                <p className="mt-1 text-[0.7rem] font-medium uppercase text-gray-500">
                  availability
                </p>
              </div>

              <div className="flex items-center justify-center flex-col">
                <svg className="w-6 h-6 text-gray-600" viewBox="0 0 16 16">
                  <path
                    fill="currentColor"
                    d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"
                  />
                </svg>

                <p className="text-base font-medium text-gray-800">
                  5+
                  <span className="ml-1 text-[0.7rem] text-gray-500">
                    years
                  </span>
                </p>
                <p className="mt-1 text-[0.7rem] font-medium uppercase text-gray-500">
                  experience
                </p>
              </div>

              {/* <div className="flex items-center justify-center flex-col">
              <svg className="w-6 h-6 text-gray-600" viewBox="0 0 16 16">
                <path
                  fill="currentColor"
                  d="M0 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm13 .25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5a.25.25 0 0 0-.25.25zM2.25 8a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 3 8.75v-.5A.25.25 0 0 0 2.75 8h-.5zM4 8.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 5 8.75v-.5A.25.25 0 0 0 4.75 8h-.5a.25.25 0 0 0-.25.25zM6.25 8a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 7 8.75v-.5A.25.25 0 0 0 6.75 8h-.5zM8 8.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 9 8.75v-.5A.25.25 0 0 0 8.75 8h-.5a.25.25 0 0 0-.25.25zM13.25 8a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5zm0 2a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5zm-3-2a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h1.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-1.5zm.75 2.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5a.25.25 0 0 0-.25.25zM11.25 6a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5zM9 6.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5A.25.25 0 0 0 9.75 6h-.5a.25.25 0 0 0-.25.25zM7.25 6a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 8 6.75v-.5A.25.25 0 0 0 7.75 6h-.5zM5 6.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 6 6.75v-.5A.25.25 0 0 0 5.75 6h-.5a.25.25 0 0 0-.25.25zM2.25 6a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h1.5A.25.25 0 0 0 4 6.75v-.5A.25.25 0 0 0 3.75 6h-1.5zM2 10.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5a.25.25 0 0 0-.25.25zM4.25 10a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h5.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-5.5z"
                />
              </svg>

              <p className="text-base font-medium text-gray-800">
                Intermediate
              </p>
              <p className="mt-1 text-[0.7rem] font-medium uppercase text-gray-500">
                English
              </p>
            </div>

            <div className="flex items-center justify-center flex-col">
              <svg className="w-6 h-6 text-gray-600" viewBox="0 0 16 16">
                <path
                  fill="currentColor"
                  d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752c1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81c-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02c1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877c1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"
                />
              </svg>

              <p className="text-base font-medium text-gray-800">Graduated</p>
              <p className="mt-1 text-[0.7rem] font-medium uppercase text-gray-500">
                Education
              </p>
            </div> */}
            </div>

            <div className="w-full flex flex-1 items-end gap-3">
              <button
                onClick={() => setShowQuickPreviewModal(true)}
                className="w-full text-gray-600 hover:bg-gray-100 text-sm font-medium rounded-md py-2 px-3"
              >
                Quick Preview
              </button>
              <button className="w-full text-white text-sm font-medium bg-green-600 rounded-md py-2 px-3">
                View Profile
              </button>
            </div>
          </div>
        </div>

        <div className="p-5 w-full">
          <div className="">
            <h2 className="text-2xl font-bold text-gray-800">
              Full Stack web developer
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-800">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
              hic maiores eligendi aspernatur dolorum totam eum voluptates
              doloremque sit temporibus modi magnam ipsa ratione, incidunt
              voluptate animi reiciendis maxime minima inventore fugit quas
              laborum distinctio provident. Veritatis dignissimos vel, porro
              mollitia perferendis tempore libero autem est repudiandae incidunt
              ad molestias!
            </p>
          </div>

          <div className="my-10 flex items-center justify-start gap-16">
            <div className="flex items-center justify-center">
              <div className="">
                <svg className="w-7 h-7 text-gray-600" viewBox="0 0 16 16">
                  <path
                    fill="currentColor"
                    d="M0 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm13 .25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5a.25.25 0 0 0-.25.25zM2.25 8a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 3 8.75v-.5A.25.25 0 0 0 2.75 8h-.5zM4 8.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 5 8.75v-.5A.25.25 0 0 0 4.75 8h-.5a.25.25 0 0 0-.25.25zM6.25 8a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 7 8.75v-.5A.25.25 0 0 0 6.75 8h-.5zM8 8.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 9 8.75v-.5A.25.25 0 0 0 8.75 8h-.5a.25.25 0 0 0-.25.25zM13.25 8a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5zm0 2a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5zm-3-2a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h1.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-1.5zm.75 2.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5a.25.25 0 0 0-.25.25zM11.25 6a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5zM9 6.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5A.25.25 0 0 0 9.75 6h-.5a.25.25 0 0 0-.25.25zM7.25 6a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 8 6.75v-.5A.25.25 0 0 0 7.75 6h-.5zM5 6.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 6 6.75v-.5A.25.25 0 0 0 5.75 6h-.5a.25.25 0 0 0-.25.25zM2.25 6a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h1.5A.25.25 0 0 0 4 6.75v-.5A.25.25 0 0 0 3.75 6h-1.5zM2 10.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-.5a.25.25 0 0 0-.25.25zM4.25 10a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h5.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25h-5.5z"
                  />
                </svg>
              </div>
              <div className="ml-2 -mt-2">
                <span className="text-[0.6rem] leading-none uppercase tracking-wide text-gray-500 font-medium">
                  English
                </span>
                <p className="text-sm text-gray-800 leading-none">
                  Intermediate
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="">
                <svg className="w-7 h-7 text-gray-600" viewBox="0 0 16 16">
                  <path
                    fill="currentColor"
                    d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752c1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81c-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02c1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877c1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"
                  />
                </svg>
              </div>
              <div className="ml-2 -mt-2">
                <span className="text-[0.6rem] leading-none uppercase tracking-wide text-gray-500 font-medium">
                  Education
                </span>
                <p className="text-sm text-gray-800 leading-none">Graduated</p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="">
                <svg className="w-7 h-7 text-gray-600" viewBox="0 0 16 16">
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964L4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"
                  />
                </svg>
              </div>
              <div className="ml-2 -mt-2">
                <span className="text-[0.6rem] leading-none uppercase tracking-wide text-gray-500 font-medium">
                  Last Active
                </span>
                <p className="text-sm text-gray-800 leading-none">5 Days ago</p>
              </div>
            </div>
          </div>

          <div className="w-full flex items-start justify-center divide-x">
            <div className="w-full pr-5">
              <h4 className="text-xs font-medium uppercase text-gray-500 tracking-wide">
                i can work as
              </h4>

              <div className="mt-3 w-full flex flex-wrap gap-3">
                <Tag name="Visual Assistant" />
                <Tag name="ISA" />
                <Tag name="Book Keeper" />
                <Tag name="Programmer" />
                <Tag name="Admin Support" />
              </div>
            </div>

            <div className="w-full pl-5">
              <h4 className="text-xs font-medium uppercase text-gray-500 tracking-wide">
                my skills
              </h4>

              <div className="mt-3 w-full flex flex-wrap gap-3">
                <Tag name="Administration" />
                <Tag name="Cold Calling" />
                <Tag name="Chat Bot" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuickPreviewModal
        isOpen={showQuickPreviewModal}
        setIsOpen={setShowQuickPreviewModal}
      />
    </>
  );
};

const Tag = ({ name }: { name: string }) => {
  return (
    <div className="text-xs font-medium bg-blue-100 text-blue-600 px-2 py-1 rounded-md flex items-center justify-center gap-2">
      <div className="w-1 h-1 rounded-full bg-blue-600"></div> {name}
    </div>
  );
};

export default EmployeeCard;
