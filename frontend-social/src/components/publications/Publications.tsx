import { Grid } from "@mui/material";
import { Publications as Ps} from "../../interfaces/publication";
import { Publication } from "./Publication";



export const Publications: React.FC<Ps> = ({ publications }) => {
    return (
      <Grid container spacing={2} direction="column" alignItems="stretch">
        {publications.map((publication) => (
          <Grid item key={publication.id}>
            <Publication {...publication} />
          </Grid>
        ))}
      </Grid>
    );
  };