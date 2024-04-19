import { deleteDoc, doc } from "./imports.js";
import { initFirebase } from "./utils/initFirebase.js";

// 구독자의 id를 받아와 그 구독자의 정보를 삭제시키는 함수
export async function deleteSubscriber(id) {
  // initFirebase() 함수를 실행
  const db = initFirebase();

  // 만약 confirm 창에서 예(true를 반환)를 선택하면
  if (confirm("정말 구독을 취소하시겠습니까?")) {
    // 받아온 구독자의 id를 deleteDoc() 인자로 사용
    await deleteDoc(doc(db, "subscribers", id));

    // 구독 취소된 거 알려주고
    alert("구독이 취소되었습니다.");

    // 새로고침
    window.location.reload();
  }
}
