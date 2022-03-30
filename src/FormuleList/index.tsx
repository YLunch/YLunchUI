import FormuleCard from "./FormuleCard";
import Typography from "@mui/material/Typography";
import {Formule} from "../models/Formule.model";


export default function FormuleList(data:Formule[]){
    return (
      <Typography component='div'>
          {data.map((formule:Formule) => {
              return (
                  <FormuleCard
                      key= {formule.id}
                      />
              )})
          })
      </Typography>

    )}