import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import Picker from "@emoji-mart/react";

const EmojiPicker = (props) => {
    const {icon, changeIcon} = props;
    const [selectedEmoji, setSelectedEmoji] = useState("");
    const [showFlg, setShowFlg] = useState(false);

    useEffect(()=> {
        setSelectedEmoji(icon);
    }, [icon]);

    const showHide = () => {
        console.log("クリックされました");
        setShowFlg(!showFlg);
    }

    const chooseEmoji = (e) => {
        // console.log(e.unified);
        const emojiCode = e.unified.split("-");
        let codeArray = [];
        emojiCode.forEach((elm)=> codeArray.push("0x"+ elm) );
        const emoji = String.fromCodePoint(...codeArray);
        // console.log(emoji);
        changeIcon(emoji);
        setShowFlg(false);
    }

  return (
    <Box >
        <Typography variant="h3" fontWeight="700" sx={{cursor: 'pointer'}} onClick={showHide}>
            {selectedEmoji}
        </Typography>
        <Box sx={{display: showFlg ? "displya" : 'none', position: 'absolute', zIndex: 100}} >
            <Picker onEmojiSelect={chooseEmoji}/>
        </Box>
    </Box>
  )
}

export default EmojiPicker