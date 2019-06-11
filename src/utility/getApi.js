import axios from "axios";

function transformArrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  for (var len = bytes.byteLength, i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export function getUser(uid) {
  return new Promise((resolve, reject) => {
    axios
      .get("/user/" + uid)
      .then(res => {
        // console.log(res);
        let user = {};
        if (res.data && res.data.data) {
          user = res.data.data;
          resolve(user);
        } else {
          reject();
        }
      })
      .catch(() => {
        reject();
      });
  });
}
export function getAvatar(avatarId) {
  return new Promise((resolve, reject) => {
    axios
      .get("/getoneimage/id/" + avatarId)
      .then(res2 => {
        //   console.log(res2);
        // let user = res.data.data;
        // console.log(let user.avatar.toString());
        if (res2.data && res2.data.img) {
          let newsrc =
            "data:image/jpeg;base64," +
            transformArrayBufferToBase64(res2.data.img.data.data);
          resolve(newsrc);
        } else {
          // let $message.
          reject();
        }
        // });
      })
      .catch(() => {
        reject();
      });
  });
}

export function getAvatarByUid(uid) {
  return new Promise((resolve, reject) => {
    getUser(uid)
      .then(user => getAvatar(user.avatar))
      .then(image => resolve(image))
      .catch(() => reject());
  });
}
export function getListsByUid(uid) {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/lists/" + uid)
      .then(res => {
        //   console.log(res2);

        if (res.data.status === 1 && res.data.msg == "拉取文集成功") {
          resolve(res.data.data);
        } else {
          reject();
        }
      })
      .catch(() => {
        reject();
      });
  });
}
