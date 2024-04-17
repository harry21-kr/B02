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
            </tr>`;
  $("#subscribersList").append(temp_html);
});
