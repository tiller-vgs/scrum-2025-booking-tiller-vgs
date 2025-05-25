export function isBooked(
  bookings: { fromDate: Date; toDate: Date }[],
  fromDate: Date = new Date(),
  toDate: Date = new Date()
): boolean {
  return bookings.some(
    (booking) => fromDate <= booking.toDate && toDate >= booking.fromDate
  );
}
