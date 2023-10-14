"use client";
import styles from "../styles/page.module.css";
import { Button, message } from "antd";
import Image from "next/image";
import { useState, useEffect } from "react";

const Main: React.FC = () => {
  const [imageFound, setImageFound] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const showMessage = (type: "loading" | "success", content: string) => {
    message.open({
      type,
      content,
      key: "loadingKey",
    });
  };

  const callAPI = async () => {
    showMessage("loading", "Getting your decision...");

    try {
      const response = await fetch("https://yesno.wtf/api");
      const result = await response.json();
      const answer: string = result.answer.toUpperCase();
      setAnswer(answer);
      setImage(result.image);
      setImageFound(true);
      showMessage("success", answer);
    } catch (exception) {
      console.log(exception);
    }
  };

  useEffect(() => {
    if (imageFound) {
      showMessage("success", answer);
    }
  }, [imageFound]);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.headerContainer}>
        <h1>Yes or No</h1>
        <p>Randomly generate yes or no</p>
        <Button onClick={callAPI}>Generate</Button>
      </div>
      {imageFound && (
        <div>
          <Image src={image} alt="gif" width={300} height={300} />
        </div>
      )}
    </div>
  );
};

export default Main;
