interface Navigation {
  label: string;
  href: string;
}

const navigations: Navigation[] = [
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

export { navigations };
