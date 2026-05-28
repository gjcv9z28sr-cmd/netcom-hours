const CONFIG = {

  companyName: "NETCOM",

  employee: "Paweł Cichocki",

  manager: "Hubert Bielacki",

  foreman: "Paweł Cichocki",

  defaultSite: "Warszawa",

  vacationDays: 26,

  colors: {

    primary: "#111827",

    background: "#f3f4f6",

    work: "#dbeafe",

    vacation: "#fef9c3",

    sick: "#fecaca",

    delegation: "#bbf7d0"
  },

  excel: {

    headerBlue: "0C73B8",

    kwBlue: "173FAF",

    lightBlue: "D9E7FF",

    whiteRow: "F4F4F4",

    border: "1D2A57"
  }
};

document.documentElement.style.setProperty(
  "--primary",
  CONFIG.colors.primary
);

document.documentElement.style.setProperty(
  "--background",
  CONFIG.colors.background
);