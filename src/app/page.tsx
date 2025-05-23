import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

const rows = 15;
const columns = 10;

export default async function HomePage() {
  const rooms = await prisma.room.findMany();

  return (
    <>
      <h2 className="text-2xl lg:text-3xl text-center mt-16">Booking System</h2>

      <p className="text-base lg:text-lg text-center mt-1 text-gray-500">
        Velg et rom
      </p>

      <div className="flex justify-center gap-5 w-[700px] mx-auto mt-5 max-w-[85%]">
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm lg:text-base">Ledig</p>

          <div className="bg-green-400 h-[35px] w-[35px] rounded-lg shadow-md flex items-center justify-center" />
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-sm lg:text-base">Opptatt</p>

          <div className="bg-red-400 h-[35px] w-[35px] rounded-lg shadow-md flex items-center justify-center" />
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-sm lg:text-base">Inngang</p>

          <div className="bg-slate-400 h-[35px] w-[35px] rounded-lg shadow-md flex items-center justify-center">
            <Image
              src="/images/entrance.png"
              alt="entrance"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 w-[700px] mx-auto mt-5 mb-10 max-w-[85%]">
        {Array.from({ length: columns }, (_, i) => (
          <div key={i} className="flex gap-3 max-w-full">
            {Array.from({ length: rows }, (_, z) => {
              if ((z == 0 || z == 14) && i == 2) {
                return (
                  <div
                    key={z}
                    className="bg-slate-400 h-[50px] w-[50px] rounded-lg shadow-md flex items-center justify-center"
                  >
                    <Image
                      src="/images/entrance.png"
                      alt="entrance"
                      width={100}
                      height={100}
                    />
                  </div>
                );
              }

              const roomFound = rooms.find(
                (room) => room.positionX == z + 1 && room.positionY == i + 1
              );

              if (roomFound) {
                return (
                  <Link
                    href={`/rooms/${roomFound.id}`}
                    key={z}
                    className="bg-green-400 h-[40px] w-[40px] flex items-center justify-center text-base lg:text-lg rounded-lg shadow-md"
                  >
                    {roomFound.name}
                  </Link>
                );
              } else {
                return (
                  <div
                    key={z}
                    className="bg-white h-[40px] w-[40px] rounded-lg shadow-md"
                  ></div>
                );
              }
            })}
          </div>
        ))}
      </div>
    </>
  );
}
