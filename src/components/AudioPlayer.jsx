import React, { useEffect, useState } from "react";
import { css } from '@emotion/react'

const styles = {
    wrapper: css`
        margin-bottom: 10px;
        padding:0 10px;
        background-color: #fff;
        border-radius: 0.5rem;
        border: #dee2e6 1px solid;`,
    audio: css`
        width: 100%;`,
    legend: css`
        margin: 10px;
        padding: 5px`,
    description: css`
        color: #6c757d;
        font-size: 0.9rem;
        font-style: italic;`
}
const AudioPlayer = ({ currentChapter, audioFilePath, description, legend="Lesson Overview" }) => {
  const [audioExists, setAudioExists] = useState(false);
  console.log("audioFilePath", audioFilePath, description, legend)
  let audioOverviewExist = () => {
    fetch(audioFilePath, { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
            let contentType = res.headers.get('Content-Type')
            console.log("contentType",contentType)
            if (contentType && contentType.includes('audio')) {
              console.log("setAudioExists",true)
              setAudioExists(true);
            } else {
              setAudioExists(false);
            }
        } else {
          setAudioExists(false);
        }
      })
      .catch(() => setAudioExists(false));
  }
  useEffect(audioOverviewExist, [audioFilePath,currentChapter]);

  console.log("audioExists",audioExists)
  return (
    audioExists ? <fieldset css={styles.wrapper} key={audioFilePath}>
        <legend css={styles.legend}>{legend}</legend>
        <audio css={styles.audio} controls >
            <source src={audioFilePath} type="audio/wav" />
            Your browser does not support the audio element.
        </audio>
        {description && <div css={styles.description}>{description}</div>}
    </fieldset> : <div></div>);
};

export default AudioPlayer;
