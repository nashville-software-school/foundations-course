# File Naming Convention for Chapter Audio

To ensure audio files are loaded correctly under each chapter, follow this naming convention.

Currently, audio files must be in `.wav` format, which is the default output format from the notebook LLM.

### 🎧 Types of Audio Files

We support three types of audio overviews:

- **Overview** — provides a summary or explanation of the lesson content.  
  _Appears under the lesson title if a properly named audio file is present._

- **Exercise** — explains the exercise prompt or context.  
  _Appears under the exercise titles if a properly named audio file is present._

- **Solution** — walks through the official solution.  
  _Appears only after all tests pass and a properly named solution file exists._

### ✅ Required File Naming Format

`{chapter.id}-overview.wav` 
`{chapter.id}-excercise.wav` 
`{chapter.id}-solution.wav`

> Replace `{chapter.id}` with the actual ID of the chapter.

#### Example:
```shell
multiline-strings-overview.wav 
multiline-strings-excercise.wav 
multiline-strings-solution.wav
```