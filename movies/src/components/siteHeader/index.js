import React, {useContext, useEffect, useState} from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {useNavigate} from "react-router-dom";
import {styled} from '@mui/material/styles';
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {MoviesContext} from "../../contexts/moviesContext";
import Avatar from '@mui/material/Avatar';

const Offset = styled('div')(({theme}) => theme.mixins.toolbar);

const SiteHeader = ({history}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [movieListAnchorEl, setMovieListAnchorEl] = useState(null);
    const [personalMenuAnchorEl, setPersonalMenuAnchorEl] = useState(null);
    const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const navigate = useNavigate();
    const {isLogin, email, logout} = useContext(MoviesContext);

    const menuOptions = [
        {label: "Home", path: "/"},
        {label: "ActorHome", path: "/actors"},

    ];
    const moviesOreder = [
        {label: "Popular", path: "/movies/popular"},
        {label: "TopRated", path: "/movies/topRated"},
        {label: "Upcoming", path: "/movies/upcoming"},
        {label: "Trending", path: "/movies/trending"},
    ]
    const personalMenu = [
        {label: "Favorites", path: "/movies/favorites"},
        {label: "Playlist", path: "/movies/playlist"},
        {label: "Follows", path: "/actors/follows"},
    ]
    const handleMenuSelect = (pageURL) => {
        navigate(pageURL, {replace: true});
    };
    const login = () => {
        navigate("/login", {replace: true});
    }
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMovieListClick = (event) => {
        setMovieListAnchorEl(event.currentTarget);
    };

    const handlePersonalMenuClick = (event) => {
        setPersonalMenuAnchorEl(event.currentTarget);
    };
    const handleUserMenuClick = (event) => {
        setUserMenuAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setMovieListAnchorEl(null);
        setPersonalMenuAnchorEl(null);
        setUserMenuAnchorEl(null);
    };
    return (
        <>
            <AppBar position="fixed" color="secondary">
                <Toolbar>
                    <Typography variant="h4" sx={{flexGrow: 1}}>
                        TMDB Client
                    </Typography>
                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        All you ever wanted to know about Movies!
                    </Typography>
                    {isMobile ? (
                        <>
                            <IconButton
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            {isLogin ?
                                <IconButton>
                                    <Avatar onClick={() => {
                                        logout()
                                    }}>  {email[0].toUpperCase()}</Avatar>
                                </IconButton>
                                :
                                <Button
                                    id="loginButton"
                                    onClick={() => login()}
                                    color="inherit">
                                    Login
                                </Button>
                            }


                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                {menuOptions.map((opt) => (
                                    <MenuItem
                                        key={opt.label}
                                        onClick={() => handleMenuSelect(opt.path)}
                                    >
                                        {opt.label}
                                    </MenuItem>
                                ))}
                                {moviesOreder.map((opt) => (
                                    <MenuItem
                                        key={opt.label}
                                        color="inherit"
                                        onClick={() => handleMenuSelect(opt.path)}
                                    >
                                        {opt.label}
                                    </MenuItem>
                                ))}
                                {personalMenu.map((opt) => (
                                    <MenuItem
                                        key={opt.label}
                                        color="inherit"
                                        onClick={() => handleMenuSelect(opt.path)}
                                    >
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    ) : (
                        <>
                            {menuOptions.map((opt) => (
                                <MenuItem
                                    key={opt.label}
                                    color="inherit"
                                    onClick={() => handleMenuSelect(opt.path)}
                                >
                                    {opt.label}
                                </MenuItem>
                            ))}
                            <Button
                                id="movieList-button"
                                onClick={handleMovieListClick}
                                color="inherit"
                            >
                                MoviesLists
                            </Button>
                            <Menu
                                id="movieList-menu"
                                anchorEl={movieListAnchorEl}
                                open={Boolean(movieListAnchorEl)}
                                onClose={handleClose}
                            >
                                {moviesOreder.map((opt) => (
                                    <MenuItem
                                        key={opt.label}
                                        color="inherit"
                                        onClick={() => handleMenuSelect(opt.path)}
                                    >
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                            <Button
                                id="personalMenu-button"
                                onClick={handlePersonalMenuClick}
                                color="inherit"
                            >
                                personal
                            </Button>
                            <Menu
                                id="personalMenu-menu"
                                anchorEl={personalMenuAnchorEl}
                                open={Boolean(personalMenuAnchorEl)}
                                onClose={handleClose}
                            >
                                {personalMenu.map((opt) => (
                                    <MenuItem
                                        key={opt.label}
                                        color="inherit"
                                        onClick={() => handleMenuSelect(opt.path)}
                                    >
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                            {isLogin ? <><IconButton onClick={handleUserMenuClick}>
                                    <Avatar>
                                        {email[0].toUpperCase()}
                                    </Avatar></IconButton>
                                    <Menu id="UserMenu"
                                          anchorEl={userMenuAnchorEl}
                                          open={Boolean(userMenuAnchorEl)}
                                          onClose={handleClose}>
                                        <MenuItem onClick={() => logout()}>
                                            Log out
                                        </MenuItem>
                                    </Menu></>
                                : <><Button
                                    id="loginButton"
                                    onClick={() => login()}
                                    color="inherit">
                                    Login
                                </Button></>}
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Offset/>
        </>
    )
        ;
};

export default SiteHeader;