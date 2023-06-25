import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import React, { useState } from 'react'
import memoApi from '../../api/memoApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setMemo } from '../../redux/features/memoSlice'

const Home = () => {
  const navigate= useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] =useState(false);
  const memos = useSelector((state)=> state.memo.value);

  const createMemo = async()=> {
    try {
      setLoading(true);
      const res = await memoApi.create();
      // console.log(res);
      // const newMemos = await memoApi.getAll();
      const newMemos = [res, ...memos];
      dispatch(setMemo(newMemos));

      navigate(`/memo/${newMemos[0]._id}`)
      // navigate(`memo/${res._id}`)
    } catch(err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box 
      sx={{
        height: "100%",
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center'
    }}
    >
      <LoadingButton 
        variant='outlined'
        onClick={()=> createMemo()}
        loading={loading}
      >
       最初のメモを作成 
      </LoadingButton>
    </Box>
  )
}

export default Home