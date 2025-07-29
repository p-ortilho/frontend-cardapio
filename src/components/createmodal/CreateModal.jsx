import { useEffect, useState } from "react";
import { useFoodDateMutate } from "../../hooks/useFoodDateMutate";
import { IoMdCloseCircle } from "react-icons/io";

const Inputs = ({ label, value, updateValue }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700 capitalize">
        {label}
      </label>
      <input
        type={label === "price" ? "number" : "text"}
        onChange={(e) => updateValue(e.target.value)}
        value={value}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        placeholder={`Digite ${label === "title" ? "o título" : label === "price" ? "o preço" : "a URL da imagem"}`}
      />
    </div>
  );
};

const CreateModal = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const mutation = useFoodDateMutate();

  const submit = () => {
    const data = {
      title,
      price: parseInt(price),
      image,
    };

    mutation.mutate(data);
  };

  useEffect(() => {
    if (!mutation.isSuccess) return;
    closeModal();
  }, [mutation.isSuccess]);

  // Bloquear scroll quando modal estiver aberto
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-transparent flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-auto transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Novo Item</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors duration-200"
          >
            <IoMdCloseCircle className="text-blue-500 cursor-pointer" />
          </button>
        </div>

        <form className="space-y-6">
          <Inputs label="title" value={title} updateValue={setTitle} />
          <Inputs label="price" value={price} updateValue={setPrice} />
          <Inputs label="image" value={image} updateValue={setImage} />
        </form>

        <div className="flex gap-3 mt-8">
          <button
            onClick={closeModal}
            className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={submit}
            className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl cursor-pointer"
          >
            {mutation.isLoading ? "Adicionando..." : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
