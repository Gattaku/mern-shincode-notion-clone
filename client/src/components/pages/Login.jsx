import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import {LoadingButton} from "@mui/lab";
import {Link, useNavigate} from "react-router-dom";
import authApi from '../../api/authApi';

const Login = () => {
  const navigate= useNavigate();

  const [usernameErrText, setUsesrnameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsesrnameErrText("");
    setPasswordErrText("");

    

    //入力欄の文字列を取得
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    // console.log(username);
    // console.log(password);

    let error = false;

    if (username === "") {
      setUsesrnameErrText("名前を入力してください");
      error = true;
    }
    if (password === "") {
      setPasswordErrText("パスワードを入力してください")
      error = true;
    }

    if (error) return;

    setLoading(true)
    //ログインAPIをたたく
    try {
      const res = await authApi.login({username, password});
      setLoading(false);
      localStorage.setItem("token", res.token);
      console.log("ログインに成功しました。");
      navigate("/");
    } catch(err) {
      console.log(err);
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((eachErr)=> {
        if (eachErr.param ==="username"){
          setUsesrnameErrText(eachErr.msg);
          return
        }
        if (eachErr.param ==="password"){
          setPasswordErrText(eachErr.msg);
          return
        }
      })
      setLoading(false);
    }


  }


  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField 
          fullWidth 
          id="username" 
          label="お名前" 
          margin='normal'
          name="username"
          required
          helperText = {usernameErrText}
          error = {usernameErrText !== ""}
          disabled = {loading}
          />
        <TextField noValidate
          fullWidth 
          id="password" 
          label="パスワード" 
          margin='normal'
          name="password"
          type="password"
          required
          helperText = {passwordErrText}
          error = {passwordErrText !== ""}
          disabled = {loading}
          />
        <LoadingButton 
          sx={{mt:3, mb:2}}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
        >
          ログイン
        </LoadingButton>
        <Button component={Link} to="/register">
          アカウントを持っていませんか？新規登録
        </Button>
      </Box>
    </>
  )
}

export default Login