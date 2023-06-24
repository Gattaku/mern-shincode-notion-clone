import { Box, Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import LogoutOutlinedIcon from "@mui/icons-material/LoginOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import assets from '../../assets';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {useSelector} from "react-redux";
import memoApi from '../../api/memoApi';
import { useDispatch } from 'react-redux';
import { setMemo } from '../../redux/features/memoSlice';

const Sidebar = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {memoId} = useParams();
    const user = useSelector((state)=> state.user.value)
    const memos = useSelector((state)=> state.memo.value)

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    useEffect(()=>{
        const getMemos = async()=> {
            try {
                const res = await memoApi.getAll();
                dispatch(setMemo(res));
            } catch (err) {
                alert(err);
            }
        };
        getMemos();
    },[dispatch]);

    useEffect(()=>{
        const checkActiveIndex = memos.findIndex((e)=> e._id === memoId);
        setActiveIndex(checkActiveIndex);
    },[navigate])

  return (
    <Drawer 
        container={window.document.body} 
        variant="permanent" 
        open={true}
        sx={{width:250, height: "100vh"}}
    >
        <List 
            sx={{
                width: 250,
                height: "100vh",
                backgroundColor:assets.colors.secondary
            }}
        >
            <ListItemButton>
                <Box 
                    sx={{
                        width: "100%",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography variant="body2" fontWeight="700">
                        {user.username}
                    </Typography>
                    <IconButton onClick={logout}>
                        <LogoutOutlinedIcon />
                    </IconButton>
                </Box>
            </ListItemButton>
            <Box sx={{paddigTop:"10px"}}></Box>
            <ListItemButton>
                <Box 
                    sx={{
                        width: "100%",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography variant="body2" fontWeight="700">
                        お気に入り
                    </Typography>
                </Box>
            </ListItemButton>
            <Box sx={{paddigTop:"10px"}}></Box>
            <ListItemButton>
                <Box 
                    sx={{
                        width: "100%",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography variant="body2" fontWeight="700">
                        プライベート
                    </Typography>
                    <IconButton>
                        <AddBoxOutlinedIcon fontSize='small'/>
                    </IconButton>
                </Box>
            </ListItemButton>
            {memos.map((memo, index)=>{
                return (
                    <ListItemButton 
                        sx={{pl:"20px"}} 
                        component={Link} 
                        to={`/memo/${memo._id}`} 
                        key={memo._id}
                        selected = {index === activeIndex}
                    >
                        <Typography>{memo.icon} {memo.title}</Typography>        
                    </ListItemButton>                   
                )
            })}
        </List>
    </Drawer>
  )
}

export default Sidebar