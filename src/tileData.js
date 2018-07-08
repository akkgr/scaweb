import React from "react";
import { NavLink } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BusinessIcon from "@material-ui/icons/Business";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CloudIcon from "@material-ui/icons/Cloud";
import FolderIcon from "@material-ui/icons/Folder";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ViewListIcon from "@material-ui/icons/ViewList";
import ListIcon from "@material-ui/icons/List";

export const nodeFolderListItems = (
  <div>
    <ListItem button component={NavLink} to="/companies">
      <ListItemIcon>
        <BusinessIcon />
      </ListItemIcon>
      <ListItemText primary="Εταιρία" />
    </ListItem>
    <ListItem button component={NavLink} to="/services">
      <ListItemIcon>
        <CloudIcon />
      </ListItemIcon>
      <ListItemText primary="Υπηρεσία" />
    </ListItem>
    <ListItem button component={NavLink} to="/programs">
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>
      <ListItemText primary="Πρόγραμμα" />
    </ListItem>
    <ListItem button component={NavLink} to="/areas">
      <ListItemIcon>
        <LocationOnIcon />
      </ListItemIcon>
      <ListItemText primary="Περιοχή" />
    </ListItem>
    <ListItem button component={NavLink} to="/actions">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Δράση" />
    </ListItem>
  </div>
);

export const menuFolderListItems = (
  <div>
    <ListItem button component={NavLink} to="/menu">
      <ListItemIcon>
        <ViewListIcon />
      </ListItemIcon>
      <ListItemText primary="Menu" />
    </ListItem>
    <ListItem button component={NavLink} to="/submenu">
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Υπό Menu" />
    </ListItem>
  </div>
);
