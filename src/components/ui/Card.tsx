function Card({
  title,
  description,
  imageSRC,
  link,
}: {
  title: string;
  description: string;
  imageSRC: string;
  link: string;
}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-700">{description}</p>
      <img
        src={imageSRC}
        alt="rom bilde"
        className="w-full h-32 object-cover rounded-t-lg"
      ></img>

      <link href={link}>
        <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
          book now
        </button>
      </link>
    </div>
  );
}
export default Card;
// This is a simple card component that takes in a title, description, image source, and a link.
