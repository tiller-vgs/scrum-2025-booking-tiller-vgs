"use client";

import { bookRoomServer } from "@/lib/actions";
import { isBooked } from "@/lib/functions";
import { BookRoomSchema } from "@/lib/zod";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function RoomClient(props: {
  room: {
    id: string;
    name: string;
    description: string | null;
    nickname: string | null;
    image: string | null;
    bookings: { fromDate: Date; toDate: Date }[];
  };
}) {
  const [bookingFrom, setBookingFrom] = useState<Date>(new Date());
  const [bookingTo, setBookingTo] = useState<Date>(new Date());
  const [booked, setBooked] = useState<boolean>(
    isBooked(props.room.bookings, bookingFrom, bookingTo)
  );
  const [statuses, setStatuses] = useState<{
    loading: boolean;
    message: string;
  }>({
    loading: false,
    message: "",
  });

  useEffect(() => {
    setBooked(isBooked(props.room.bookings, bookingFrom, bookingTo));
  }, [bookingFrom, bookingTo]);

  async function bookRoomClient() {
    if (booked) {
      return setStatuses(
        (prev) =>
          (prev = {
            ...prev,
            message: "Rommet er allerede booket i dette tidsrommet.",
          })
      );
    }

    const parsed = BookRoomSchema.safeParse({
      roomId: props.room.id,
      bookingFrom,
      bookingTo,
    });

    // if (!parsed.success) {
    //   return setStatuses(
    //     (prev) => (prev = { ...prev, message: parsed.error.errors[0].message })
    //   );
    // }

    setStatuses((prev) => (prev = { ...prev, loading: true, message: "" }));

    await bookRoomServer(props.room.id, bookingFrom, bookingTo).then((res) => {
      if (res.err) {
        setStatuses((prev) => (prev = { ...prev, message: res.err! }));
      } else {
        setStatuses((prev) => (prev = { ...prev, message: "" }));
        toast.success(res.suc ?? "Suksess!");
      }
    });

    setStatuses((prev) => (prev = { ...prev, loading: false }));
  }

  return (
    <div className="w-[500px] max-w-[85%] mx-auto mt-16 bg-white rounded-lg shadow-md p-3">
      <h2 className="text-lg lg:text-xl">{props.room.name}</h2>

      <div className="flex gap-5 mt-3">
        <div className="flex flex-col gap-1">
          <p className="text-sm lg:text-base font-bold">Fra</p>

          <input
            className="text-sm lg:text-base outline-none"
            value={bookingFrom.toISOString().slice(0, 16)}
            type="datetime-local"
            onChange={(e) => setBookingFrom(new Date(e.target.value))}
            min={new Date().toISOString().slice(0, 16)}
          />
        </div>

        <div className="bg-black w-[2px] rounded-lg" />

        <div className="flex flex-col gap-1">
          <p className="text-sm lg:text-base font-bold">Til</p>

          <input
            className="text-sm lg:text-base outline-none"
            value={bookingTo.toISOString().slice(0, 16)}
            type="datetime-local"
            onChange={(e) => setBookingTo(new Date(e.target.value))}
            min={bookingFrom.toISOString().slice(0, 16)}
          />
        </div>
      </div>

      {!booked && (
        <button
          onClick={async () => await bookRoomClient()}
          className="text-base lg:text-lg bg-emerald-400 rounded-lg px-3 py-2 mt-3 w-full cursor-pointer"
        >
          Book til valgt tidspunkt
        </button>
      )}

      {booked && (
        <p className="text-sm lg:text-base bg-red-400 rounded-lg px-3 py-2 mt-3 w-full">
          Ikke ledig til valgt tidspunkt
        </p>
      )}

      {statuses.message && (
        <p className="text-sm lg:text-base text-red-400 mt-3">
          {statuses.message}
        </p>
      )}

      {statuses.loading && (
        <p className="text-sm lg:text-base text-gray-500 mt-3">Laster . . .</p>
      )}
    </div>
  );
}
