import { create } from "zustand";

type BookingState = {
  open: boolean;
  target: string;
  time: string;
  openBooking: (target?: string, time?: string) => void;
  closeBooking: () => void;
};

export const useBooking = create<BookingState>((set) => ({
  open: false,
  target: "",
  time: "",
  openBooking: (target = "", time = "") => set({ open: true, target, time }),
  closeBooking: () => set({ open: false }),
}));
