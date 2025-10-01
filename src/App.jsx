import { chapters } from './content'
import { sections } from './content/nav'
import config from './config';

import Course from './Course'

function App() {
  return (
    <Course chapters={chapters} config={config} sections={sections} />
  )
}

export default App
