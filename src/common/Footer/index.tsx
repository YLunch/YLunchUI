import { Link } from "react-router-dom"
import LaunchIcon from '@material-ui/icons/Launch';
import { Container, Grid } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import './footer.scss';

export default function Footer(){
return (
    <footer>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Link to='/legal' className="link">Mentions légales</Link>
            <Link to='/sitemap' className="link">Plan du site</Link>
            <a href ="https://github.com/YLunch/YLunchUI" target ="_blank" className="link">©Ylunch 2021-2022<LaunchIcon fontSize="inherit"></LaunchIcon></a>
        </Grid>
    </footer>
)
}
