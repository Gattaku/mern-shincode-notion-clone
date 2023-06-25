import React, { useEffect, useState } from 'react';
import {Box} from "@mui/system";
import { IconButton, TextField } from '@mui/material';
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteoutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate, useParams } from 'react-router-dom';
import memoApi from '../../api/memoApi';
import { useDispatch, useSelector } from 'react-redux';
import { setMemo } from '../../redux/features/memoSlice';
import EmojiPicker from '../common/EmojiPicker';


const Memo = () => {
  const {memoId} =useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const memos = useSelector((state)=> state.memo.value)



  useEffect(()=> {
    const getMemo = async()=> {
      try {
        const res = await memoApi.getOne(memoId);
        setTitle(res.title);
        setDescription(res.description);
        setIcon(res.icon);
      } catch (err) {
        alert(err);
      }
    };
    getMemo();
  },[memoId])

  let timer;
  const timeout = 500;

  const updateTitle = async(e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    timer = setTimeout(async()=>{
      try {
        await memoApi.update(memoId,{title: newTitle,});
        const newMemos = await memoApi.getAll();
        dispatch(setMemo(newMemos));
      } catch (err) {
        alert(err);
      }
    },timeout);
  }

  const updateDescription = async(e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async()=>{
      try {
        await memoApi.update(memoId,{description: newDescription,})
      } catch (err) {
        alert(err);
      }
    },timeout);
  }

  const deleteItem = async()=> {
    try {
      const deleteMemo = await memoApi.delete(memoId);
      console.log(deleteMemo);

      const newMemos = memos.filter((memo)=> memo._id !== memoId);
      // const newMemos = await memoApi.getAll();
      console.log(newMemos);
      if(newMemos.length === 0) {
        navigate("/memo");
      } else {
        const firstPath = newMemos[0]._id;
        navigate(`/memo/${firstPath}`);
      }
      dispatch(setMemo(newMemos));


    } catch (err) {
      alert(err);
    }
  }

  return (
    <>
      <Box 
        sx={{
          display: "flex",
          alignItems:"center",
          width: "100%",
        }}
      > 
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton variant="outlined" color="error" onClick={deleteItem}>
          <DeleteoutlinedIcon/>
        </IconButton>
      </Box>
      <Box sx={{padding: "10px 50px"}}>
        <Box>
          <EmojiPicker icon={icon} />
          <TextField
            onChange={updateTitle}
            value={title} 
            placeholder='無題' 
            variant='outlined' 
            fullWidth 
            sx={{
              ".MuiOutlinedInput-input": {padding: 0},
              ".MuiOutlinedInput-notchedOutline" : {border: 'none'},
              ".MuiOutlinedInput-root": {fontSize: "2rem", fontWeight:700 }
            }}
          />
          <TextField
            onChange={updateDescription}
            value={description} 
            placeholder='追加' 
            variant='outlined' 
            fullWidth 
            sx={{
              ".MuiOutlinedInput-input": {padding: 0},
              ".MuiOutlinedInput-notchedOutline" : {border: 'none'},
              ".MuiOutlinedInput-root": {fontSize: "1rem"}
            }}
          />
        </Box>
      </Box>
    </>
  )
}

export default Memo