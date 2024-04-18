import { initFirebase } from "./utils/initFirebase.js";
import { updateDoc, doc } from "./imports.js";
//파이어베이스 DB에 연결하는 코드
const db = initFirebase();

//id를 전달받고, DB의 데이터를 id값으로 찾아서 기존 이름과 이메일을 입력받은 이름, 이메일 값으로 업데이트 하는 함수
export async function updateSubscriber(id) {
  //prompt창에 기존 닉네임과 이메일을 기본값으로 담아주고 변경할 닉네임과 이메일을 입력받아 각 변수에 저장(앞,뒤 띄어쓰기 제거)
  const new_name = prompt("닉네임").trim();
  const new_email = prompt("이메일").trim();

  //이메일 양식이 올바른지 확인할 때 사용하는 정규표현식
  const email_regexp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  //입력받은 이름이 없을 경우 alert창 띄우는 조건문
  if (!new_name) {
    alert("이름을 입력해주세요.");
    window.location.reload();
  }
  //입력받은 이메일이 없을 경우 alert창 띄우는 조건문
  else if (!new_email) {
    alert("이메일 주소를 입력해주세요.");
    window.location.reload();
  }
  //유저가 입력한 이메일 양식이 정규표현식과 일치하지 않을경우("올바른 이메일 주소를 입력해주세요") 경고창을 띄워주는 조건문
  else if (!email_regexp.test(new_email)) {
    alert("올바른 이메일 주소를 입력해주세요.");
    window.location.reload();
  }
  //DB의 DOC("subscriber")의 데이터를 찾아 입력받은 이름과 이메일로 수정하는 코드, 완료 후 수정완료! 창 띄우고 새로고침하는 코드
  else {
    await updateDoc(doc(db, "subscribers", id), {
      userEmail: new_email,
      userName: new_name,
    });
    alert("수정 완료!");
    window.location.reload();
  }
}
