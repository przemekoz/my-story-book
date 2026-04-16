export const AboutPage = () => {
  const test = async () => {
    await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: "cat astronaut" }),
    });
  };

  return (
    <>
      About page <button onClick={test}>test /api/generate</button>
    </>
  );
};
