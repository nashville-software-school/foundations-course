import { chapters } from './content'
import { nav } from './content/nav'
import config from './config';

import Course from './Course'

function App() {
  return (
    <Course chapters={chapters} config={config} nav={nav} />
  )
}

export default App
