import React, { useState } from 'react';


import { Paper, Fade, Modal, Grid, IconButton, Button, Box } from '@mui/material';
import { Typography } from '@mui/material';

/**
 * @param {boolean} open
 * @param {string} titulo
 * @param {React.ReactNode} icon
 * @param {React.ReactNode} button
 * @param {React.ReactNode} content
 * 
 * @param {() => void} onOpen
 * @param {() => void} onClose
 * 
 * @param {object} buttonProps
 * @param {object} BackdropProps
 * 
 * @param {object} modalStyle
 * @param {object} wrapperStyle
 * @param {object} contentStyle
 * 
 * @returns {React.ReactElement}
 * @description
 * Componente de Modal com transição de abertura e fechamento
  */
const TransitionsModal = ({
    icon = null,
    open = false,
    button = null,
    content = null,
    titulo = 'Modal',
    header = null,

    /* events */
    onOpen = () => { },
    onClose = () => { },

    /* props */
    buttonProps = {},
    BackdropProps = { timeout: 500 },

    /* style */
    modalStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    wrapperStyle = { maxWidth: '1024px', minWidth: '300px', maxHeight: '90vh' },
    contentStyle = { padding: '24px 16px' },
}) => {
    if (!content) throw new Error('Content is required');
    if (button && icon) console.warn('Icon will be ignored');
    if (button && typeof button !== 'function') throw new Error('Button must be a function');
    if (content && typeof content !== 'function') throw new Error('Content must be a function');

    const [_open, setOpen] = useState(open);

    const handleOpen = () => {
        onOpen();
        setOpen(true);
    };

    const handleClose = () => {
        onClose();
        setOpen(false);
    };

    if (!button && icon) button = ({ onClick }) => (
        <IconButton
            size="small"
            color="default"
            onClick={onClick}
            title={titulo}
            {...buttonProps}
        >
            {icon}
        </IconButton>
    )

    if (!button) button = ({ onClick }) => (
        <Button
            title={titulo}
            size="small"
            variant="contained"
            color="primary"
            className="mb-3"
            onClick={onClick}
            style={{ backgroundColor: '#F6BA04' }}
            {...buttonProps}
        >
            {titulo}
        </Button>
    )

    if (!header) header = ({ handleClose, titulo }) => (
        <Grid container justifyContent="space-between" alignItems="center" style={{ padding: '0.5rem', backgroundColor: '#F6BA04' }}>
            <Typography color="white" size="16px" className='m-0'><b>{titulo}</b></Typography>
            <IconButton style={{ fontSize: '1rem', padding: '0.25rem', color: 'white' }} onClick={handleClose}>
                
            </IconButton>
        </Grid>
    )

    if (!content) content = () => (
        <Typography>Conteúdo do Modal</Typography>
    )

    return (
        <>
            {button({ onClick: handleOpen })}
            <Modal
                open={_open}
                style={modalStyle}
                onClose={handleClose}
                Backdrop={BackdropProps}
                closeAfterTransition={true}
            >
                <Fade in={_open}>
                    <Paper elevation={2} style={wrapperStyle}>
                        {header({ handleClose, titulo })}
                        <Box style={contentStyle}>
                            {content({ handleClose })}
                        </Box>
                    </Paper>
                </Fade>
            </Modal>
        </>
    );
}

export default TransitionsModal;