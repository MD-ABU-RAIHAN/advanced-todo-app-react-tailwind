import { ImArrowDownRight2 } from "react-icons/im";

const Hero = () => {
  return (
    <div className="text-white overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
      <div className="absolute bg-[url('/todo-hero-bg.jpg')] inset-0 bg-no-repeat bg-center bg-cover  opacity-20"></div>
      <div className="relative container px-4 py-16 mx-auto">
        <div className="text-center ">
          <h1 className="text-6xl font-bold tracking-wide">Task Master</h1>
          <p className="py-6 text-lg font-semibold tracking-wide">
            Master your productivity with intelligent task management
          </p>
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={() => {
                window.scrollTo({ top: 330, behavior: "smooth" });
              }}
              className="bg-slate-800 px-8 py-4 text-lg font-semibold rounded-xl flex flex-row justify-start items-center gap-3 hover:bg-opacity-80 duration-300 shadow"
            >
              <span>Create Your Task </span>
              <ImArrowDownRight2 className="hover:scale-150" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
