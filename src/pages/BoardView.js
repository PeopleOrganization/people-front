import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./BoardView.css";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PhotoIcon from "@mui/icons-material/Photo";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import styled from "styled-components";
import { StoreMallDirectory } from "@mui/icons-material";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Button1 = styled.button`
  &:hover {
    background: rgb(28, 61, 101);
    color: #fff;
    font-weight: bold;
  }

  background: rgb(63, 120, 190);
  color: #fff;
  font-weight: bold;
`;

const oneCheckBox = (checkThis) => {
  const box = document.getElementsByName("box");
  for (let i = 0; i < box.length; i++) {
    if (box[i] !== checkThis) {
      box[i].checked = false;
    }
  }
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function GetData(vocId) {
  const [post, setPost] = useState([]);
  const [title, setTitle] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [bloodKind, setBloodKind] = useState("");
  const [patientName, setPatientName] = useState("");
  const [hospital, setHospital] = useState("");
  const [phonNum, setPhonNum] = useState("");
  const [requestB, setRequestB] = useState("");
  const [responseB, setResponseB] = useState("");
  const params = useParams();
  const postkey2 = params.postkey;

  useEffect(() => {
    axios
      .post("http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/postView", null, {
        params: {
          postkey: postkey2,
        },
      })
      .then((res) => {
        setTitle(res.data[0]["title"]);
        setBloodType(res.data[0]["bloodType"]);
        setBloodKind(res.data[0]["bloodKind"]);
        setPatientName(res.data[0]["patientName"]);
        setHospital(res.data[0]["hospital"]);
        setPhonNum(res.data[0]["phonNum"]);
        setRequestB(res.data[0]["requestB"]);
        setResponseB(res.data[0]["responseB"]);
      });
  }, []);

  const item = (
    <>
      <div className="voc-view-wrapper2">
        <div className="voc-view-row">
          <label>?????? :</label>
          <label>{title}</label>
        </div>
        <div className="voc-view-row">
          <label>????????? :</label>
          <label>{patientName}</label>
        </div>
        <div className="voc-view-row">
          <label>????????? :</label>
          <label>{bloodType}</label>
        </div>
        <div className="voc-view-row">
          <label>???????????? :</label>
          <label>{bloodKind}</label>
        </div>
        <div className="voc-view-row">
          <label>???????????? :</label>
          <label>{responseB + "/" + requestB}</label>
        </div>
      </div>
    </>
  );

  return { jsx: item, rqb: requestB, rpb: responseB };
}

function BoardView() {
  const { vocId } = useParams();
  const item = GetData(vocId);
  const scrollRef = useRef();
  const [content, setContent] = useState("");
  const [replyData, setReplyData] = useState([]); //?????? ??????
  const [deleteShow, setDeleteShow] = useState("boardDelete"); //?????? ?????? ??? ?????????
  const params = useParams();
  const postkey2 = params.postkey;
  const [email3, setEmail3] = useState(""); // ????????? ???????????? ?????????
  const [replyContent, setReplyContent] = useState(); // ?????? ??????

  const [nickName, setNickName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [bloodKind, setBloodKind] = useState("");
  const [patientName, setPatientName] = useState("");
  const [hospital, setHospital] = useState("");
  const [phonNum, setPhonNum] = useState("");
  const [registNum, setRegistNum] = useState("");
  const [postYear, setPostYear] = useState("");
  const [postMonth, setPostMonth] = useState("");
  const [postDay, setPostDay] = useState("");
  const [postHour, setPostHour] = useState("");
  const [postMinute, setPostMinute] = useState("");

  //??? ????????? ?????? ???????????? ???????????? ??????
  const [bloodNum, setBloodNum] = useState("");
  const [bloodNum2, setBloodNum2] = useState("");
  const [bloodNum3, setBloodNum3] = useState("");
  const [bloodNum4, setBloodNum4] = useState("");
  const [bloodType2, setBloodType2] = useState("");
  const [bloodKind2, setBloodKind2] = useState("");
  const [hospital2, setHospital2] = useState("");
  const [bloodDate, setBloodDate] = useState("2022-01-01");

  //?????? ??????
  const dateTotal = new Date();
  const nowYear = dateTotal.getFullYear();
  const nowMonth = dateTotal.getMonth() + 1;
  const nowDay = dateTotal.getDate();

  const [bloodCheck, setBloodCheck] = useState("boardDelete"); //???????????? ?????????(????????? ??????)
  const [bloodCheck2, setBloodCheck2] = useState("boardDelete2"); //???????????? ?????????(????????? ??????)

  const [endData, setEndData] = useState([]); //?????? ?????? ??????

  let [scrapCheck2, setScrapCheck2] = useState("");

  useEffect(() => {
    axios
      .post("http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/certificateShow", null, {
        params: {
          postkey: postkey2,
        },
      })
      .then((res) => {
        console.log(res.data);
        setEndData(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/postView", null, {
        params: {
          postkey: postkey2,
        },
      })
      .then((res) => {
        setBloodType(res.data[0]["bloodType"]);
        setBloodKind(res.data[0]["bloodKind"]);
        setPatientName(res.data[0]["patientName"]);
        setHospital(res.data[0]["hospital"]);
        setPhonNum(res.data[0]["phonNum"]);
        setNickName(res.data[0]["nickName"]);
        setRegistNum(res.data[0]["registNum"]);
        setPostYear(res.data[0]["year"]);
        setPostMonth(res.data[0]["month"]);
        setPostDay(res.data[0]["day"]);
        setPostHour(res.data[0]["hour"]);
        setPostMinute(res.data[0]["minute"]);
      });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleClickOpen4 = () => {
    setOpen4(true);
  };

  const handleClose4 = () => {
    setOpen4(false);
  };

  const handleClickOpen5 = () => {
    setOpen5(true);
  };

  const handleClose5 = () => {
    setOpen5(false);
  };

  function countCertificate() {
    item.rpb < item.rqb
      ? handleClickOpen()
      : alert("????????????????????? ????????? ?????? ?????????????????????.");
  }

  //??????????????? ????????? ??? ????????? ??????
  useEffect(() => {
    axios
      .post("http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/deleteNick", null, {
        params: {
          postkey: postkey2,
        },
      })
      .then((res) => {
        window.localStorage.setItem("postkey", postkey2);

        // eslint-disable-next-line array-callback-return
        console.log("????????????????????????");
        console.log(res.data[0]["email"]);
        setEmail3(res.data[0]["email"]);
        console.log(window.localStorage.getItem("email"));
        if (res.data[0]["email"] === window.localStorage.getItem("email")) {
          setDeleteShow("boardDelete2");
          setBloodCheck("boardDelete2");
          setBloodCheck2("boardDelete");
        }
      });
  }, []);

  //?????? ????????????
  useEffect(() => {
    axios
      .post("http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/replyShow", null, {
        params: {
          postkey: postkey2,
        },
      })
      .then((response) => {
        setReplyData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/postView", null, {
        params: {
          postkey: postkey2,
        },
      })
      .then((res) => {
        setContent(res.data[0]["content"]);
      });
  });

  const modify2 = () => {
    document.location.href = "/BoardModify";
  };

  //?????? ??????
  const replySave = () => {
    axios
      .post("http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/reply", null, {
        params: {
          postkey: postkey2,
          email: window.localStorage.getItem("email"),
          nickName: window.localStorage.getItem("nickName"),
          replyContent: replyContent,
          replyType: "true",
        },
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  
  //???????????? ??????
  const certificate = () => {
    if (validation()) {
      axios.post("http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/resCheck", null, {
                  params: {
                    postkey: postkey2,
                  },
                })
      .then((res) => {
        if(res.data === 0) {
          axios
          .post("http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/certificate", null, {
            params: {
              postkey: postkey2,
              bloodNum: bloodNum,
              bloodNum2: bloodNum2,
              bloodNum3: bloodNum3,
              bloodNum4: bloodNum4,
              email: window.localStorage.getItem("email"),
              nickName: window.localStorage.getItem("nickName"),
              bloodType: bloodType2,
              bloodKind: bloodKind2,
              hospital: hospital2,
              bloodDate: bloodDate,
            },
          })
          .then((res) => {
            console.log(res.data);
            if (res.data === 0) {
              // 0??? ????????? ???????????? ????????? ??????????????? ?????? ??????
              axios
                .post("http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/reply2", null, {
                  params: {
                    postkey: postkey2,
                    email: window.localStorage.getItem("email"),
                    nickName: window.localStorage.getItem("nickName"),
                    replyContent: "<?????? ????????? ???????????????!>",
                    bloodType: bloodType2,
                    bloodKind: bloodKind2,
                    hospital: hospital2,
                    bloodDate: bloodDate,
                  },
                })
                .then((res) => {
                  console.log("????????? ???????????? ???");
                  axios.post("http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/reply3", null, {
                    params: {
                      email: email3,
                      postkey: postkey2,
                    },
                  });
                })
                .then((res) => {
                  console.log("1??????");
                  axios.post("http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/responsePlus", null, {
                    params: {
                      postkey: postkey2,
                    },
                  });
                })
                .then((res) => {
                  console.log("???????????? ??? ????????????");
                  alert("?????? ????????? ?????? ???????????????.");
                  window.location.reload();
                })
                .catch(function (error) {
                  console.log(error);
                });
            } else {
              alert("?????? ?????? ????????? ?????????????????????.").catch(function (error) {
                console.log(error);
              });
            }
          });
        }else {
          alert("?????? ?????? ??????????????? ????????? ??????????????????.")
        }
      })

    }
  };

  //???????????? ????????? ??????
  const validation = () => {
    if (!/^\d{2}$/.test(bloodNum)) {
      alert("?????? ??????????????? ????????? ??????????????????");
      return false;
    }
    if (!/^\d{2}$/.test(bloodNum2)) {
      alert("?????? ??????????????? ????????? ??????????????????");
      return false;
    }
    if (!/^\d{6}$/.test(bloodNum3)) {
      alert("?????? ??????????????? ????????? ??????????????????");
      return false;
    }
    if (!/^\d{2}$/.test(bloodNum4)) {
      alert("?????? ??????????????? ????????? ??????????????????");
      return false;
    }

    handleClose();
    return true;
  };

  //????????? ?????????, ??? ?????????
  const scrapCheck = () => {
    axios
      .post("http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/scrapCheck", null, {
        params: {
          postkey: postkey2,
          email: window.localStorage.getItem("email"),
          nickName: window.localStorage.getItem("nickName"),
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log("?????? 1");
        if (res.data === 0) {
          // 0??? ????????? ?????? ???????????? ??? ????????? ???
          console.log("?????? ????????? ??? ??????!! 0");
          axios
            .post("http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/scrap", null, {
              params: {
                postkey: postkey2,
                email: window.localStorage.getItem("email"),
                nickName: window.localStorage.getItem("nickName"),
              },
            })
            .then((res) => {
              // console("???0: "+scrapCheck2)
              console.log(res.data);
              alert("????????? ???????????????.");
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          // 0????????? ????????? ?????? ????????? ????????? ???
          console.log("?????? ????????? ??????!! 1");
          axios
            .post("http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/scrapDelete", null, {
              params: {
                postkey: postkey2,
                email: window.localStorage.getItem("email"),
                nickName: window.localStorage.getItem("nickName"),
              },
            })
            .then((res) => {
              // console.log(res.data)
              // console("???1: "+scrapCheck2)
              alert("???????????? ?????????????????????.");
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });
  };

  //????????? ??????
  const delete2 = () => {
    console.log("??? ?????? ?????? ???");

    axios
      .post("http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/delete", null, {
        params: {
          postkey: postkey2,
        },
      })
      .then((res) => {
        console.log(res.data);
        alert("???????????? ?????????????????????.");
        document.location.href = "/Board";
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [Type, setType] = React.useState("");
  const [Kind, setKind] = React.useState("");
  const [Bank, setBank] = React.useState("");

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleChange2 = (event) => {
    setKind(event.target.value);
  };

  const handleChange3 = (event) => {
    setBank(event.target.value);
  };

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
        <h1 className="sidebarTitle">?????????</h1>
        <span align="center" className="hello">
          ???????????? ????????? ????????? ???????????????.
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
        <div id="postContainer" align="center">
          <br />
          <div>{item.jsx}
          <div id="chatIcon">
              <span id="boardButton">
                <button id="boardBtn1" onClick={handleClickOpen2}>
                  {" "}
                  <PermContactCalendarIcon color="white"></PermContactCalendarIcon>
                  ???????????????
                </button>
                <Dialog
                  open={open2}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose2}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle
                    align="center"
                    color="red"
                    sx={{
                      fontFamily: "GmarketSansMedium",
                      fontSize: "x-large",
                      fontWeight: "bold",
                    }}
                  >
                    {"????????? ??????"}
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
                      <table id="bloodLicenceTable2">
                        <tr id="bloodInfoTr1">
                          <td id="bloodInfoTd1">????????? :&nbsp;</td>
                          <td id="bloodInfoTd2">{patientName}</td>
                        </tr>
                        <tr id="bloodInfoTr2">
                          <td id="bloodInfoTd1">????????? :&nbsp;</td>
                          <td id="bloodInfoTd2">{bloodType}???</td>
                        </tr>
                        <tr id="bloodInfoTr1">
                          <td id="bloodInfoTd1">???????????? :&nbsp;</td>
                          <td id="bloodInfoTd2">{bloodKind}</td>
                        </tr>
                        <tr id="bloodInfoTr2">
                          <td id="bloodInfoTd1">???????????? :&nbsp;</td>
                          <td id="bloodInfoTd2">{hospital}</td>
                        </tr>
                        <tr id="bloodInfoTr1">
                          <td id="bloodInfoTd1">????????? :&nbsp;</td>
                          <td id="bloodInfoTd2">{phonNum}</td>
                        </tr>
                        <tr id="bloodInfoTr2">
                          <td id="bloodInfoTd1">???????????? :&nbsp;</td>
                          <td id="bloodInfoTd2">{registNum}</td>
                        </tr>
                      </table>
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
                      style={{ padding: "1%" }}
                      onClick={handleClose2}
                    >
                      ??????
                    </button>
                  </DialogActions>
                </Dialog>
                &nbsp;
                <button id="boardBtn2" onClick={scrapCheck}>
                  {" "}
                  <BookmarkIcon></BookmarkIcon>?????????
                </button>
                <Dialog
                  open={open3}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose3}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle
                    align="center"
                    color="red"
                    sx={{
                      fontFamily: "GmarketSansMedium",
                      fontSize: "x-large",
                      fontWeight: "bold",
                    }}
                  >
                    {""}
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
                      ????????????????????????.
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
                      onClick={handleClose3}
                    >
                      ??????
                    </button>
                  </DialogActions>
                </Dialog>
                &nbsp;
                {/*########################## ????????? ?????? ##########################*/}
                <Button1 id={bloodCheck2} onClick={countCertificate}>
                  <FactCheckIcon></FactCheckIcon>????????????
                </Button1>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle
                    align="center"
                    color="red"
                    sx={{
                      fontFamily: "GmarketSansMedium",
                      fontSize: "x-large",
                      fontWeight: "bold",
                    }}
                  >
                    {"??????????????????"}
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
                      <p id="bloodLicenceTitle2">????????? ???????????? ???????????????.</p>{" "}
                      <p id="bloodLicenceTitle3">
                        ??????????????? ?????? ??????????????? ???????????????. <br></br>?????????
                        ???????????? ????????? ????????? ??????????????? ??? ????????? ??????.
                        <br></br>
                        <br></br>???????????? ?????? ????????? ????????? ?????????. (??????){" "}
                      </p>
                      <hr></hr>
                      <br></br>
                      <table id="bloodLicenceTable">
                        <tr>
                          <td id="bloodLicence">
                            ???????????? &nbsp;
                            <td id="bloodLicence2">
                              ????????????:&nbsp;
                              <input
                                id="bloodLicenceNum1"
                                onChange={(event) =>
                                  setBloodNum(event.target.value)
                                }
                              ></input>
                              &nbsp;-&nbsp;
                              <input
                                id="bloodLicenceNum2"
                                onChange={(event) =>
                                  setBloodNum2(event.target.value)
                                }
                              ></input>
                              &nbsp;-&nbsp;
                              <input
                                id="bloodLicenceNum3"
                                onChange={(event) =>
                                  setBloodNum3(event.target.value)
                                }
                              ></input>
                              &nbsp;-&nbsp;
                              <input
                                id="bloodLicenceNum4"
                                onChange={(event) =>
                                  setBloodNum4(event.target.value)
                                }
                              ></input>
                            </td>
                          </td>
                        </tr>{" "}
                        <tr>
                          <td>
                            <br></br>
                            &nbsp;
                            <span>
                              {window.localStorage.getItem("nickName")} ???
                            </span>
                            <br></br>
                            <br></br>
                            <p id="bloodLicenceBloodType">
                              <Box
                              // sx={{ width: "5%", minWidth: "45%" }}
                              >
                                <FormControl fullWidth>
                                  <InputLabel
                                    sx={{
                                      fontFamily: "GmarketSansMedium",
                                      fontWeight: "bold",
                                    }}
                                    id="demo-simple-select-helper-label"
                                  >
                                    ?????????
                                  </InputLabel>
                                  <Select
                                    sx={{
                                      fontFamily: "GmarketSansMedium",
                                      fontWeight: "bold",
                                    }}
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={bloodType2}
                                    label="Type"
                                    onChange={(event) =>
                                      setBloodType2(event.target.value)
                                    }
                                    // onChange={handleChange}
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
                              &nbsp;&nbsp;
                              <Box
                              // sx={{ width: "5%", minWidth: "45%" }}
                              >
                                <FormControl fullWidth>
                                  <InputLabel
                                    sx={{
                                      fontFamily: "GmarketSansMedium",
                                      fontWeight: "bold",
                                    }}
                                    id="demo-simple-select-helper-label"
                                  >
                                    ????????????
                                  </InputLabel>
                                  <Select
                                    sx={{
                                      fontFamily: "GmarketSansMedium",
                                      fontWeight: "bold",
                                    }}
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={bloodKind2}
                                    label="Kind"
                                    onChange={(event) =>
                                      setBloodKind2(event.target.value)
                                    }
                                    // onChange={handleChange2}
                                  >
                                    <MenuItem value="">????????????</MenuItem>
                                    <MenuItem value={"??????"}>??????</MenuItem>
                                    <MenuItem value={"???????????? ?????????"}>
                                      ???????????? ?????????
                                    </MenuItem>
                                    <MenuItem value={"??????"}>??????</MenuItem>
                                    <MenuItem value={"???????????????"}>
                                      ???????????????
                                    </MenuItem>
                                    <MenuItem value={"???????????? ?????????"}>
                                      ???????????? ?????????
                                    </MenuItem>
                                    <MenuItem value={"??????????????????????????????"}>
                                      ??????????????????????????????
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </Box>
                            </p>
                            <p id="bloodLicenceBloodType">
                              <Box
                              // sx={{ width: "5%", minWidth: "47%" }}
                              >
                                <FormControl fullWidth>
                                  <InputLabel
                                    sx={{
                                      fontFamily: "GmarketSansMedium",
                                      fontWeight: "bold",
                                    }}
                                    id="demo-simple-select-helper-label"
                                  >
                                    ????????? ???
                                  </InputLabel>
                                  <Select
                                    sx={{
                                      fontFamily: "GmarketSansMedium",
                                      fontWeight: "bold",
                                    }}
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={hospital2}
                                    label="Bank"
                                    onChange={(event) =>
                                      setHospital2(event.target.value)
                                    }
                                    // onChange={handleChange3}
                                  >
                                    <MenuItem value="">????????? ???</MenuItem>
                                    <MenuItem value={"?????????????????????"}>
                                      ?????????????????????
                                    </MenuItem>
                                    <MenuItem value={"?????????????????????"}>
                                      ?????????????????????
                                    </MenuItem>
                                    <MenuItem value={"?????????????????????"}>
                                      ?????????????????????
                                    </MenuItem>
                                    <MenuItem value={"???????????????"}>
                                      ???????????????
                                    </MenuItem>
                                    <MenuItem value={"?????????????????????"}>
                                      ?????????????????????
                                    </MenuItem>
                                    <MenuItem value={"???????????????"}>
                                      ???????????????
                                    </MenuItem>
                                    <MenuItem value={"???????????????"}>
                                      ???????????????
                                    </MenuItem>
                                    <MenuItem value={"???????????????"}>
                                      ???????????????
                                    </MenuItem>
                                    <MenuItem value={"???????????????"}>
                                      ???????????????
                                    </MenuItem>
                                    <MenuItem value={"???????????????"}>
                                      ???????????????
                                    </MenuItem>
                                    <MenuItem value={"???????????????????????????"}>
                                      ???????????????????????????
                                    </MenuItem>
                                    <MenuItem value={"???????????????"}>
                                      ???????????????
                                    </MenuItem>
                                    <MenuItem value={"???????????????????????"}>
                                      ???????????????????????
                                    </MenuItem>
                                    <MenuItem value={"???????????????"}>
                                      ???????????????
                                    </MenuItem>
                                    <MenuItem value={"???????????????"}>
                                      ???????????????
                                    </MenuItem>
                                    <MenuItem value={"????????????????????????"}>
                                      ????????????????????????
                                    </MenuItem>
                                    <MenuItem value={"??????????????????"}>
                                      ??????????????????
                                    </MenuItem>
                                    <MenuItem value={"??????????????????"}>
                                      ??????????????????
                                    </MenuItem>
                                    <MenuItem value={"????????????????????????"}>
                                      ????????????????????????
                                    </MenuItem>
                                    <MenuItem value={"????????????????????????"}>
                                      ????????????????????????
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </Box>
                              &nbsp;&nbsp;
                              <Stack component="form" noValidate spacing={3}>
                                <TextField
                                  id="date"
                                  label="????????????"
                                  type="date"
                                  defaultValue="2022-01-01"
                                  // sx={{ width: "5%", minWidth: "155%" }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  onChange={(event) =>
                                    setBloodDate(event.target.value)
                                  }
                                />
                              </Stack>
                            </p>
                            <br></br>
                            <p id="BoardLicenceText">
                              ????????? ????????? ???????????? ?????? ????????? ?????? ????????????
                              ????????????<br></br>
                              ?????? ????????? ????????? ????????? ?????? ??? ????????? ????????????.
                            </p>
                          </td>
                        </tr>
                      </table>
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
                      style={{ padding: "1%" }}
                      onClick={() => {
                        certificate();
                      }}
                    >
                      ??????
                    </button>
                    <button
                      id="loginBtn"
                      style={{ padding: "1%" }}
                      onClick={handleClose}
                    >
                      ??????
                    </button>
                  </DialogActions>
                </Dialog>
                {/* ########################## ??????????????? ##########################*/}
                <Button1 id={bloodCheck} onClick={handleClickOpen5}>
                  <FactCheckIcon></FactCheckIcon>????????????
                </Button1>
                <div>
                  <Dialog
                    open={open5}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose5}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle
                      align="center"
                      color="red"
                      sx={{
                        fontFamily: "GmarketSansMedium",
                        fontSize: "x-large",
                        fontWeight: "bold",
                      }}
                    >
                      {"??????????????????"}
                      <br />
                      {"("}
                      {endData.length}
                      {"???)"}
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
                        {endData.map((it) => (
                          <div key={it.certificatekey}>
                            <div>
                              <table id="bloodLicenceTable">
                                <tr>
                                  <td id="bloodLicence">
                                    ???????????? &nbsp;
                                    <td id="bloodLicence2">
                                      ????????????:&nbsp;
                                      <input
                                        id="bloodLicenceNum1"
                                        value="**"
                                        onChange={(event) =>
                                          setBloodNum(event.target.value)
                                        }
                                      ></input>
                                      &nbsp;-&nbsp;
                                      <input
                                        id="bloodLicenceNum2"
                                        value="**"
                                        onChange={(event) =>
                                          setBloodNum2(event.target.value)
                                        }
                                      ></input>
                                      &nbsp;-&nbsp;
                                      <input
                                        id="bloodLicenceNum3"
                                        value="******"
                                        onChange={(event) =>
                                          setBloodNum3(event.target.value)
                                        }
                                      ></input>
                                      &nbsp;-&nbsp;
                                      <input
                                        id="bloodLicenceNum4"
                                        value="**"
                                        onChange={(event) =>
                                          setBloodNum4(event.target.value)
                                        }
                                      ></input>
                                    </td>
                                  </td>{" "}
                                </tr>

                                <tr>
                                  <td>
                                    <br></br>
                                    <button id="BoardArrow">
                                      {/* <ArrowBackIosNewIcon></ArrowBackIosNewIcon> */}
                                    </button>
                                    <span
                                      style={{
                                        marginRight: "20%",
                                        marginLeft: "20%",
                                      }}
                                    >
                                      {it.nickName}{" "}
                                      ???
                                    </span>
                                    <button id="BoardArrow">
                                      {/* <ArrowForwardIosIcon></ArrowForwardIosIcon> */}
                                    </button>
                                    <br></br>
                                    <br></br>
                                    <p id="bloodLicenceBloodType">
                                      <Box
                                      // sx={{ width: "5%", minWidth: "45%" }}
                                      >
                                        <FormControl fullWidth>
                                          <InputLabel
                                            sx={{
                                              fontFamily: "GmarketSansMedium",
                                              fontWeight: "bold",
                                            }}
                                            id="demo-simple-select-helper-label"
                                          ></InputLabel>
                                          <TextField
                                            sx={{
                                              fontFamily: "GmarketSansMedium",
                                              fontWeight: "bold",
                                            }}
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={it.bloodType}
                                            label="?????????"
                                            // onChange={(event) => setBloodType2(event.target.value)}
                                            // onChange={handleChange}
                                          ></TextField>
                                        </FormControl>
                                      </Box>
                                      &nbsp;&nbsp;
                                      <Box
                                      // sx={{ width: "5%", minWidth: "45%" }}
                                      >
                                        <FormControl fullWidth>
                                          <InputLabel
                                            sx={{
                                              fontFamily: "GmarketSansMedium",
                                              fontWeight: "bold",
                                            }}
                                            id="demo-simple-select-helper-label"
                                          ></InputLabel>
                                          <TextField
                                            sx={{
                                              fontFamily: "GmarketSansMedium",
                                              fontWeight: "bold",
                                            }}
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={it.bloodKind}
                                            label="????????????"
                                            onChange={(event) =>
                                              setBloodKind2(event.target.value)
                                            }
                                            // onChange={handleChange2}
                                          ></TextField>
                                        </FormControl>
                                      </Box>
                                    </p>
                                    <p id="bloodLicenceBloodType">
                                      <Box
                                      // sx={{ width: "5%", minWidth: "47%" }}
                                      >
                                        <FormControl fullWidth>
                                          <InputLabel
                                            sx={{
                                              fontFamily: "GmarketSansMedium",
                                              fontWeight: "bold",
                                            }}
                                            id="demo-simple-select-helper-label"
                                          ></InputLabel>
                                          <TextField
                                            sx={{
                                              fontFamily: "GmarketSansMedium",
                                              fontWeight: "bold",
                                            }}
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={it.hospital}
                                            label="????????? ???"
                                            onChange={(event) =>
                                              setHospital2(event.target.value)
                                            }
                                            // onChange={handleChange3}
                                          ></TextField>
                                        </FormControl>
                                      </Box>
                                      &nbsp;&nbsp;
                                      <Stack
                                        component="form"
                                        noValidate
                                        spacing={3}
                                      >
                                        <TextField
                                          id="date"
                                          label="????????????"
                                          type="date"
                                          value={it.bloodDate}
                                          // sx={{ width: "5%", minWidth: "155%" }}
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                          onChange={(event) =>
                                            setBloodDate(event.target.value)
                                          }
                                        />
                                      </Stack>
                                    </p>
                                    <br></br>
                                    <p id="BoardLicenceText">
                                      ????????? ????????? ???????????? ?????? ????????? ??????
                                      ???????????? ????????????<br></br>
                                      ?????? ????????? ????????? ????????? ?????? ??? ?????????
                                      ????????????.
                                    </p>
                                  </td>
                                </tr>
                              </table>
                              <br />
                            </div>
                          </div>
                        ))}
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
                        style={{ padding: "1%" }}
                        onClick={handleClose5}
                      >
                        ??????
                      </button>
                    </DialogActions>
                  </Dialog>
                </div>
              </span>
            </div>
          
          
          
          </div>
          <br />
          <br />
          <div id="chatRoom" ref={scrollRef}>

            {/* ????????? */}
            <br />
            <div id="receive">
              <label id="receiveNick">{nickName}</label>
              <br />
              <label id="receiveChat">
                {content} <br></br>
              </label>
              <br></br>
              {postYear === nowYear &&
              postMonth === nowMonth &&
              postDay === nowDay ? (
                <label id="receiveDate">
                  {postHour}:{postMinute}
                </label>
              ) : (
                <label id="receiveDate">
                  {postYear}/{postMonth}/{postDay}
                </label>
              )}
            </div>
            <br />
            {/* ????????? ???????????? */}
            {replyData.map((it) => (
              <div key={it.replykey}>
                <div>
                  {it.email === email3 ? ( //????????? ???????????? ????????? ?????? ??????
                    it.year === nowYear &&
                    it.month === nowMonth &&
                    it.day === nowDay ? (
                      <div id="receive">
                        <label id="receiveNick">{it.nickName}</label>
                        <br />
                        <label id="receiveChat">{it.replyContent}</label>
                        <br></br>{" "}
                        <label id="receiveDate">
                          {it.hour}:{it.minute}
                        </label>{" "}
                      </div>
                    ) : (
                      <div id="receive">
                        <label id="receiveNick">{it.nickName}</label>
                        <br />
                        <label id="receiveChat">{it.replyContent}</label>
                        <br></br>{" "}
                        <label id="receiveDate">
                          {it.year}/{it.month}/{it.day}
                        </label>{" "}
                      </div>
                    )
                  ) : it.replyType === "true" ? ( // ?????? ????????? ??????
                    it.year === nowYear &&
                    it.month === nowMonth &&
                    it.day === nowDay ? (
                      <div id="give">
                        {" "}
                        <label id="giveNick">{it.nickName}</label>
                        <br />
                        <label id="giveChat">{it.replyContent}</label>
                        <br></br>{" "}
                        <label id="giveDate">
                          {it.hour}:{it.minute}
                        </label>{" "}
                      </div>
                    ) : (
                      <div id="give">
                        {" "}
                        <label id="giveNick">{it.nickName}</label>
                        <br />
                        <label id="giveChat">{it.replyContent}</label>
                        <br></br>{" "}
                        <label id="giveDate">
                          {it.year}/{it.month}/{it.day}
                        </label>{" "}
                      </div>
                    )
                  ) : //???????????? ????????? ??????
                  it.year === nowYear &&
                    it.month === nowMonth &&
                    it.day === nowDay ? (
                    <div id="give">
                      {" "}
                      <label id="giveNick">{it.nickName}</label>
                      <br />
                      {/* start */}
                      <label id="giveChat2">
                        <table id="bloodLicenceTable3">
                          <tr>
                            <td id="bloodLicence">
                              <span
                                style={{
                                  fontSize: "large",
                                  fontWeight: "bold",
                                }}
                              >
                                ????????????
                              </span>{" "}
                              &nbsp;
                              <td id="bloodLicence2">
                                ????????????<br></br>
                                <input
                                  id="bloodLicenceNum1"
                                  value="**"
                                  style={{ width: "12%" }}
                                  onChange={(event) =>
                                    setBloodNum(event.target.value)
                                  }
                                ></input>
                                &nbsp;-&nbsp;
                                <input
                                  id="bloodLicenceNum2"
                                  value="**"
                                  style={{ width: "12%" }}
                                  onChange={(event) =>
                                    setBloodNum2(event.target.value)
                                  }
                                ></input>
                                &nbsp;-&nbsp;
                                <input
                                  id="bloodLicenceNum3"
                                  value="******"
                                  onChange={(event) =>
                                    setBloodNum3(event.target.value)
                                  }
                                ></input>
                                &nbsp;-&nbsp;
                                <input
                                  id="bloodLicenceNum4"
                                  value="**"
                                  style={{ width: "12%" }}
                                  onChange={(event) =>
                                    setBloodNum4(event.target.value)
                                  }
                                ></input>
                              </td>
                            </td>{" "}
                          </tr>
                          <br />
                          <tr>
                            <td>
                              {it.nickName} ???<br></br>
                              
                              <p id="bloodLicenceBloodType">
                                <Box
                                // sx={{ width: "5%", minWidth: "45%" }}
                                >
                                  <FormControl fullWidth>
                                    <InputLabel
                                      sx={{
                                        fontFamily: "GmarketSansMedium",
                                        fontWeight: "bold",
                                      }}
                                      id="demo-simple-select-helper-label"
                                    ></InputLabel>
                                    <TextField
                                      disabled
                                      sx={{
                                        fontFamily: "GmarketSansMedium",
                                        fontWeight: "bold",
                                      }}
                                      labelId="demo-simple-select-helper-label"
                                      id="demo-simple-select-helper"
                                      value={it.bloodType}
                                      label="?????????"
                                      // onChange={(event) => setBloodType2(event.target.value)}
                                      // onChange={handleChange}
                                    ></TextField>
                                  </FormControl>
                                </Box>
                                &nbsp;&nbsp;
                                <Box
                                // sx={{ width: "5%", minWidth: "45%" }}
                                >
                                  <FormControl fullWidth>
                                    <InputLabel
                                      sx={{
                                        fontFamily: "GmarketSansMedium",
                                        fontWeight: "bold",
                                      }}
                                      id="demo-simple-select-helper-label"
                                    ></InputLabel>
                                    <TextField
                                      disabled
                                      sx={{
                                        fontFamily: "GmarketSansMedium",
                                        fontWeight: "bold",
                                      }}
                                      labelId="demo-simple-select-helper-label"
                                      id="demo-simple-select-helper"
                                      value={it.bloodKind}
                                      label="????????????"
                                      onChange={(event) =>
                                        setBloodKind2(event.target.value)
                                      }
                                      // onChange={handleChange2}
                                    ></TextField>
                                  </FormControl>
                                </Box>
                              </p>
                              <p id="bloodLicenceBloodType2">
                                <span id="nonQueryType">
                                  <Box
                                  // sx={{ width: "5%", minWidth: "106%" }}
                                  >
                                    <FormControl fullWidth>
                                      <InputLabel
                                        sx={{
                                          fontFamily: "GmarketSansMedium",
                                          fontWeight: "bold",
                                        }}
                                        id="demo-simple-select-helper-label"
                                      ></InputLabel>
                                      <TextField
                                        disabled
                                        sx={{
                                          fontFamily: "GmarketSansMedium",
                                          fontWeight: "bold",
                                        }}
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={it.hospital}
                                        label="????????? ???"
                                        onChange={(event) =>
                                          setHospital2(event.target.value)
                                        }
                                        // onChange={handleChange3}
                                      ></TextField>
                                    </FormControl>
                                  </Box>
                                </span>
                                &nbsp;&nbsp;
                                <Stack component="form" noValidate spacing={3}>
                                  <TextField
                                    id="date"
                                    label="????????????"
                                    type="date"
                                    defaultValue="2022-01-01"
                                    value={it.bloodDate}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    onChange={(event) =>
                                      setBloodDate(event.target.value)
                                    }
                                  />
                                </Stack>
                              </p>
                            </td>
                          </tr>
                        </table>

                        <table id="QbloodLicenceTable3">
                          <tr>
                            <td id="bloodLicence">
                              <span
                                style={{
                                  fontSize: "large",
                                  fontWeight: "bold",
                                }}
                              >
                                ????????????
                              </span>{" "}
                              &nbsp;
                              <td id="bloodLicence2">
                                ????????????<br></br>
                                <input
                                  id="bloodLicenceNum1"
                                  value="**"
                                  style={{ width: "12%" }}
                                  onChange={(event) =>
                                    setBloodNum(event.target.value)
                                  }
                                ></input>
                                &nbsp;-&nbsp;
                                <input
                                  id="bloodLicenceNum2"
                                  value="**"
                                  style={{ width: "12%" }}
                                  onChange={(event) =>
                                    setBloodNum2(event.target.value)
                                  }
                                ></input>
                                &nbsp;-&nbsp;
                                <input
                                  id="bloodLicenceNum3"
                                  value="******"
                                  onChange={(event) =>
                                    setBloodNum3(event.target.value)
                                  }
                                ></input>
                                &nbsp;-&nbsp;
                                <input
                                  id="bloodLicenceNum4"
                                  value="**"
                                  style={{ width: "12%" }}
                                  onChange={(event) =>
                                    setBloodNum4(event.target.value)
                                  }
                                ></input>
                              </td>
                            </td>{" "}
                          </tr>
                          
                          <tr>
                            <td>
                              {it.nickName} ???<br></br><br></br>
                              
                              <p id="bloodLicenceBloodType">
                                <Box
                                // sx={{ width: "5%", minWidth: "45%" }}
                                >
                                  <FormControl fullWidth>
                                    <InputLabel
                                      sx={{
                                        fontFamily: "GmarketSansMedium",
                                        fontWeight: "bold",
                                      }}
                                      id="demo-simple-select-helper-label"
                                    ></InputLabel>
                                    <TextField
                                      disabled
                                      sx={{
                                        fontFamily: "GmarketSansMedium",
                                        fontWeight: "bold",
                                      }}
                                      labelId="demo-simple-select-helper-label"
                                      id="demo-simple-select-helper"
                                      value={it.bloodType}
                                      label="?????????"
                                      // onChange={(event) => setBloodType2(event.target.value)}
                                      // onChange={handleChange}
                                    ></TextField>
                                  </FormControl>
                                </Box>
                                &nbsp;&nbsp;
                                <Box
                                // sx={{ width: "5%", minWidth: "45%" }}
                                >
                                  <FormControl fullWidth>
                                    <InputLabel
                                      sx={{
                                        fontFamily: "GmarketSansMedium",
                                        fontWeight: "bold",
                                      }}
                                      id="demo-simple-select-helper-label"
                                    ></InputLabel>
                                    <TextField
                                      disabled
                                      sx={{
                                        fontFamily: "GmarketSansMedium",
                                        fontWeight: "bold",
                                      }}
                                      labelId="demo-simple-select-helper-label"
                                      id="demo-simple-select-helper"
                                      value={it.bloodKind}
                                      label="????????????"
                                      onChange={(event) =>
                                        setBloodKind2(event.target.value)
                                      }
                                      // onChange={handleChange2}
                                    ></TextField>
                                  </FormControl>
                                </Box>
                              </p>
                              <p id="bloodLicenceBloodType2">
                                <span id="nonQueryType">
                                  <Box
                                  // sx={{ width: "5%", minWidth: "310%" }}
                                  >
                                    <FormControl fullWidth>
                                      <InputLabel
                                        sx={{
                                          fontFamily: "GmarketSansMedium",
                                          fontWeight: "bold",
                                        }}
                                        id="demo-simple-select-helper-label"
                                      ></InputLabel>
                                      <TextField
                                        disabled
                                        sx={{
                                          fontFamily: "GmarketSansMedium",
                                          fontWeight: "bold",
                                        }}
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={it.hospital}
                                        label="????????? ???"
                                        onChange={(event) =>
                                          setHospital2(event.target.value)
                                        }
                                        // onChange={handleChange3}
                                      ></TextField>
                                    </FormControl>
                                  </Box>
                                </span>
                                &nbsp;&nbsp;
                                <Stack component="form" noValidate spacing={3}>
                                  <TextField
                                    id="date"
                                    label="????????????"
                                    type="date"
                                    defaultValue="2022-01-01"
                                    value={it.bloodDate}
                                    // sx={{ marginLeft: "34%", width: "58%" }}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    onChange={(event) =>
                                      setBloodDate(event.target.value)
                                    }
                                  />
                                </Stack>
                              </p>
                              <br></br>
                            </td>
                          </tr>
                        </table>
                      </label>
                      {/* end */}
                      <br></br>{" "}
                      <label id="giveDate">
                        {it.hour}:{it.minute}
                      </label>{" "}
                    </div>
                  ) : (
                    <div id="give">
                      {" "}
                      <label id="giveNick">{it.nickName}</label>
                      <br />
                      {/* start */}
                      <label id="giveChat2">
                        <table id="bloodLicenceTable3">
                          <tr>
                            <td id="bloodLicence">
                              <span
                                style={{
                                  fontSize: "large",
                                  fontWeight: "bold",
                                }}
                              >
                                ????????????
                              </span>{" "}
                              &nbsp;
                              <td id="bloodLicence2">
                                ????????????<br></br>
                                <input
                                  id="bloodLicenceNum1"
                                  value="**"
                                  style={{ width: "12%" }}
                                  onChange={(event) =>
                                    setBloodNum(event.target.value)
                                  }
                                ></input>
                                &nbsp;-&nbsp;
                                <input
                                  id="bloodLicenceNum2"
                                  value="**"
                                  style={{ width: "12%" }}
                                  onChange={(event) =>
                                    setBloodNum2(event.target.value)
                                  }
                                ></input>
                                &nbsp;-&nbsp;
                                <input
                                  id="bloodLicenceNum3"
                                  value="******"
                                  onChange={(event) =>
                                    setBloodNum3(event.target.value)
                                  }
                                ></input>
                                &nbsp;-&nbsp;
                                <input
                                  id="bloodLicenceNum4"
                                  value="**"
                                  style={{ width: "12%" }}
                                  onChange={(event) =>
                                    setBloodNum4(event.target.value)
                                  }
                                ></input>
                              </td>
                            </td>{" "}
                          </tr>
                          <br />
                          <tr>
                            <td>
                              {it.nickName} ???<br></br>
                              
                              <p id="bloodLicenceBloodType">
                                <Box
                                // sx={{ width: "5%", minWidth: "45%" }}
                                >
                                  <FormControl fullWidth>
                                    <InputLabel
                                      sx={{
                                        fontFamily: "GmarketSansMedium",
                                        fontWeight: "bold",
                                      }}
                                      id="demo-simple-select-helper-label"
                                    ></InputLabel>
                                    <TextField
                                      disabled
                                      sx={{
                                        fontFamily: "GmarketSansMedium",
                                        fontWeight: "bold",
                                      }}
                                      labelId="demo-simple-select-helper-label"
                                      id="demo-simple-select-helper"
                                      value={it.bloodType}
                                      label="?????????"
                                      // onChange={(event) => setBloodType2(event.target.value)}
                                      // onChange={handleChange}
                                    ></TextField>
                                  </FormControl>
                                </Box>
                                &nbsp;&nbsp;
                                <Box
                                // sx={{ width: "5%", minWidth: "45%" }}
                                >
                                  <FormControl fullWidth>
                                    <InputLabel
                                      sx={{
                                        fontFamily: "GmarketSansMedium",
                                        fontWeight: "bold",
                                      }}
                                      id="demo-simple-select-helper-label"
                                    ></InputLabel>
                                    <TextField
                                      disabled
                                      sx={{
                                        fontFamily: "GmarketSansMedium",
                                        fontWeight: "bold",
                                      }}
                                      labelId="demo-simple-select-helper-label"
                                      id="demo-simple-select-helper"
                                      value={it.bloodKind}
                                      label="????????????"
                                      onChange={(event) =>
                                        setBloodKind2(event.target.value)
                                      }
                                      // onChange={handleChange2}
                                    ></TextField>
                                  </FormControl>
                                </Box>
                              </p>
                              <p id="bloodLicenceBloodType2">
                                <span id="nonQueryType">
                                  <Box
                                  // sx={{ width: "5%", minWidth: "106%" }}
                                  >
                                    <FormControl fullWidth>
                                      <InputLabel
                                        sx={{
                                          fontFamily: "GmarketSansMedium",
                                          fontWeight: "bold",
                                        }}
                                        id="demo-simple-select-helper-label"
                                      ></InputLabel>
                                      <TextField
                                        disabled
                                        sx={{
                                          fontFamily: "GmarketSansMedium",
                                          fontWeight: "bold",
                                        }}
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={it.hospital}
                                        label="????????? ???"
                                        onChange={(event) =>
                                          setHospital2(event.target.value)
                                        }
                                        // onChange={handleChange3}
                                      ></TextField>
                                    </FormControl>
                                  </Box>
                                </span>
                                &nbsp;&nbsp;
                                <Stack component="form" noValidate spacing={3}>
                                  <TextField
                                    id="date"
                                    label="????????????"
                                    type="date"
                                    defaultValue="2022-01-01"
                                    value={it.bloodDate}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    onChange={(event) =>
                                      setBloodDate(event.target.value)
                                    }
                                  />
                                </Stack>
                              </p>
                            </td>
                          </tr>
                        </table>

                        <table id="QbloodLicenceTable3">
                          <tr>
                            <td id="bloodLicence">
                              <span
                                style={{
                                  fontSize: "large",
                                  fontWeight: "bold",
                                }}
                              >
                                ????????????
                              </span>{" "}
                              &nbsp;
                              <td id="bloodLicence2">
                                ????????????<br></br>
                                <input
                                  id="bloodLicenceNum1"
                                  value="**"
                                  style={{ width: "12%" }}
                                  onChange={(event) =>
                                    setBloodNum(event.target.value)
                                  }
                                ></input>
                                &nbsp;-&nbsp;
                                <input
                                  id="bloodLicenceNum2"
                                  value="**"
                                  style={{ width: "12%" }}
                                  onChange={(event) =>
                                    setBloodNum2(event.target.value)
                                  }
                                ></input>
                                &nbsp;-&nbsp;
                                <input
                                  id="bloodLicenceNum3"
                                  value="******"
                                  onChange={(event) =>
                                    setBloodNum3(event.target.value)
                                  }
                                ></input>
                                &nbsp;-&nbsp;
                                <input
                                  id="bloodLicenceNum4"
                                  value="**"
                                  style={{ width: "12%" }}
                                  onChange={(event) =>
                                    setBloodNum4(event.target.value)
                                  }
                                ></input>
                              </td>
                            </td>{" "}
                          </tr>
                          
                          <tr>
                            <td>
                              {it.nickName} ???<br></br><br></br>
                              
                              <p id="bloodLicenceBloodType">
                                <Box
                                // sx={{ width: "5%", minWidth: "45%" }}
                                >
                                  <FormControl fullWidth>
                                    <InputLabel
                                      sx={{
                                        fontFamily: "GmarketSansMedium",
                                        fontWeight: "bold",
                                      }}
                                      id="demo-simple-select-helper-label"
                                    ></InputLabel>
                                    <TextField
                                      disabled
                                      sx={{
                                        fontFamily: "GmarketSansMedium",
                                        fontWeight: "bold",
                                      }}
                                      labelId="demo-simple-select-helper-label"
                                      id="demo-simple-select-helper"
                                      value={it.bloodType}
                                      label="?????????"
                                      // onChange={(event) => setBloodType2(event.target.value)}
                                      // onChange={handleChange}
                                    ></TextField>
                                  </FormControl>
                                </Box>
                                &nbsp;&nbsp;
                                <Box
                                // sx={{ width: "5%", minWidth: "45%" }}
                                >
                                  <FormControl fullWidth>
                                    <InputLabel
                                      sx={{
                                        fontFamily: "GmarketSansMedium",
                                        fontWeight: "bold",
                                      }}
                                      id="demo-simple-select-helper-label"
                                    ></InputLabel>
                                    <TextField
                                      disabled
                                      sx={{
                                        fontFamily: "GmarketSansMedium",
                                        fontWeight: "bold",
                                      }}
                                      labelId="demo-simple-select-helper-label"
                                      id="demo-simple-select-helper"
                                      value={it.bloodKind}
                                      label="????????????"
                                      onChange={(event) =>
                                        setBloodKind2(event.target.value)
                                      }
                                      // onChange={handleChange2}
                                    ></TextField>
                                  </FormControl>
                                </Box>
                              </p>
                              <p id="bloodLicenceBloodType2">
                                <span id="nonQueryType">
                                  <Box
                                  // sx={{ width: "5%", minWidth: "310%" }}
                                  >
                                    <FormControl fullWidth>
                                      <InputLabel
                                        sx={{
                                          fontFamily: "GmarketSansMedium",
                                          fontWeight: "bold",
                                        }}
                                        id="demo-simple-select-helper-label"
                                      ></InputLabel>
                                      <TextField
                                        disabled
                                        sx={{
                                          fontFamily: "GmarketSansMedium",
                                          fontWeight: "bold",
                                        }}
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={it.hospital}
                                        label="????????? ???"
                                        onChange={(event) =>
                                          setHospital2(event.target.value)
                                        }
                                        // onChange={handleChange3}
                                      ></TextField>
                                    </FormControl>
                                  </Box>
                                </span>
                                &nbsp;&nbsp;
                                <Stack component="form" noValidate spacing={3}>
                                  <TextField
                                    id="date"
                                    label="????????????"
                                    type="date"
                                    defaultValue="2022-01-01"
                                    value={it.bloodDate}
                                    // sx={{ marginLeft: "34%", width: "58%" }}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    onChange={(event) =>
                                      setBloodDate(event.target.value)
                                    }
                                  />
                                </Stack>
                              </p>
                              <br></br>
                            </td>
                          </tr>
                        </table>
                      </label>
                      {/* end */}
                      <br></br>{" "}
                      <label id="giveDate">
                        {it.year}/{it.month}/{it.day}
                      </label>{" "}
                    </div>
                  )}
                </div>
                <br />
              </div>
            ))}
          </div>
          <div id="boardReply">
           
            <div id="replyRight" style={{ whiteSpace: "pre-wrap" }}>
              <textarea
                id="replyBoard"
                style={{ whiteSpace: "pre-wrap" }}
                onChange={(event) => setReplyContent(event.target.value)}
              ></textarea>
            </div>
            <div id="replySend">
              <button id="replySendBtn" onClick={replySave}>
                ?????????
              </button>
            </div>
          </div>
          <br /> <br />
        </div>
        <br></br> <br></br>
        <div align="center">
          <button className="modifyBtn" id={deleteShow} onClick={modify2}>
            ??????
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            className="deleteBtn"
            id={deleteShow}
            onClick={handleClickOpen4}
          >
            ??????
          </button>
          <Dialog
            open={open4}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose4}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle
              align="center"
              color="red"
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
                onClick={delete2}
              >
                ??????
              </button>
              <button
                id="loginBtn"
                style={{ padding: "1%", width: "30%" }}
                onClick={handleClose4}
              >
                ??????
              </button>
            </DialogActions>
          </Dialog>
        </div>
        <br /> <br />
        <br /> <br />
      </div>
    </div>
  );
}

export default BoardView;
