const Card = ({ title, image, price }) => {
  return (
    <div className="card flex flex-col items-center justify-center w-3xs rounded-lg shadow-xl p-0">
      <img src={image} alt={title} className="w-full h-full rounded-lg" />
      <h2>{title}</h2>
      <p>
        Valor: <b>{price}</b>
      </p>
    </div>
  );
};

export default Card;