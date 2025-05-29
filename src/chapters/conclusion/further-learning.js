export const furtherLearningChapter = {
  id: "further-learning",
  title: "Further Learning Resources",
  sectionId: "conclusion",
  previousChapterId: "deleting-resources",
  content: `As you may know by now there are a huge number of resources available to continue learning cloud and devops technologies. A good place to start is some of the trainings offered by [Amazon Skillbuilder](https://skillbuilder.aws/getstarted). There is a paid subscription plan but it offers many trainings for free as well.


### Custom URLs and DNS (Domain Name System)
We realize that many of you may be curious about how to host your application using a custom URL. This was outside of the learning objectives for this course but is possible by using a DNS web service such as Amazon Route53. 
<iframe width="560" height="315" src="https://www.youtube.com/embed/10JKpg-eqZU?si=RFRHSA56t8k50nHQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

And, of course, you can incorporate Amazon Route53 with Cloudfront and s3 static website hosting! Here is a tutorial on a slightly more complex version of what we have built demonstrating just that.

<iframe width="560" height="315" src="https://www.youtube.com/embed/mls8tiiI3uc?si=xmlHGdPI6BF2aVfF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


### HTTPS and SSL Certificates
If you remember, during the Cloudfront chapter we had to make sure to update the URL to use HTTP, even though Cloudfront supports HTTPS. This is because our React client is calling our backend api at an HTTP endpoint which causes the initial HTTPS to fail. We could update our api endpoint to use HTTPS but that would require attaching an SSL certificate to the domain which would create too much complexity for most beginner students. Feel free to deep dive into these topics on your own!
<iframe width="560" height="315" src="https://www.youtube.com/embed/j9QmMEWmcfo?si=xnYnwPVT8uTG6YXw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
`,
  exercise: null,
}