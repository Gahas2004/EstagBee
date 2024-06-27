import React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, yellow } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Imagem from '../../assets/images/logo.png'; // Importação correta da imagem
import Shirae from '../../assets/images/shirae.jpeg'; // Importação correta da imagem
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

export default function ResultCard({ name, subtitle, onClick, type, description }) {

  //tratar nome pos esta vindo com aspas
  name = name.replace(/['"]+/g, '');

  return (
    <Grid item xs={12} style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    }}>
      <Card sx={{
        width: '600px',
        maxWidth: '90vw',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={Shirae} />}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={<Typography variant="body2" component="span" sx={{ fontWeight: 'bold', color: yellow[800] }}>
            {name} publicou uma nova vaga!  
          </Typography>}
          subheader={<Typography variant="body2" component="div">{subtitle}</Typography>}
        />
        <CardContent style={{ padding: '0px 16px' }}>
          <Typography variant="body2">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          image={Imagem} // Uso correto da imagem importada
          alt="Imagem"
          sx={{ padding: '35px 0px' }}
        />
        <CardActions disableSpacing sx={{ marginTop: 'auto' }}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>

          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>

          {type === "student" ?
            <div style={{ marginLeft: 'auto' }}>
              <Button variant="contained" sx={{
                backgroundColor: '#F6BA04',
                '&:hover': {
                  backgroundColor: '#e6a503' // cor personalizada para o hover
                }
              }}
                onClick={onClick}
              >Candidatar-se
              </Button>
            </div>
            :
            <div style={{ marginLeft: 'auto' }}>
              <Button variant="contained" sx={{
                backgroundColor: '#F6BA04',
                '&:hover': {
                  backgroundColor: '#e6a503' // cor personalizada para o hover
                }
              }}
                onClick={onClick}
              >Ver sobre a vaga
              </Button>
            </div>
          }
        </CardActions>
      </Card>
    </Grid>
  );
}
