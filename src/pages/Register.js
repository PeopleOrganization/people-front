import React from 'react';
import styled from "styled-components";
import Province2 from "./province2";
import axios from 'axios'
import { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Register(props) {
  var mailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
  const [check,setCheck] = useState("1");
  const [emailCheck,setEmailCheck] = useState("1");
  const [email,setEmail] = useState("");
  const [pw,setPw] = useState("");
  const [pw2,setPw2] = useState("");
  const [nickName,setNickName] = useState("");
  const [blood,setBlood] = useState("");
  const [area,setArea] = useState("");
  const [push,setPush] = useState(false);
  const handleChange = () => { 
    setPush(!push); 
  }; 


  const join = () => {
    console.log("회원가입 하러 옴");

    if(email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }else if(pw === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }else if(nickName === "") {
      alert("닉네임을 입력해주세요");
      return;
    }else if(pw2 !== pw) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if(check !== 0) {
      alert("닉네임 중복체크를 해주세요.");
      return;
    }
    if(emailCheck !== 0) {
      alert("이메일 중복체크를 해주세요.");
      return;
    }
    axios.post('http://localhost:3001/join', null, {
      params: { 
        email: email,
        pw: pw,
        nickName : nickName,
        blood: blood,
        area: area,
        push: push
      }
    })
      .then(res => {  
        console.log(res.data)
        alert("회원가입에 성공하셨습니다.")
        document.location.href = '/'
      })
      .catch(function(error){
       console.log(error);
    })
  }

  const overlap = () => {
    console.log("중복체크 하러 옴");


    axios.post('http://localhost:3001/overlap', null, {
      params: { 
        nickName: nickName,
      }
    })
      .then(res => {

        console.log(res.data)
        if(res.data === 0) { // 0을 받아오면 성공했다는 알람
          alert("사용해도 되는 닉네임입니다.");
          setCheck(0);
          return;
        }else { // 0이외의 값이라면 실패했다는 알람
          alert("이미 존재하는 닉네임입니다.")
          return;
        }
      })
      .catch(function(error){
       console.log(error);
    })
  }

  const emailOverlap = () => {
    console.log("중복체크 하러 옴");


    axios.post('http://localhost:3001/emailOverlap', null, {
      params: { 
        email: email,
      }
    })
      .then(res => {

        console.log(res.data)
        if(res.data === 0) { // 0을 받아오면 성공했다는 알람
          if(!mailRegExp.test(email)) {
            alert("이메일 형식이 올바르지 않습니다.");
            return;
          }
          alert("사용해도 되는 이메일입니다.");
          setEmailCheck(0);
          return;
        }else { // 0이외의 값이라면 실패했다는 알람
          alert("이미 존재하는 이메일입니다.")
          return;
        }
      })
      .catch(function(error){
       console.log(error);
    })
  }

  return (
    <div className="centerContainer">
      <div className="container">
        <h1 className="sidebarTitle">회원가입</h1>
        <span align="center" className="hello">
          피플은 고객님의 정보를 소중하게 생각합니다.
          <br></br>일부 서비스는 로그인 이후 이용 가능합니다.
        </span>
        <hr />
        <div align="center">
          <p>
            <Box 
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="이메일"
                variant="outlined"
                onChange={(event) => setEmail(event.target.value)}
              /><br></br><Button onClick={emailOverlap}>중복확인</Button><br/>
              <TextField
                id="outlined-basic"
                label="비밀번호"
                type="password"
                variant="outlined"
                onChange={(event) => setPw(event.target.value)}
              /><br></br>
              <TextField
                id="outlined-basic"
                label="비밀번호 확인"
                variant="outlined"
                onChange={(event) => setPw2(event.target.value)}
              /><br></br>
              <TextField
                id="outlined-basic"
                label="닉네임"
                variant="outlined"
                onChange={(event) => setNickName(event.target.value)}
              /><br></br><Button onClick={overlap}>중복확인</Button><br/>
            </Box>
            
          </p>
          <br></br>------------ (본인의 혈액형을 선택해주세요.) ------------
          <br />
          <fieldset>
            <label>
              <Radio
                onChange={(event) => setBlood(event.target.value)}
                value="A"
                name="blood"
              />
              A형&nbsp;&nbsp;
            </label>

            <label>
              <Radio
                onChange={(event) => setBlood(event.target.value)}
                value="B"
                name="blood"
              />
              B형&nbsp;&nbsp;
            </label>

            <label>
              <Radio
                onChange={(event) => setBlood(event.target.value)}
                value="AB"
                name="blood"
              />
              AB형&nbsp;&nbsp;
            </label>

            <label>
              <Radio
                onChange={(event) => setBlood(event.target.value)}
                value="O"
                name="blood"
              />
              O형&nbsp;&nbsp; &nbsp;꒐
              <Checkbox style={{ color: "#e6687d" }} defaultChecked />
              Rh-혈액형
            </label>
          </fieldset>
          <br></br>
          <p>
            --------------- (거주지역을 선택해주세요.) ---------------
            <br />
            <Province2
              onChange={(event) => setArea(event.target.value)}
              name="area"
            ></Province2>
          </p>
          <br></br>
          <p>
            <Checkbox
              style={{ color: "#e6687d" }}
              defaultChecked
              id="agree"
              onChange={handleChange}
            />
            이메일 수신 동의
          </p>
          <Button2 onClick={join}>회원가입</Button2>
        </div>
      </div>
    </div>
  );
}



export default Register;

const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.size || "1em",
}))``;

const Input2 = styled.input.attrs((props) => ({
  type: "text",
  size: props.size || "1em",
}))`margin-right: 6.1%;`;

const Input3 = styled.input.attrs((props) => ({
  type: "text",
  size: props.size || "1em",
}))`margin-top: 2%;`;

const Button = styled.button`
&:hover{
  background: #6f0000;
  box-shadow: inset 0 0 10px #200122;
  color: #fff;
  border: none;
}
background: rgb(255, 81, 81);
box-shadow: inset 0 0 10px rgb(91, 28, 26);
color: #fff;
border: none;
font-size: medium;
`;


const Button2 = styled.button`
&:hover{
  background: #6f0000;
  box-shadow: inset 0 0 10px #200122;
  color: #fff;
  border: none;
}
background: rgb(255, 81, 81);
box-shadow: inset 0 0 10px rgb(91, 28, 26);
color: #fff;
border: none;
font-size: large;
margin-bottom:6%;
`;

const Radio = styled.input.attrs((props) => ({
  type: "radio",
  size: props.size || "1em",
}))`
  
  width:1.25em;
  height:1.25em;
  
`;
