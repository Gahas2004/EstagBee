import React from 'react';
import { styled } from '@mui/material/styles';
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

export default function ResultCard({ name, gender, height }) {
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
          subheader={<Typography variant="body2" component="div">Estágio em sistemas embarcados (Remoto)</Typography>}
        />
        <CardContent style={{ padding: '0px 16px' }}>
          <Typography variant="body2">
            A Microsoft está em busca de um estagiário dinâmico e comprometido para se juntar à equipe.
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
          <div style={{ marginLeft: 'auto' }}>
            <Button variant="contained" sx={{
              backgroundColor: '#F6BA04',
              '&:hover': {
                backgroundColor: '#e6a503' // cor personalizada para o hover
              }
            }}>Candidatar-se</Button>
          </div>
        </CardActions>
      </Card>
    </Grid>
  );
}
