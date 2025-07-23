import diagram from "../../../assets/work2diagram.png"

export const introductionWorkshop2Chapter = {
  id: 'workshop2-intro',
  title: 'Introduction to Docker and EC2',
  sectionId: 'intro-to-workshop2',
  previousChapterId: null,
  content: `## Welcome to the second workshop of **Intro to Cloud** course! By the end of this workshop, you'll understand basic docker concepts, gain hands-on experience deploying a back-end API to the cloud using an EC2 instance, and confidently discuss terms like **container**, **virtualization**, and **EC2**.
  
  
  ## 📝 Summary
  
  This is the **second workshop in our Cloud series**. Here's what you'll learn:
  
  - What is docker 
  - Benefits of using docker
  - Introduction to **EC2** instances
  - Build on github actions and see how jobs and workflows can differ
  - How to deploy a **back-end API** to the cloud
  - In-depth work with **Amazon Web Services (AWS)** including:
    - **EC2** (Elastic Compute Cloud)
    - **ECR** (Elastic Container Registry)
    - **AWS CLI** (Amazon's Command Line Interface)
  
  
  ## The diagram below shows our goal: a cloud-powered full stack deployment building on the first workshop
  
  <img width=700 src="${diagram}"/>

  
  ## 📚 Weekly Breakdown
  
  There will be three class sessions held on Zoom.
  
  - Week 1
    - Session 1 - July 1st Tuesday  1-3pm CDT
    - Session 2 - July 3rd Thursday 1-3pm CDT
  
  - Week 2
    - Session 3 - July 8th Tuesday  1-3pm CDT
  
  ### Week 1
  
  #### Session 1: Docker, AWS CLI, and ECR
  - What is Docker?
  - Why Use Docker?
  - Run Docker Locally
  - AWS CLI setup
  - What is ECR?
  - Push Docker image to ECR
  
  #### Session 2: Deploying to EC2
  - What is EC2?
  - Spinning up an EC2 instance
  - Pulling Docker image from ECR to EC2
  - Running Docker container in EC2
  - Key Vocabulary
  
  ### Week 2
  
  #### Session 3: CI/CD in Action
  - Different CI/CD workflows and job handling
  - GitHub Actions for manual triggers 
  - Build a complete deployment pipeline for EC2 


`,
  exercise: null
};