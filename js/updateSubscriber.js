import { initFirebase } from "./utils/initFirebase.js";
import { updateDoc, doc } from "./imports.js";
//파이어베이스 DB에 연결하는 코드

//id를 전달받고, DB의 데이터를 id값으로 찾아서 기존 이름과 이메일을 입력받은 이름, 이메일 값으로 업데이트 하는 함수
export async function updateSubscriber(id) {
  const db = initFirebase();
  //prompt에서 변경할 닉네임을 입력받아 변수에 저장(앞,뒤 띄어쓰기 제거)
  let new_name = prompt("닉네임").trim();

  //입력값이 없을경우 alert후, prompt창을 반복적으로 띄우는 코드
  if (!new_name) {
    do {
      alert("이름을 입력해주세요.");
      new_name = prompt("닉네임").trim();
    } while (!new_name);
  }

  //prompt에서 변경할 이메일을 입력받아 변수에 저장(앞,뒤 띄어쓰기 제거)
  let new_email = prompt("이메일").trim();
  //이메일 양식이 올바른지 확인할 때 사용하는 정규표현식
  const email_regexp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  //입력받은 이메일주소를 정규표현식으로 검증후 틀렸을경우 반복해서 prompt로 값을 입력받는 코드
  if (!email_regexp.test(new_email)) {
    do {
      alert("올바른 이메일 주소를 입력해주세요.");
      new_email = prompt("이메일").trim();
    } while (!new_email);
  }

  //DB의 DOC("subscriber")의 데이터를 찾아 입력받은 이름과 이메일로 수정하는 코드, 완료 후 alert 띄우고 reload
  await updateDoc(doc(db, "subscribers", id), {
    userEmail: new_email,
    userName: new_name,
  });
  alert("수정 완료!");
  window.location.reload();
}
