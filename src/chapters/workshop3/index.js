import { introToWorkshop3Chapters } from "./workshop3-intro"
import { workshop3ConclusionChapters } from "./conclusion"
import { introToRDSChapters } from "./rds"
import { workshop3DockerNetworkChapters } from "./docker-network"

export const workshop3Chapters = [
  ...introToWorkshop3Chapters,
  ...workshop3ConclusionChapters,
  ...introToRDSChapters,
  ...workshop3DockerNetworkChapters,
]
