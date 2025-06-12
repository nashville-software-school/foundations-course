import { cloudFundamentalsChapters } from "./cloud-fundamentals"
import { awsS3HostingChapters } from "./aws-s3-hosting"
import { introToCicdChapters } from "./intro-to-cicd"
import { cloudfrontChapters } from "./cloudfront"
import { introductionChapters } from "./introduction"
import { conclusionChapters } from './conclusion';


export const workshop1Chapters = [
  ...introductionChapters,
  ...cloudFundamentalsChapters,
  ...awsS3HostingChapters,
  ...cloudfrontChapters,
  ...introToCicdChapters,
  ...conclusionChapters,
]