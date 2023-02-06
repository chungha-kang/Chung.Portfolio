/* Kakao Map Api */
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  
    
    // 지도를 생성합니다    
    var map = new kakao.maps.Map(mapContainer, mapOption); 
    
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();
    
    var address = "${detailInfo.address}";
    console.log(address);
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(address, function(result, status) {
    
        // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {
    
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    
            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });
    
            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
            });
            infowindow.open(map, marker);
    
            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
        } 
    });    

function addAddress() {
    new daum.Postcode({
        oncomplete: function(data) {
            //팝업에서 검색결과 항목을 클릭했을때 실행하는 부분
            var roadAddr = data.roadAddress; //도로명 주소 변수 //중고판매가 아닌 알바는 도로명 주소도 사용 가능
            var jibunAddr = data.jibunAddress; //지번 주소 변수 
            var bcode = data.bcode; //동 코드
            var bname = data.bname //동 이름
            //document.getElementById('member_post').value = data.zonecode; //우편번호는 X
            
            if(roadAddr !== ''){
                document.getElementById("address").value = roadAddr;
            } 
            else if(jibunAddr !== ''){
                document.getElementById("address").value = jibunAddr;
            }
            document.getElementById("addressCode").value = bcode;
            document.getElementById("addressName").value = bname;
        }
    }).open();
};