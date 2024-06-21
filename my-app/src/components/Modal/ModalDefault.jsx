import React from "react";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Modal,
  Typography,
  Button,
  Stack,
} from "@mui/material";

export function ModalDefault({ selectedCharacter, setSelectedCharacter, handleGoToStarships, handleGoToHomeWorld, open, onClose}) {
    return (
        <Modal
        open={open}
        onClose={onClose}
      >
        <Card
          sx={{
            maxWidth: "70vw",
            margin: "auto",
            marginTop: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px 0px #000000",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardContent>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography gutterBottom variant="h2" component="div">
                {selectedCharacter.name}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Birth Year: {selectedCharacter.birth_year}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Created: {selectedCharacter.created}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Edited {selectedCharacter.edited}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Eye Color: {selectedCharacter.eye_color}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Height: {selectedCharacter.height}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gender: {selectedCharacter.gender}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hair Collor: {selectedCharacter.hair_color}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Mass: {selectedCharacter.mass}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Skin Color: {selectedCharacter.skin_color}
            </Typography>
            {selectedCharacter.starships.length > 0 ? (
              <Typography variant="body2" color="text.secondary">
                Total of starships: {selectedCharacter.starships.length}
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No starships available...
              </Typography>
            )}
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {selectedCharacter.starships.length > 0 &&
                selectedCharacter.starships.map((starship, index) => (
                  <>
                    <Button onClick={() => handleGoToStarships(starship)}>
                      Access {index + 1}º Starship
                    </Button>
                  </>
                ))}
            </Box>
          </CardContent>
          <CardActions
            onClick={() => handleGoToHomeWorld(selectedCharacter.homeworld)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack direction="row" spacing={2}>
              <Button variant="contained">Go to Homeworld</Button>
            </Stack>
          </CardActions>
        </Card>
      </Modal>
    );
}

export default ModalDefault;