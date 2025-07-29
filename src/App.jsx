import "tailwindcss";
import { useFoodDate } from "./hooks/useFoodDate";
import Card from "./components/card/Card";
import { useState } from "react";
import CreateModal from "./components/createmodal/CreateModal";
import { FaPlus } from "react-icons/fa6";

function App() {
  const { data } = useFoodDate();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen w-full py-8 px-4">
      <div className="flex flex-col items-center gap-8 max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800">Cardápio</h1>

        <div className="card-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {data.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>

        <button
          onClick={handleOpenModal}
          className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl cursor-pointer"
        >
          <FaPlus size={20} className="mr-2" />
          <span>Novo Item</span>
        </button>
      </div>

      {isModalOpen && <CreateModal closeModal={() => setModalOpen(false)} />}
    </div>
  );
}

export default App;