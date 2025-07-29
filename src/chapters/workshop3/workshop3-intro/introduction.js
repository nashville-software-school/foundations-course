import diagram from "../../../assets/work3diagram.png"

export const introductionWorkshop3Chapter = {
  id: 'workshop3-intro',
  title: 'Introduction to RDS and Docker Compose',
  sectionId: 'intro-to-workshop3',
  previousChapterId: null,
  content: `## Welcome to the third workshop of **Intro to Cloud** course! By the end of this workshop, you'll understand basic RDS(Relational Database Service) concepts. You'll gain hands-on experience creating an RDS database and integrating it with your API running on EC2. You will also get introduced to Docker networking and Docker compose for setting up local testing environments.
    
    
  ## 📝 Summary
  
  This is the **third workshop in our Cloud series**. Here's what you'll learn:
  
  - What is **RDS** 
  - Benefits of using RDS
  - API and Github Actions updates to support RDS
  - How to set up local testing environment with multiple services
  - Introduction to **Docker networking**
  - Introduction to **Docker compose**
  
  
  
  ## The diagram below shows our goal: a cloud-powered full stack deployment building on the first two workshops
  
  <img width=700 src="${diagram}"/>

  
  ## 📚 Weekly Breakdown
  
  There will be three class sessions held on Zoom.
  
  - Week 1
    - Session 1 - July 29th Tuesday  1-3pm CDT
    - Session 2 - July 31st Thursday 1-3pm CDT
  
  - Week 2
    - Session 3 - August 5th Tuesday  1-3pm CDT
  
  ### Week 1
  
  #### Session 1: RDS
  - What is RDS?
  - Benefits of RDS vs Sqlite
  - API updates to support RDS
  - Testing RDS using VsCode extensions
  - Github actions and secrets updates to deploy RDS compatible API 
  
  
  #### Session 2: Docker Networking
  - What is a Docker network
  - How to use Docker networks to run multiple containers locally
  - Container-to-container communication
  - Port mapping vs internal networking
  - debugging with Docker networking
  
  ### Week 2
  
  #### Session 3: Docker Compose
  - Mimicking production in development
  - Container orchestration concepts
  - Docker Compose benefits and usage
  - How does Docker Compose simplify Docker networking

`,
  exercise: null
};