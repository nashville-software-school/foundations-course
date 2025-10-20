import { chapters } from './chapters'
import { sections } from './sections'

import config from './config';

import { Course } from '@nss-workshops/nss-core'
import './App.css'

function App() {
  return (
    <Course chapters={chapters}
            config={config}
            nav={sections} />
  )
}

export default App