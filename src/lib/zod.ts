import { z } from "zod";

export const BookRoomSchema = z
  .object({
    roomId: z.string().min(1, { message: "Rom ID er påkrevd." }),
    fromDate: z.date({ message: "Fra tidspunkt er påkrevd." }),
    toDate: z.date({ message: "Til tidspunkt er påkrevd." }),
  })
  .refine((data) => new Date(data.fromDate).getTime() < new Date().getTime(), {
    message: "Fra tidspunkt må være i fremtiden.",
  })
  .refine(
    (data) =>
      new Date(data.fromDate).getTime() >= new Date(data.toDate).getTime(),
    {
      message: "Til tidspunkt må være etter fra tidspunkt.",
    }
  );
