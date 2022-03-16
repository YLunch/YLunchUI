import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import imageCard from "./contemplative-reptile.jpg";

export default function FormuleCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="icone ynov"
                height="140"
                src={imageCard}
            />
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between'}}>
                <Typography gutterBottom variant="subtitle2" component="div">
                    Formule Kuisine
                    <Typography variant="body2">
                        Plat chaud + Boisson + Dessert
                    </Typography>
                </Typography>
                <Typography variant="subtitle2" component="p">
                    12.90€
                </Typography>
            </CardContent>
            <CardActions sx={{float: 'right' }}>
                <Button variant="contained" size="small" sx={{textTransform:'none'}}> Voir plus</Button>
            </CardActions>
        </Card>
    );
}