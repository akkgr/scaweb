import React from "react";

export const defaultNodes = [
  { id: 2, title: "Εταιρία" },
  { id: 0, title: "Υπηρεσία" },
  { id: 0, title: "Πρόγραμμα" },
  { id: 0, title: "Περιοχή" },
  { id: 0, title: "Δράση" },
  { id: 0, title: "Menu" },
  { id: 0, title: "SubMenu" }
];

export const AppContext = React.createContext({
  user: {},
  selectNode: (e, id, title) => {}
});
