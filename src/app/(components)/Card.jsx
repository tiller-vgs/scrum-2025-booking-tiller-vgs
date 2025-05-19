function Card({ title, number, description, imageSRC, link }) {
  return (
    <a href={link}>
      <div className=" max-w-175 bg-white rounded-lg p-4 border-3 border-green-700 hover:outline-3 hover:outline-offset-2 hover:outline-green-500 hover:bg-white/70 active:bg-white/90 focus:outline-3 focus:outline-offset-3">
        <h2 className="text-xl font-bold text-black">{title}</h2>
        <p className="text-gray-500">{number}</p>
        <p className="text-gray-700">{description}</p>
        <img
          src={imageSRC}
          alt="rom bilde"
          className="w-full h-80 object-cover rounded-t-lg border-2 border-black cennter"
        ></img>
      </div>
    </a>
  );
}
export default Card;
