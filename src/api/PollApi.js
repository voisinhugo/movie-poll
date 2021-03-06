const BASE_URL = "https://hidden-reef-75246.herokuapp.com/";
// const BASE_URL = "http://localhost:5000/";

export const getPoll = async () => {
  const response = await fetch(`${BASE_URL}poll`);
  const data = await response.json();
  if (data) {
    return data;
  } else {
    return null;
  }
}

const simpleJsonToFormData = (json) => (
  Object.keys(json).map(key => `${key}=${json[key]}`).join("&")
);

export const voteForPoll = async (answerId) => {
  const body = { answerId };
  const response = await fetch(
    `${BASE_URL}poll/vote`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: simpleJsonToFormData(body)
    }
  );
  const results = await response.json();
  return results;
};

export const addAnswerToPoll = async (id, title) => {
  const body = { id, title };
  const response = await fetch(
    `${BASE_URL}poll/answer/append`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: simpleJsonToFormData(body)
    }
  );
  const results = await response.json();
  return results;
};
