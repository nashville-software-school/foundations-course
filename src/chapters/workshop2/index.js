import { introToDockerChapters } from "./docker"
import { cliEcrChapters } from "./aws-cli-ecr"
import { ec2Chapters } from "./ec2"
import { introToWorkshop2Chapters } from "./workshop2-intro"
import { ec2CicdChapters } from "./cicd-with-ec2"
import { workshop2ConclusionChapters } from "./conclusion"

export const workshop2Chapters = [
  ...introToWorkshop2Chapters,
  ...introToDockerChapters,
  ...cliEcrChapters,
  ...ec2Chapters,
  ...ec2CicdChapters,
  ...workshop2ConclusionChapters
]