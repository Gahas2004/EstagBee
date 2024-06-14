import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid
} from "@mui/material";
import {
  Menu as MenuIcon,
  EmojiPeople as EmojiPeopleIcon,
  Public as PublicIcon,
  RocketLaunch as RocketLaunchIcon,
  Search as SearchIcon
} from "@mui/icons-material";
import { yellow } from '@mui/material/colors';

import { SearchInput } from "./styles";

export default function NavBar({ setSearch, search }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [state, setState] = React.useState({
    left: false,
    searchOpen: false,
  });

  const handleReloadPage = () => {
    window.location.href = "/home"; // Altera a localização para a rota inicial
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchToggle = () => {
    setState({ ...state, searchOpen: !state.searchOpen });
  };

  const handleCloseSearch = () => {
    setState({ ...state, searchOpen: false });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[{ text: "Characters", link: "/home" }].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>
                {index === 0 ? <EmojiPeopleIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[{ text: "Planets", link: "/planets" }].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>{index === 0 ? <PublicIcon /> : null}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[{ text: "Starships", link: "/starships" }].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>
                {index === 0 ? <RocketLaunchIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ marginTop: "FitScreen", textAlign: "center", padding: 2 }}>
        <Typography variant="caption" color="textSecondary">
          &copy; {new Date().getFullYear()} Estagbee
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Grid container style={{ marginBottom: '10px', position: isScrolled ? "fixed" : "inherit", zIndex: 1000 }}>
      <Grid item xs={12}>
        <AppBar position="static" sx={{ backgroundColor: "#F6BA04" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="left"
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
            >
              {list("left")}
            </Drawer>

            <Link onClick={handleReloadPage} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: "flex", sm: "flex" }, fontFamily: 'Poppins', fontWeight: "bold" }}
              >
                Estagbee
              </Typography>
            </Link>


            {isMobile ?
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="open search"
                sx={{ ml: 2 }}
                onClick={handleSearchToggle}
                style={{ marginLeft: "auto" }}
              >
                <SearchIcon />
              </IconButton>
              :
              <SearchInput
                icon={<SearchIcon />}
                style={{ marginLeft: "auto" }}
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            }
          </Toolbar>
        </AppBar>
      </Grid>
      {isMobile &&
        <Drawer
          anchor="top"
          open={state.searchOpen}
          onClose={handleCloseSearch}
        >
          <Toolbar>
            <SearchInput
              icon={<SearchIcon />}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Toolbar>
        </Drawer>
      }
    </Grid>
  );
}
