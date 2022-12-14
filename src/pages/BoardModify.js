import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./BoardView.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PhotoIcon from "@mui/icons-material/Photo";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



function BoardModify() {
  const { vocId } = useParams();
  // const item = GetData(vocId);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [user, setUser] = useState([]);
const [bloodType, setBloodType] = useState("");
const [title, setTitle] = useState("");
const [bloodKind, setBloodKind] = useState("");
const [patientName, setPatientName] = useState("");
const [hospital, setHospital] = useState("");
const [phonNum, setPhonNum] = useState("");
const [requestB, setRequestB] = useState("");
const [content, setContent] = useState("");
const [registNum, setRegistNum] = useState("");

useEffect(() => {
  axios
    .post("http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/modifyInfo", null, {
      params: {
        postkey: window.localStorage.getItem("postkey"),
      },
    })
    .then((res) => {
      // setUser(res.data);
      setBloodType(res.data[0]["bloodType"])
      setTitle(res.data[0]["title"]);
      setBloodKind(res.data[0]["bloodKind"]);
      setPatientName(res.data[0]["patientName"]);
      setHospital(res.data[0]["hospital"]);
      setPhonNum(res.data[0]["phonNum"]);
      setRequestB(res.data[0]["requestB"]);
      setContent(res.data[0]["content"]);
      setRegistNum(res.data[0]["registNum"]);

      
    });
}, []);

function validation(post) {
  if (title === "") {
    alert("????????? ???????????????");
    return;
  }
  if (bloodType === "") {
    alert("???????????? ???????????????");
    return;
  }
  if (bloodKind === "") {
    alert("??????????????? ???????????????");
    return;
  }
  if (requestB === "") {
    alert("??????????????? ???????????????");
    return;
  }
  if (patientName === "") {
    alert("???????????? ???????????????");
    return;
  }
  if (hospital === "") {
    alert("??????????????? ???????????????");
    return;
  }
  if (!/^[0-9]+$/.test(phonNum) || phonNum.length < 8) {
    alert("???????????? ???????????????");
    return;
  }
  if (!/^\d{10}$/.test(registNum)) {
    alert("??????????????? ???????????????");
    return;
  }
  post();
}

const postModify = () => {
axios.post('http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/modify', null, {
      params: { 
        postkey: window.localStorage.getItem("postkey"),
        bloodType: bloodType,
        bloodKind : bloodKind,
        patientName: patientName,
        registNum: registNum,
        hospital: hospital,
        phonNum: phonNum,
        requestB: requestB,
        title: title,
        content: content,
      }
    })
      .then(res => {  
        console.log(res.data)
        alert("????????? ????????? ?????????????????????.")
        document.location.href = '/Board'
      })
      .catch(function(error){
       console.log(error);
    })
  }

  return (
    <div id="bigContainer">
       
      <div id="sideLeft">
      <ul className="sidebarList2">
          <a className="href" href="Board">
            {" "}
            <li className="sidebarListItem2 active">???????????????</li>
          </a>
          &nbsp;
          <li className="sidebarListItem3">
            ??????????????????
            <li>
              <a id="BoardDropList" href="BoardA">
                A???
              </a>
            </li>
            <li>
              <a id="BoardDropList" href="BoardB">
                B???
              </a>
            </li>
            <li>
              <a id="BoardDropList" href="BoardAB">
                AB???
              </a>
            </li>
            <li>
              <a id="BoardDropList" href="BoardO">
                O???
              </a>
            </li>
          </li>
          <br></br>
          <button id="top" onClick={scrollToTop} type="button">
            {" "}
            Top
          </button>
        </ul>
      </div>

      <div className="container">
        <h1 className="sidebarTitle">??? ????????????</h1>
        <span align="center" className="hello">
          ???????????? ????????? ??? ?????? ???????????????.
        </span>
        <hr />
        <ui className="sidebarCircle">
          <ul className="sidebarList">
            <a className="href" href="Board">
              {" "}
              <li className="sidebarListItem active">???????????????</li>
            </a>
            &nbsp;
            <a className="href" href="BoardA">
              {" "}
              <li className="sidebarListItem">A?????????</li>
            </a>
            &nbsp;
            <a className="href" href="BoardB">
              {" "}
              <li className="sidebarListItem">B?????????</li>
            </a>
            &nbsp;
            <a className="href" href="BoardAB">
              {" "}
              <li className="sidebarListItem">AB?????????</li>
            </a>
            &nbsp;
            <a className="href" href="BoardO">
              {" "}
              <li className="sidebarListItem">O?????????</li>
            </a>
            &nbsp;
          </ul>
        </ui>
        <div id="postContainer2" align="center">
          
          <br />
          {/* <div>{item}</div> */}
          <br />
          <br />
          <div className="voc-view-wrapper">
        <div className="voc-view-row2">
        <TextField
                sx={{ minWidth: "100%" }}
                name="email"
                label="??????"
                value={title}
                id="outlined-basic"
                variant="outlined"
                onChange={(event) => setTitle(event.target.value)}
              />
        </div>
        <div className="voc-view-row2">
        <Box sx={{ minWidth: "32.8%" }}>
                <FormControl fullWidth>
                  <InputLabel
                    
                    id="demo-simple-select-helper-label"
                  >
                    ?????????
                  </InputLabel>
                  <Select
                    
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={bloodType}
                    label="Type"
                    onChange={(event) => setBloodType(event.target.value)}
                  >
                    <MenuItem value="">?????????</MenuItem>
                    <MenuItem value={"A"}>A+</MenuItem>
                    <MenuItem value={"B"}>B+</MenuItem>
                    <MenuItem value={"AB"}>AB+</MenuItem>
                    <MenuItem value={"O"}>O+</MenuItem>
                    <MenuItem value={"A-"}>A-</MenuItem>
                    <MenuItem value={"B-"}>B-</MenuItem>
                    <MenuItem value={"AB-"}>AB-</MenuItem>
                    <MenuItem value={"O-"}>O-</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              &nbsp;
              <Box sx={{ minWidth: "32.8%" }}>
                <FormControl fullWidth>
                  <InputLabel
                    
                    id="demo-simple-select-helper-label"
                  >
                    ????????????
                  </InputLabel>
                  <Select
                   
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={bloodKind}
                    label="Kind"
                    onChange={(event) => setBloodKind(event.target.value)}
                  >
                    <MenuItem value="">????????????</MenuItem>
                    <MenuItem value={"??????"}>??????</MenuItem>
                    <MenuItem value={"???????????? ?????????"}>
                      ???????????? ?????????
                    </MenuItem>
                    <MenuItem value={"??????"}>??????</MenuItem>
                    <MenuItem value={"???????????????"}>???????????????</MenuItem>
                    <MenuItem value={"???????????? ?????????"}>
                      ???????????? ?????????
                    </MenuItem>
                    <MenuItem value={"??????????????????????????????"}>
                      ??????????????????????????????
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              &nbsp;
              <Box sx={{ minWidth: "32.8%" }}>
                <FormControl fullWidth>
                  <InputLabel
                   
                    id="demo-simple-select-helper-label"
                  >
                    ????????????
                  </InputLabel>
                  <Select
                   
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={requestB}
                    label="Kind"
                    onChange={(event) => setRequestB(event.target.value)}
                  >
                    <MenuItem value="">????????????</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
        <div className="voc-view-row2">
        <TextField
                sx={{ minWidth: "100%" }}
                name="email"
                label="?????????"
                value={patientName}
                id="outlined-basic"
                variant="outlined"
                onChange={(event) => setPatientName(event.target.value)}
              />
        </div>
        <div className="voc-view-row2">
        <TextField
                sx={{ minWidth: "100%" }}
                name="email"
                value={hospital}
                label="????????????"
                id="outlined-basic"
                variant="outlined"
                onChange={(event) => setHospital(event.target.value)}
              />
        </div>
        <div className="voc-view-row2">
         <TextField
                sx={{ minWidth: "100%" }}
                name="email"
                label="????????? (ex:01012345678)"
                value={phonNum}
                id="outlined-basic"
                variant="outlined"
                onChange={(event) => setPhonNum(event.target.value)}
              />
        </div>
        <div className="voc-view-row2">
        <TextField
                sx={{ minWidth: "100%" }}
                name="email"
                label="????????? ???????????? (10??????)"
                value={registNum}
                id="outlined-basic"
                variant="outlined"
                onChange={(event) => setRegistNum(event.target.value)}
              />
        </div>
      </div>
          <div id="chatRoom2">
            
            {/* ????????? */}
            <br />
            <div id="receive2">
              <label id="receiveNick2">?????? ??????</label>
              <br />
            <textarea id="receiveChat2" value={content} onChange={(event) => setContent(event.target.value)}></textarea>
            </div>
            <br />
            {/* ????????? ???????????? */}

          </div>
            <button className="modifyBtn2" id="boardWriteBtn" onClick={handleClickOpen}>????????????</button>
            <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle
                    align="center"
                    color="blue"
                    sx={{
                      fontFamily: "GmarketSansMedium",
                      fontSize: "x-large",
                      fontWeight: "bold",
                    }}
                  >
                    {"??????"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      id="alert-dialog-slide-description"
                      sx={{
                        fontFamily: "GmarketSansMedium",
                        fontSize: "large",
                        fontWeight: "bold",
                      }}
                    >
                      ?????? ?????????????????????????
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions
                    sx={{
                      fontFamily: "GmarketSansMedium",
                      fontSize: "x-large",
                      fontWeight: "bold",
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "center",
                      marginBottom: "3%",
                    }}
                  >
                    <button
                      id="loginBtn"
                      style={{ padding: "1%", width: "30%" }}
                      onClick={() => {
                        validation(postModify);
                      }}
                    >
                      ??????
                    </button>
                    <button
                      id="loginBtn"
                      style={{ padding: "1%", width: "30%" }}
                      onClick={handleClose}
                    >
                      ??????
                    </button>
                  </DialogActions>
                </Dialog>
          <br /> <br />
        </div>{" "}
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}
export default BoardModify;