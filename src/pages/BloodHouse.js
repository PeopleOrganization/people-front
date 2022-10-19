//구글맵키 AIzaSyBIgZoVqTFMhUuZj2l0bFRkQsPoXWRVFI0
import { useCallback, useEffect, useRef, useState } from "react";


function BloodHouse(props) {
  const mapElement = useRef(null);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(position) {
    console.log("위도 : " + position.coords.latitude);
    console.log("경도: " + position.coords.longitude);
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  function error(err) {
    console.warn("ERROR(" + err.code + "): " + err.message);
  }

  // 컴포넌트가 마운트될 때, 수동으로 스크립트를 넣어줍니다.
  // ﻿이는 script가 실행되기 이전에 window.initMap이 먼저 선언되어야 하기 때문입니다.
  const loadScript = useCallback((url) => {
    const firstScript = window.document.getElementsByTagName("script")[0];
    const newScript = window.document.createElement("script");
    newScript.src = url;
    newScript.async = true;
    newScript.defer = true;
    firstScript?.parentNode?.insertBefore(newScript, firstScript);
  }, []);

  // script에서 google map api를 가져온 후에 실행될 callback 함수
  const initMap = useCallback(() => {
    const { google } = window;
    if (!mapElement.current || !google) return;

    const location = { lat: latitude, lng: longitude };
    const map = new google.maps.Map(mapElement.current, {
      zoom: 17,
      center: location,
    });
    new google.maps.Marker({
      position: location,
      map,
    });
  }, []);

  useEffect(() => {
    const script = window.document.getElementsByTagName("script")[0];
    const includeCheck = script.src.startsWith(
      "https://maps.googleapis.com/maps/api"
    );

    // script 중복 호출 방지
    if (includeCheck) return initMap();

    window.initMap = initMap;
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIgZoVqTFMhUuZj2l0bFRkQsPoXWRVFI0&callback=initMap&language=en"
    );

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [initMap, loadScript]);



  return (
    <div className="centerContainer">
      <div className="container">
        <div className="sidebar">
          <div className="sidebarWrapper">
            <div className="sidebarMenu">
              <h1 className="sidebarTitle">지도</h1>
              <ui className="sidebarCircle">
                <ul className="sidebarList">
                  <a className="href" href="BloodHouse">
                    {" "}
                    <li className="sidebarListItem active">헌혈의집</li>
                  </a>
                  &nbsp;
                  <a className="href" href="BloodCafe">
                    <li className="sidebarListItem">헌혈카페</li>
                  </a>
                  &nbsp;
                  <a className="href" href="BloodBank">
                    <li className="sidebarListItem">혈액원</li>
                  </a>
                  &nbsp;
                  <a className="href" href="BloodHospital">
                    <li className="sidebarListItem">지정병원</li>
                  </a>
                </ul>
              </ui>
            </div>
          </div>
        </div>
        <div className="others"><div ref={mapElement} style={{ minHeight: "400px" }} /></div>
      </div>
    </div>
  );
}

export default BloodHouse;
