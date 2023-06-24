import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import {LoadingButton} from "@mui/lab";
import {Link, useNavigate} from "react-router-dom";
import authApi from '../../api/authApi';

const Resister = () => {
  const navigate= useNavigate();

  const [usernameErrText, setUsesrnameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsesrnameErrText("");
    setPasswordErrText("");
    setConfirmPasswordErrText("");

    

    //入力欄の文字列を取得
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();
    // console.log(username);
    // console.log(password);
    // console.log(confirmPassword);

    let error = false;

    if (username === "") {
      setUsesrnameErrText("名前を入力してください");
      error = true;
    }
    if (password === "") {
      setPasswordErrText("パスワードを入力してください")
      error = true;
    }
    if (confirmPassword === "") {
      setConfirmPasswordErrText("確認用パスワードを入力してください")
      error = true;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordErrText("パスワードと確認用パスワードが異なります。");
      error = true;
    }

    if (error) return;

    setLoading(true)
    //新規登録APIをたたく
    try {
      const res = await authApi.register({username, password, confirmPassword});
      setLoading(false);
      localStorage.setItem("token", res.token);
      console.log("新規登録に成功しました。");
      navigate("/");
    } catch(err) {
      console.log(err);
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((eachErr)=> {
        if (eachErr.path ==="username"){
          setUsesrnameErrText(eachErr.msg);
          return
        }
        if (eachErr.path ==="password"){
          setPasswordErrText(eachErr.msg);
          return
        }
        if (eachErr.path ==="confirmPassword"){
          setConfirmPasswordErrText(eachErr.msg);
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
        <TextField noValidate
          fullWidth 
          id="confirmPassword" 
          label="確認用パスワード" 
          margin='normal'
          name="confirmPassword"
          type="password"
          required
          helperText = {confirmPasswordErrText}
          error = {confirmPasswordErrText !== ""}
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
          アカウント作成
        </LoadingButton>
        <Button component={Link} to="/login">
          すでにアカウントを持っていますか？ログイン
        </Button>
      </Box>
    </>
  )
}

export default Resister