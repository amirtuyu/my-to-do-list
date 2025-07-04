const input = document.querySelector("#input");
const list = document.querySelector("#ul");
let arrayRepository = [];
getLiForSave();
showLiToRepository();
changSetingText();

document.body.addEventListener("click", (event) => {
  closeLi();
  openAndCloseTextarea();
  changLi();
  changText();
  animationShowText();
  EditText();
});

document.body.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("Text")) {
    let LiTarget = event.target.previousElementSibling;
    let IdLiTarget = LiTarget.getAttribute("id");
    let Timer = event.target.querySelector(".Timer");
    let DateOfBirth = getPropertiUser("DateOfBirth", IdLiTarget);
    Timer.innerText = 10;
    DateNew = Math.floor(new Date() / 1000);
    const Time = TimeCalculation(DateOfBirth, DateNew);
    Timer.innerText = Time;
  }
});

function showLiToRepository() {
  for (let Li of arrayRepository) {
    if (Li.textarea == 0) {
      list.innerHTML += `<li id="${Li.id}">${Li.liname}<span class="material-symbols-outlined addtext">add</span><span class="material-symbols-outlined closeBtn">delete</span></li>`;
    } else {
      list.innerHTML += `<li id="${Li.id}">${Li.liname}<span class="material-symbols-outlined Icon-animation-Text">chevron_right</span><span class="material-symbols-outlined closeBtn">delete</span></li>`;
      changTargetText();
      function changTargetText() {
       let elementIcon =createElement('span',"material-symbols-outlined","icon-edit","edit","","")
        let elementContainerIcon =createElement("div","show-icon","","",elementIcon,"")
        let elementDivShowTimer =createElement("div","Timer","",'0seconds',"","")
        let containerTimerAndIconEdite = createElement("div","containerTimerAndIconEdite","","",elementDivShowTimer,elementContainerIcon);
        let elementDivShowText = createElement("div","show-Text","",Li.textarea,"","")
        let elementSpan = createElement("span", "Text","","",containerTimerAndIconEdite,elementDivShowText);
        list.appendChild(elementSpan);
      }
    }
  }
}
function saveRepository() {
  localStorage.setItem("Li", JSON.stringify(arrayRepository));
}
function getLiForSave() {
  strLocal = localStorage.getItem("Li");
  if (strLocal) {
    const parsed = JSON.parse(strLocal);
    if (Array.isArray(parsed)) {
      arrayRepository.push(...parsed);
    }
  }
}
function closeLi() {
  if (event.target.classList.contains("closeBtn")) {
    let liTargetRemov = event.target.parentElement;
    removeToShowing();
    removeToRepository();
    function removeToRepository() {
      let IDLiShowing = liTargetRemov.getAttribute("id");
      arrayRepository = arrayRepository.filter((obj) => {
        return obj.id != IDLiShowing;
      });
      saveRepository();
    }
    function removeToShowing() {
      if (
        liTargetRemov.nextElementSibling &&
        liTargetRemov.nextElementSibling.classList.contains("Text")
      ) {
        liTargetRemov.nextElementSibling.remove();
      }
      if (
        liTargetRemov.nextElementSibling &&
        liTargetRemov.nextElementSibling.classList.contains("textarea")
      ) {
        liTargetRemov.nextElementSibling.remove();
      }
      if (
        liTargetRemov.nextElementSibling &&
        liTargetRemov.nextElementSibling.classList.contains("buttonChangText")
      ) {
        liTargetRemov.nextElementSibling.remove();
      }
      liTargetRemov.remove();
    }
  }
}
function openAndCloseTextarea() {
  if (event.target.classList.contains("addtext")) {
    let liTarget = event.target.parentElement;
    addAndRemovTextarea();
    function addAndRemovTextarea() {
      if (
        liTarget.nextElementSibling &&
        liTarget.nextElementSibling.classList.contains("textarea")
      ) {
        liTarget.nextElementSibling.remove();
        event.target.innerText = "add";
        buttonChangText();
      } else {
        let textarea = document.createElement("textarea");
        textarea.placeholder = "Title...";
        textarea.classList.add("textarea");
        liTarget.parentElement.insertBefore(textarea, liTarget.nextSibling);
        event.target.innerText = "close";
        buttonChangText();
      }
    }
    function buttonChangText() {
      let TextareaExist =
        liTarget.nextElementSibling &&
        liTarget.nextElementSibling.classList.contains("textarea");
      let buttonExist =
        liTarget.nextElementSibling &&
        liTarget.nextElementSibling.nextElementSibling &&
        liTarget.nextElementSibling.nextElementSibling.classList.contains(
          "buttonChangText"
        );

      if (TextareaExist) {
        if (!buttonExist) {
          let buttonChangText = document.createElement("button");
          buttonChangText.classList.add("buttonChangText");
          buttonChangText.textContent = "ChangText";
          liTarget.parentElement.insertBefore(
            buttonChangText,
            liTarget.nextSibling.nextSibling
          );
        }
      } else {
        let btnChangtext = liTarget.nextElementSibling;
        if (
          btnChangtext &&
          btnChangtext.classList.contains("buttonChangText")
        ) {
          btnChangtext.remove();
        }
      }
    }
  }
}
function changLi() {
  if (event.target.classList.contains("button-Add") && input.value != 0) {
    let IdRandom = Math.random() + Date.now().toString();
    let obj1 = new prsontodolist(IdRandom, input.value, "", true, "");
    arrayRepository.push(obj1);
    saveRepository();
    let text = input.value;
    list.innerHTML += `<li id="${IdRandom}">${text}<span class="material-symbols-outlined addtext">add</span><span class="material-symbols-outlined closeBtn">delete</span></li>`;
    input.value = "";
  } else {
    shakingTextarea();
    function shakingTextarea() {
      if (event.target.classList.contains("button-Add") && input.value == 0) {
        input.classList.remove("shaking");

        void input.offsetWidth;

        input.classList.add("shaking");
      }
    }
  }
}
function changText() {
  if (event.target.classList.contains("buttonChangText")) {
    let LiTarget = event.target.previousElementSibling.previousElementSibling;
    let TextTarget = LiTarget.nextElementSibling.value;

    if (TextTarget != 0) {
      LiTarget.nextElementSibling.remove();
      LiTarget.nextElementSibling.remove();

      changTargetText();
      function changTargetText() {
        let elementIcon =createElement('span',"material-symbols-outlined","icon-edit","edit","","")
        let elementContainerIcon =createElement("div","show-icon","","",elementIcon,"")
        let elementDivShowTimer =createElement("div","Timer","",'0seconds',"","")
        let containerTimerAndIconEdite = createElement("div","containerTimerAndIconEdite","","",elementDivShowTimer,elementContainerIcon);
        let elementDivShowText = createElement("div","show-Text","",TextTarget,"","")
        let elementSpan = createElement("span", "Text","","",containerTimerAndIconEdite,elementDivShowText);
        LiTarget.parentElement.insertBefore(elementSpan, LiTarget.nextSibling);
        gsap.fromTo(
          elementSpan,
          { height: 0, opacity: 0 },
          {
            height: elementSpan.scrollHeight,
            opacity: 1,
            duration: 0.2,
            ease: "power2.out",
          }
        );
      }
      SaveTextToRepository();
      function SaveTextToRepository() {
        const idLi = LiTarget.getAttribute("id");
        let DateOfBirth = Math.floor(new Date() / 1000);
        for (let Li of arrayRepository) {
          if (Li.id == idLi) {
            Li.textarea = TextTarget;
            Li.DateOfBirth = DateOfBirth;
          }
        }
        saveRepository();
      }
      changIcone();
      function changIcone() {
        LiTarget.querySelector(".addtext").innerHTML = "chevron_right";
        LiTarget.querySelector(".addtext").classList.add("Icon-animation-Text");
        LiTarget.querySelector(".addtext").classList.remove("addtext");
      }
    } else {
      shakingTextarea();
      function shakingTextarea() {
        LiTarget.nextElementSibling.classList.remove("shaking");

        void LiTarget.nextElementSibling.offsetWidth;

        LiTarget.nextElementSibling.classList.add("shaking");
      }
    }
  }
}
function animationShowText() {
  if (event.target.classList.contains("Icon-animation-Text")) {
    const LiTarget = event.target.parentElement;
    event.target.classList.toggle("aktive-icon-Text");
    const TextTarget = LiTarget.nextElementSibling;
    let idLi = LiTarget.getAttribute("id");
    isOpen = getPropertiUser("flaganimation", idLi);
    if (isOpen) {
      gsap.to(TextTarget, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(TextTarget, {
        height: TextTarget.scrollHeight,
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
    if (isOpen === true) {
      changValueToRipositoer("flaganimation", false, idLi);
    } else if (isOpen === false) {
      changValueToRipositoer("flaganimation", true, idLi);
    }
  }
}
function getPropertiUser(keyobj, userid) {
  let arrayRepository1 = [];
  let strLocal = localStorage.getItem("Li");
  if (strLocal) {
    const parsed = JSON.parse(strLocal);
    if (Array.isArray(parsed)) {
      arrayRepository1.push(...parsed);
    }
  }
  let userTarget = arrayRepository1.find((user) => user.id == userid);
  return userTarget[keyobj];
}

function changValueToRipositoer(keyobj, value, userid) {
  let arrayRepository3 = [];
  let strLocal = localStorage.getItem("Li");
  if (strLocal) {
    const parsed = JSON.parse(strLocal);
    if (Array.isArray(parsed)) {
      arrayRepository3.push(...parsed);
    }
  }
  for (let obj of arrayRepository3) {
    if (obj.id == userid) {
      obj[keyobj] = value;
    }
  }
  localStorage.setItem("Li", JSON.stringify(arrayRepository3));
}

function changSetingText() {
  let TextTarget = document.querySelectorAll(".Text");
  for (let element of TextTarget) {
    gsap.to(element, {
      height: 0,
      opacity: 0,
      duration: 0,
      ease: "power2.inOut",
    });
  }
  for (let element of arrayRepository) {
    element.flaganimation = false;
  }
  saveRepository();
}
function EditText() {
  if (event.target.classList.contains("icon-edit")) {
    let valueText =
      event.target.parentElement.parentElement.nextSibling.innerText;
    console.log(valueText);
    let LiTarget =
      event.target.parentElement.parentElement.parentElement
        .previousElementSibling;
    LiTarget.nextElementSibling.remove();
    changTextarea(LiTarget, valueText);
  }
}
function changTextarea(LiTarget, value) {
  let textarea = document.createElement("textarea");
  textarea.innerText = value;
  textarea.placeholder = "Title...";
  textarea.classList.add("textarea");
  LiTarget.parentElement.insertBefore(textarea, LiTarget.nextSibling);

  let buttonChangText = document.createElement("button");
  buttonChangText.classList.add("buttonChangText");
  buttonChangText.textContent = "ChangText";
  LiTarget.parentElement.insertBefore(
    buttonChangText,
    LiTarget.nextSibling.nextSibling
  );
}
function TimeCalculation(DateOfBirth, DateNew) {
  let secondsTime = DateNew - DateOfBirth;

  if (secondsTime >= 0 && secondsTime < 60) {
    return secondsTime + "seconds";
  } else if (secondsTime >= 60 && secondsTime < 3600) {
    return Math.floor(secondsTime / 60) + "minutes";
  } else if (secondsTime >= 3600 && secondsTime < 86400) {
    return Math.floor(secondsTime / 3600) + "hours";
  } else if (secondsTime >= 86400 && secondsTime < 2592000) {
    return Math.floor(secondsTime / 86400) + "days";
  } else if (secondsTime >= 2592000 && secondsTime < 31536000) {
    return Math.floor(secondsTime / 2592000) + "months";
  } else if (secondsTime >= 31536000) {
    return Math.floor(secondsTime / 31536000) + "years";
  }
}
function createElement(typeOfElement, classOfElement1,classOfElement2, valueOfInner,appendChild1,appendChild2) {
  let element = document.createElement(typeOfElement);
  if (classOfElement1) {
    element.classList.add(classOfElement1);
  }
    if (classOfElement2) {
    element.classList.add(classOfElement2);
  }
  if (valueOfInner) {
    element.innerHTML = valueOfInner;
  }
  if(appendChild1){
    element.appendChild(appendChild1)
  }
   if(appendChild2){
    element.appendChild(appendChild2)
  }
  return element;
}
class prsontodolist {
  constructor(id, liname, textarea, flaganimation, DateOfBirth) {
    this.id = id;
    this.liname = liname;
    this.textarea = textarea;
    this.flaganimation = flaganimation;
    this.DateOfBirth = DateOfBirth;
  }
}
