require("dotenv").config();
const fetch = require("node-fetch");

const channel_id = process.env.channel_id;
const apiKey = process.env.apiKey;
const templateID = process.env.templateID;
const automationsTemplateID = process.env.automationsTemplateID;

async function encryptMessage(originalMessage) {
    const morseOptions = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    };

      const morseEndpoint = "https://api.funtranslations.com/translate/morse.json?text="+originalMessage

      const morseResponse = await fetch(morseEndpoint, morseOptions);
      const morseResponseJSON = await morseResponse.json();
    const encryptedMessage = morseResponseJSON.contents.translated;
    console.log(encryptedMessage);
      return encryptedMessage;
}

async function runDiscordAutomation() {
    const originalMessage = "run%20while%20you%20can%20you%20can%20find%20shelter%20here:%20https://discord.com/invite/courier";
    const encryptedMessage = await encryptMessage(originalMessage);

    const automationsEndpoint = "https://api.courier.com/automations/invoke"

  const courierOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + apiKey
    },
    body: JSON.stringify({
        "automation": {
            "steps": [
              {
                "action": "send",
                "message": {
                    "template": templateID,
                    "to": {
                      "discord": {
                        "channel_id": channel_id
                      }
                    }
                  }
              },
              {
                  "action":"delay",
                  "duration":"1 day"
                },
              {
                "action": "send",
                "message": {
                    "template": templateID,
                    "to": {
                      "discord": {
                        "channel_id": channel_id
                      }
                    }
                  }
              }
            ],
          },
          "data": {
                "secretMessage": encryptedMessage
            } 
    }),
  };

  fetch(automationsEndpoint, courierOptions)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

runDiscordAutomation();
