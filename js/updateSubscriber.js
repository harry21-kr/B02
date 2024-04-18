import { initFirebase } from "./utils/initFirebase.js";
import { updateDoc, doc } from "./imports.js";
//파이어베이스 DB에 연결하는 코드
const db = initFirebase();

export async function updateSubscriber(event) {
  //update버튼의 id에서 "update"단어 삭제하고 id값만 담는 코드
  let id = $(event.target)[0].id.replace("update", "");

  //기존 구독자의 이름과 이메일을 변수에 저장
  let target_name = $(event.target).parent().siblings()[0].innerHTML;
  let target_email = $(event.target).parent().siblings()[1].innerHTML;

  //prompt창에 기존 닉네임과 이메일을 기본값으로 담아주고 변경할 닉네임과 이메일을 입력받아 각 변수에 저장(앞,뒤 띄어쓰기 제거)
  let new_name = prompt("닉네임", target_name).trim();
  let new_email = prompt("이메일", target_email).trim();

  //이메일 양식이 올바른지 확인할 때 사용하는 정규표현식
  let email_regexp =
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
    await updateDoc(doc(db, "profile", id), {
      name: new_name,
      email: new_email,
    });
    alert("수정 완료!");
    window.location.reload();
  }
}
