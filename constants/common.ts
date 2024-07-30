interface Navigation {
  label: string;
  href: string;
}

interface CheckIn {
  day: number;
  amount: number;
  className?: string;
}

export const CHECK_IN_ADDRESS = "0xC19c451acEBD8761329F3f8BAFCd6B3f1fd304fb";
export const SHODAQO_ADDRESS = "0xe13DFf45ee9bB1A02Ae15632e4FF971819954b86";

const navigations: Navigation[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Check In",
    href: "/check-in",
  },
  {
    label: "Loyalty Program",
    href: "/loyalty-program",
  },
  {
    label: "Account",
    href: "/account",
  },
];

const userColors = {
  primary: "#86EE60",
  secondary: "#2E6E65",
  tertiary: "#F4F7ED",
  shadow: "#2B3752",
};

const checkInLists: CheckIn[] = [
  {
    amount: 1.25,
    day: 1,
  },
  {
    amount: 1.5,
    day: 2,
  },
  {
    amount: 2,
    day: 3,
  },
  {
    amount: 3,
    day: 4,
  },
  {
    amount: 5,
    day: 5,
  },
  {
    amount: 7,
    day: 6,
  },
  {
    amount: 10,
    day: 7,
    className: "col-span-3",
  },
];

export { navigations, userColors, checkInLists };
