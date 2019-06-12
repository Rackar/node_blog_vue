import axios from "axios";
let defaultEmptyImageDate =
  "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAFACAYAAADNkKWqAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAxKSURBVHja7N1/yK51fcDx91lqO/gD1hD0TLH5i+JkyZmZpzxiKNpU7HDYJKduOlabZLNtxCLJDc0WtLEih9RgCiaIDXFD3RBlkU374cSlEmjJpLAg6I/yIDjH2R/Xd2Uz8xzP8zznvp/r9YIb/OOo9/35PM/73D+u+7o27Nq1K4A5+iUjAAQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEBBBBAAAEEEEAAAQQQQAABBFhy+xnBYnr4a19Z5rt/ZHVsdXR1VHVEdXh1aPW66pDqwOqA8eefr3ZWP6p+WP2g+l713erp6qnqW9V3lnUgW04+xQ+1ALIOHVCdVG2pTqxOqDaPwO2uXx63X61+/WX+zM7q8erR6pHq4eqhEU8QQNbMpuq06tRq64jfajuwOnncfvJEuXqw+nL1peoZq0EAWQ0HVWdVZ1ZnVMcvwivLcXt/9UR1X3VvdU/1rJUhgOytN1XnVedU2xb4fh4/bpdX91d3V3dWj1khAsieenu1o9peHbNk933buP1BdUd1e/WAlSKAvJK3Ve+pLmh6r2+ZHVP9WXVhdVt1a/VVK0YA+f+Oqy6pLmo6fGU92VR9sDq/uqW6uXrSyhFA9qsuG7et6/yxHl19tOmDnBvH7QU/AgLIPG2t3lddOsPHvbXpfc7PNR1Kwwz5Ktx8XV59dobxe7FLxwwu9+PgGSDzcFz1geqKaoNxdEL1d9Ubq8/kvUEBZN06s+nDgHON4mdsGH8pHF19qulgarwEZh25uPob8fuFzh0zutgoBJD148rqk9WbjeIVvXnM6kqj8BKY5X9pd1X1kWqjcey2w6q/qg6urqt2GYkAsny7vbrpuDf23Mbq2qbTfV2T4wW9BGapnvmJ38r46JilT8wFkCVxlfiteASvMgYBZPFd2fSeHyvrI/lgRABZaBdXH84HHqth45itQ2QEkAV0ZvWhpk8wWR2HjRmfaRQCyOI4rukbHo7zW31vHrM+zigEkMXwgXzDYy2dO2aOALKPXd50YgPW1hU5i4wAsk9tHb+EjlFbexvG7LcahQCy9vZrOpnpCUaxz5wwduAbVQLIGruseZ/MdFFcOnaBALJGjvNLt3B/GflUWABZI5fkvadFsnXsBAFklb2t6dKVLJaLxm4QQFbRe1p/1+1dD44eu0EAWSVvry4whoV1wdgRAsgq2FFtMoaFtWnsCAFkhb2p2m4MC2/72BUCyAo6rzrGGBbeMWNXCCAr5KDqHGNYGueMnSGArICzqm3GsDS2jZ0hgKwAJ+C0MwRwljZVZxjD0jkjn9gLIHvttOp4Y1g6x4/dIYDshVONwO4QwDk6ICc9WGZbxw4RQF6Fk6otxrC0towdIoC8yl8g7BABnKUTjcAOEcC5cr0PO0QAZ+nIarMxLL3NY5cIIHvg2OpAY1h6B45dIoDsAWd9tksEcLaOMgK7RADn6ggjsEsEcK4ONwK7RADn6lAjsEsEcK5eZwR2iQDO1SFGYJcI4Fw5BtAuEcDZcholu0QAAQRwbp43ArtEAOdqpxHYJQI4Vz8yArtEAOfqh0ZglwjgXP3ACOwSAZyr7xmBXSKAc/VdI7BLBHCunjYCu0QA5+opI7BLBHCuvpXjx9aDnWOXCCB74DvV48aw9B4fu0QA2UOPGoEdIoBz9YgR2CECOFcPG4EdIoBz9ZBfoKWP30PGIIC8Os9XDxrD0nowp8ISQPbKl43A7hDAufpS9YQxLJ0nxu4QQPbCM9V9xrB07hu7QwDZS/cagZ0hgHN1T3W/MSyN+8fOEEBWwLPV3cawNO4eO0MAWSF3Vt82hoX37bErBJAV9Fh1hzEsvDvGrhBAVtjt+WRxkT0zdoQAsgoeqG4zhoV129gRAsgquTVnGF5ET43dIICsoq9WtxjDwrll7AYBZJXdnJMkLJIHx04QQNbAk9WNxrAwbhw7QQBZw1+6m4xhn7vJX0YCyNp7ofpcrjmxLz06dvCCUQgga+/B6oZql1GsuV1j9t6LFUD2oRuq641hzV0/Zo8Aso99prrLGNbMXWPmCCAL4MnqU9U3jGLVfWPM2qe+AsgCubf6ZPV9o1g13x8zdrJTAWQBfb76RPWcUay458ZsP28UAsji+nT1cWNYcR8fs0UAWXDXVdcaw4q5dswUAWQJ7KquEcEVi981OdZyXdrPCNatF6q/qJ6vPlJtNJI98tx42Xud+Akgy/tM8GPVj6sPV4cZyW75ftMHHt7z8xKYdeDT1YdynODu+MaYlfh5Bsg68vnxzOaD1bnG8XPd1XSQs+P8BJB16N7q6abTt19RbTCSn7xVcH3T19t8w0MAWceerP64+mZ1eXXCzOfxaNNJDZzYQACZkRuqR6r3VZfOdAY3NZ3PzymtBJAZerD6etOlHC+rts7ocd84bk5mKoDM2AvV31dfrC6pLqqOXqeP9ammq7fdnPf6EEBe5Mnq6qZPQt9TXVBtWieP7Zmmi5bfmktXIoD8Al8dty9UO6rt1TFL+li+Xd1R3T5e5oMAslseGLebqvOqc6ptS3Lf76/uru6sHrNKBJBX67Fxu746qzqzOqM6fsHu5xPVfU3HOt5TPWt1CCAr5dnxUvL2pvcGT6tObfrkeMs+uk8PN32i++XqS03v9YEAsqqeafpA4dbqgOqkEcETmw6s3lwduML/z53V400HLj8y4vdQ09luQADZJ57vp+8X/p8jq2ObDqc5qjqiOrw6tHpddcgI5AEv+m/srH5U/bD6QfW96rv99Kt736q+Y9yspA27djnVGTBPTocFCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgggwGpzTZB14OGvfWXR7tLrq+OaLqj++l56TZCDq43V/tV/V89VP+6l1wP5r6aLmz85/nlhbDn5FD94AghV/Ub11qYrw72l6cpwG3fz391/3A6pfu1l/sxzTVeD+8+mq8F9vfoPY0cA2Rf2r97ZdG3gbdU7qtes4v9vY3XyuFX9T/Xv1f1N1wP+t/FMEgSQVXNi9ZvVWdXp+/B+vGbE97TqquqL1T3VvzRdMxgEkBXzrurd1fnVpgW8f6eP2xXVP1f/VP2rtSGA7I1zqwuq327339PblzZVf1T9XvWF6rbqLmtEANkT76guqS6qDlrC+7+x+t1qR3VLdXPTe4YggLysw6vfry5rOoRl2R1U/WF1ZnVj9Q9Nh9iAAPIzzhuxOG8dPrZjqo9Vp1Sfre60bgSQqgObPjx4f3XkDCL/lmpzdX210/oFkPl6Y/Un1Xtn9JiPrD4xnhX+bfVNPwbz5bvA83V69dczi9+LvXc8/tP9KAgg83L+eBZ0zszncM6Yw/l+JLwEZh5+q7q66fu61NuaPiA5oPpH4/AMkPVrR/WX4vcSJ4y57DAKAWR9Orvpe7ObjeLn2jzmc7ZRCCDry0nVnzedroqXt2XM6SSjEEDWh8OqP206fRWv7J1jXocZhQCy/D5QXWgMe+TCMTcEkCV2kV/kvfqL4yJjEECW0xuavtt7sFG8KgeP+b3BKASQ5XNZ0+nqefW2jTkigCyRs/3iruhfJA6NEUCWyO80XYKSvXfomCcCyBJ4dz71XWkXjrkigCy4HU2XrWTl7J+vyQkgC++0arsxrIrtY74IIAvqXdUhxrAqDhnzRQBZQL+STytX29ljzgggC/jy18kOVtcWL4MFkMV0qhGYMwI4V6cYgTkjgHP0xuqtxrAm3jrmjQCyIDZXrzWGNfHanFVbAFkoXzAC80YAAQQQQAABBBBAAAEEEBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBAQQCMABBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAF+1oZdu3aZAuAZIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAAC7KH/HQArGKiO/LoY5gAAAABJRU5ErkJggg==";
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
          resolve(defaultEmptyImageDate);
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
