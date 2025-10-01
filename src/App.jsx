import { chapters } from './chapters'
import { sections } from './sections'
import config from './config';

import Course from './Course'

function App() {
  return (
    <Course chapters={chapters} config={config} sections={sections} />
  )
}

export default App
