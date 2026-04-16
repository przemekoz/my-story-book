export const AboutPage = () => {
  const test = async () => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: "cat astronaut" }),
    });

    console.log(response);
  };

  return (
    <>
      About page <button onClick={test}>test /api/generate</button>
    </>
  );
};
