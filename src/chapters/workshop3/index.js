import { introToWorkshop3Chapters } from "./workshop3-intro"
import { workshop3ConclusionChapters } from "./conclusion"
import { introToRDSChapters } from "./rds"
import { rdsCicdChapters} from "./cicd-rds"


export const workshop3Chapters = [
  ...introToWorkshop3Chapters,
  ...workshop3ConclusionChapters,
  ...introToRDSChapters,
  ...rdsCicdChapters
]