import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Formule} from "../../models/Formule.model";

export default function FormuleCard( name:Formule, description:Formule, price:Formule ,image:Formule) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="icone ynov"
                height="140"
                src={image}
            />
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between'}}>
                <Typography gutterBottom variant="subtitle2" component="div">
                    {name}
                    <Typography variant="body2">
                        {description}
                    </Typography>
                </Typography>
                <Typography variant="subtitle2" component="p">
                    {price}
                </Typography>
            </CardContent>
            <CardActions sx={{float: 'right' }}>
                <Button variant="contained" size="small" sx={{textTransform:'none'}}> Voir plus</Button>
            </CardActions>
        </Card>
    );
}