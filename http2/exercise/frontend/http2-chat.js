const chat = document.getElementById("chat");
const msgs = document.getElementById("msgs");
const presence = document.getElementById("presence-indicator");

// this will hold all the most recent messages
let allChat = [];

chat.addEventListener("submit", function (e) {
  e.preventDefault();
  postNewMsg(chat.elements.user.value, chat.elements.text.value);
  chat.elements.text.value = "";
});

async function postNewMsg(user, text) {
  const data = {
    user,
    text,
  };

  // request options
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  // send POST request
  // we're not sending any json back, but we could
  await fetch("/msgs", options);
}

async function getNewMsgs() {
 
  let reader;
  const utfDecoder = new TextDecoder('utf-8'); // set decoder

  try {
    const res = await fetch('/msgs')
    reader = res.body.getReader() // stream of data coming in
  } catch (e) {
    console.error('connection error', e)
  }
  presence.innerText = '🟢'

  let readerResponse
  let done
  do {
    try {
      // Wait until API send something new back
      readerResponse = await reader.read(); // read first one
    } catch (e) {
      console.error('reader fail', e)
      presence.innerText = '🔴'
      return
    }

    const chunk = utfDecoder.decode(readerResponse.value, { stream: true })
    const done = readerResponse.done
    // console.log(chunk)
    
    // Sometimes `chunk` is empty
    if (chunk) {
      try {
        const json = JSON.parse(chunk)
        allChat = json.msg;
        render()
      } catch (e) {
        console.error('parse error', e)
      }
    }

  } while (!done)

  presence.innerText = '🔴'
}

function render() {
  const html = allChat.map(({ user, text, time, id }) =>
    template(user, text, time, id)
  );
  msgs.innerHTML = html.join("\n");
}

const template = (user, msg) =>
  `<li class="collection-item"><span class="badge">${user}</span>${msg}</li>`;

getNewMsgs();
