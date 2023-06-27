import { Box, Drawer, IconButton, List, ListItemButton, Typography, alpha } from '@mui/material'
import React, { useEffect, useState } from 'react';
import LogoutOutlinedIcon from "@mui/icons-material/LoginOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import assets from '../../assets';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {useSelector} from "react-redux";
import memoApi from '../../api/memoApi';
import { useDispatch } from 'react-redux';
import { setMemo } from '../../redux/features/memoSlice';
import { setFavoriteMemo } from '../../redux/features/favoriteMemoSlice';
import { setNormalMemo } from '../../redux/features/normalMemoSlice';

const Sidebar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {memoId} = useParams();
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [isNormal, setIsNormal] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const user = useSelector((state)=> state.user.value)
    const memos = useSelector((state)=> state.memo.value)
    const favoriteMemos = useSelector((state)=> state.favoriteMemo.value);
    const normalMemos = useSelector((state)=> state.normalMemo.value);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    useEffect(()=>{
        const getMemos = async()=> {
            try {
                const res = await memoApi.getAll();
                console.log(res);
                dispatch(setMemo(res));
                const tempMemo = [...res];
                const favoriteMemo = tempMemo.filter((elm)=> elm.favorite === true);
                const newMemo = tempMemo.filter((elm)=> elm.favorite !== true);
                dispatch(setFavoriteMemo(favoriteMemo));
                dispatch(setNormalMemo(newMemo));
            } catch (err) {
                alert(err);
            }
        };
        getMemos();
    },[dispatch]);

    useEffect(()=>{
        const checkActiveIndex = memos.findIndex((e)=> e._id === memoId);
        setActiveIndex(checkActiveIndex);
    },[navigate, memos]);

    const addMemo = async() => {
        setIsNormal(true);
        try {
            const res = await memoApi.create();
            const newMemos = [res, ...memos];
            // const newMemos = await memoApi.getAll();
            dispatch(setMemo(newMemos));
            const tempMemo = [...newMemos];
            const favoriteMemo = tempMemo.filter((elm) => elm.favorite === true);
            const newMemo = tempMemo.filter((elm) => elm.favorite !== true);
            console.log("favorite:", favoriteMemo);
            console.log("normalMemo:", newMemo);
            dispatch(setFavoriteMemo(favoriteMemo));
            dispatch(setNormalMemo(newMemo));
            navigate(`/memo/${res._id}`);
        } catch (err) {
            alert(err);
        }

    }

    const showHideFavorite = () => {
        setIsFavorite(!isFavorite);
    }

    const showHideNormal = () => {
        setIsNormal(!isNormal);
    }

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
                    <Typography variant="body2" fontWeight="700" onClick={showHideFavorite}>
                        ▼お気に入り
                    </Typography>
                </Box>
            </ListItemButton>
            { isFavorite &&
            (
            favoriteMemos.map((memo, index)=>{
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
                
            })
            )
            }
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
                    <Typography variant="body2" fontWeight="700" onClick={showHideNormal}>
                        ▼プライベート
                    </Typography>
                    <IconButton onClick={addMemo}>
                        <AddBoxOutlinedIcon fontSize='small'/>
                    </IconButton>
                </Box>
            </ListItemButton>
            { isNormal &&
            (
            normalMemos.map((memo, index)=>{
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
            })           
            )
            }
        </List>
    </Drawer>
  )
}

export default Sidebar