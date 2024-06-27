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
import {Menu as MenuIcon, Search as SearchIcon,} from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { SearchInput } from "./styles";

export default function NavBar({ setSearch, search}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [state, setState] = React.useState({
    left: false,
    searchOpen: false,
  });
  const userType = localStorage.getItem('userType');
  
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

  const handleLogout = () => {
    localStorage.clear(); // Limpa todo o localStorage
    // Redireciona o usuário para o link especificado
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      {userType === "company" && (
        <List>
          {[{ text: "Cadastrar vaga", link: "/create-job" }].map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton component={Link} to={item.link}>
                <ListItemIcon>
                  {index === 0 ? <AddCircleIcon /> : null}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )
      }
      <Divider />
      {userType === "company" ?
        <List>
          {[{ text: "Vagas Ofertadas", link: "/home" }].map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton component={Link} to={item.link}>
                <ListItemIcon>
                  {index === 0 ? <WorkIcon /> : null}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        :
        <List>
          {[{ text: "Vagas disponíveis", link: "/home" }].map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton component={Link} to={item.link}>
                <ListItemIcon>
                  {index === 0 ? <WorkIcon /> : null}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      }
      <Divider />
      {userType === "student" && (
      <List>
        {[{ text: "Criar um currículo", link: "/create-resume" }].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>{index === 0 ? <PersonIcon /> : null}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      )}
      <Divider />
      <List>
        {[{ text: "Sair", link: "/" }].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={item.link} onClick={handleLogout}>
              <ListItemIcon>
                {index === 0 ? <ExitToAppIcon /> : null}
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
    <Grid container style={{ marginBottom: '10px', zIndex: 1000 }}>
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
                {userType === 'student' ? 'Estagbee Student' : 'Estagbee Company'}
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </Grid>
    </Grid>
  );
}
