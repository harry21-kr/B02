import { initFirebase } from "./utils/initFirebase.js";
import { collection, addDoc } from "./imports.js";

//파이어베이스 DB에 연결하는 코드
const db = initFirebase();

//구독하기 양식(form안의 input)에서 구독자 이름과 이메일을 입력받아서 DB의 DOC(subscribers)에 추가하는 함수
export async function createSubscriber(event) {
  //form태그 submit이벤트 방지
  event.preventDefault();
  //구독하기 인풋으로 입력받은 값을 각 변수에 저장(앞,뒤 공백 제거)
  const subname = $(".subname").val().trim();
  const subemail = $(".subemail").val().trim();

  //이메일 양식 검증 정규표현식
  let email_regexp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  //이름을 입력하지 않았을경우 경고창("이름을 입력해주세요")띄워주는 조건문
  if (!subname) {
    return alert("이름을 입력해주세요");
  }
  //유저가 입력한 이메일 양식이 정규표현식과 일치하지 않을경우 alert을 띄워주는 조건문
  else if (!email_regexp.test(subemail)) {
    return alert("올바른 이메일 주소를 입력해주세요");
  }
  //db의 DOC(subscribers)에 {name:입력받은 이름 값,email:입력받은 이메일 값}형태의 데이터 삽입
  await addDoc(collection(db, "subscribers"), {
    userName: subname,
    userEmail: subemail,
  });
  // 데이터 입력후 구독 alert창 띄우고 새로고침
  alert("구독 완료!");
  window.location.reload();
}
//구독하기 form안의 button에 Subscribe이벤트 추가
$(".submitbtn").click(createSubscriber);
