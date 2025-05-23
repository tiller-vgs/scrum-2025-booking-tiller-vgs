import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { isValidObjectId } from "mongoose";
import RoomClient from "./roomClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const params_ = await params;

  if (!isValidObjectId(params_.id)) {
    return {};
  }

  const roomFound = await prisma.room.findUnique({
    where: { id: params_.id },
    select: { name: true, description: true },
  });

  if (!roomFound) {
    return {};
  }

  return {
    title: roomFound.name,
    description: roomFound.description,
  };
}

export default async function RoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const params_ = await params;

  if (!isValidObjectId(params_.id)) {
    return redirect("/");
  }

  const roomFound = await prisma.room.findUnique({
    where: { id: params_.id },
    include: { bookings: { select: { fromDate: true, toDate: true } } },
  });

  if (!roomFound) {
    return redirect("/");
  }

  return (
    <RoomClient
      room={{
        id: roomFound.id,
        name: roomFound.name,
        description: roomFound.description,
        nickname: roomFound.nickname,
        image: roomFound.image,
        bookings: roomFound.bookings,
      }}
    />
  );
}
