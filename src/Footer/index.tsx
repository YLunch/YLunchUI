import classes from "./styles.module.scss";
import { Link } from "react-router-dom"
import LaunchIcon from '@material-ui/icons/Launch';
import { Grid } from "@material-ui/core";

export default function Footer(){
return (
    <footer className={classes.wrapper}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Link to='/legal' className={classes.link}>Mentions légales</Link>
            <Link to='/sitemap' className={classes.link}>Plan du site</Link>
            <a href ="https://github.com/YLunch/YLunchUI" target ="_blank" className={classes.link}>©Ylunch 2021-2022<LaunchIcon fontSize="inherit"></LaunchIcon></a>
        </Grid>
    </footer>
)
}