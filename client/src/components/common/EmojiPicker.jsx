import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import Picker from "@emoji-mart/react";

const EmojiPicker = (props) => {
    const {icon} = props;
    const [selectedEmoji, setSelectedEmoji] = useState("");

    useEffect(()=> {
        setSelectedEmoji(icon);
    }, [icon]);

  return (
    <Box>
        <Typography variant="h3" fontWeight="700" sx={{cursor: 'pointer'}}>
            {selectedEmoji}
        </Typography>
        <Box sx={{display:'none'}}>
            <Picker />
        </Box>
    </Box>
  )
}

export default EmojiPicker