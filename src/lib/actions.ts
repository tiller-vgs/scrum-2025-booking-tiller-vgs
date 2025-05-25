"use server";

import { auth } from "./auth";
import { isBooked } from "./functions";
import { prisma } from "./prisma";
import { TServerActionResponse } from "./types";
import { BookRoomSchema } from "./zod";

export async function bookRoomServer(
  roomId: string,
  fromDate: Date,
  toDate: Date
): Promise<TServerActionResponse> {
  const session = await auth();

  if (!session) {
    return { err: "Du må være innlogget for å booke rom." };
  }

  const parsed = BookRoomSchema.safeParse({ roomId, fromDate, toDate });

  //   if (!parsed.success) {
  //     return { err: parsed.error.errors[0].message };
  //   }

  const roomFound = await prisma.room.findUnique({
    where: { id: roomId },
    include: { bookings: { select: { fromDate: true, toDate: true } } },
  });

  if (!roomFound) {
    return { err: "Rommet ble ikke funnet." };
  }

  const booked = isBooked(roomFound.bookings, fromDate, toDate);

  if (booked) {
    return { err: "Rommet er allerede booket i dette tidsrommet." };
  }

  await prisma.roomBooking.create({
    data: {
      userId: session.user!.id!,
      roomId: roomId,
      fromDate: fromDate,
      toDate: toDate,
    },
  });

  return { suc: "Rommet ble booket!" };
}
