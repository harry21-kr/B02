import { deleteSubscriber } from "./deleteSubscriber.js";
import { updateSubscriber } from "./updateSubscriber.js";
import { collection, getDocs } from "./imports.js";
import { initFirebase } from "./utils/initFirebase.js";

// initFirebase() 함수를 실행
const db = initFirebase();

// Firebase DB의 subscribers collection을 가져옴
const subscribersCollection = collection(db, "subscribers");

// Firebase DB의 subscribers collection의 Docs를 가져옴
const subscribersSnapshot = await getDocs(subscribersCollection);

// subscribersSnapshot.forEach() 메소드로 가져온 Docs를 data() 함수를 통해 변환 후,
// 제이쿼리를 활용해 id가 subscribersList인 태그에 추가
subscribersSnapshot.forEach((doc) => {
  const data = doc.data();
  const userName = data.userName;
  const userEmail = data.userEmail;

  const temp_html = `
            <tr>
                <td>${userName}</td>
                <td>${userEmail}</td>
                <td><button id="updateBtn${doc.id}" class="button">정보 변경</button></td>
                <td><button id="deleteBtn${doc.id}" class="button">구독 취소</button></td>
            </tr>`;

  // 불러온 구독자 정보를 id가 subscribersList인 태그에 append
  $("#subscribersList").append(temp_html);

  // 생성한 버튼 id에 템플릿 리터럴을 이용해 doc.id를 추가, 클릭할 시 updateSubscriber() 함수 인자에 doc.id를 넣어 실행
  $(`#updateBtn${doc.id}`).click(() => updateSubscriber(doc.id));

  // 생성한 버튼 id에 템플릿 리터럴을 이용해 doc.id를 추가, 클릭할 시 deleteSubscriber() 함수 인자에 doc.id를 넣어 실행
  $(`#deleteBtn${doc.id}`).click(() => deleteSubscriber(doc.id));
});
