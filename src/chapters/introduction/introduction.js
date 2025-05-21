import diagramImg from "./arch_diagram.png";
export const introductionChapter = {
  id: 'introduction',
  title: 'Introduction to the course',
  sectionId: 'introduction',
  previousChapterId: null,
  content: `
# Welcome to the Cloud Course 🌩️

Welcome to the **Intro to Cloud** course! By the end of this workshop series, you'll understand key cloud concepts, gain hands-on experience deploying a front-end app to the cloud, and confidently discuss terms like **CI/CD**, **S3**, and **CloudFront**.

---

## 📝 Summary

This is the **first workshop in our Cloud series**. Here's what you'll learn:

- What the **cloud** is (and what it isn't)
- Benefits of cloud computing
- Introduction to major **cloud providers**
- Hands-on experience with **CI/CD**
- How to deploy a **static front-end app** to the cloud
- In-depth work with **Amazon Web Services (AWS)** including:
  - **S3** (Simple Storage Service)
  - **CloudFront** (Content Delivery Network)

You’ll build a working vocabulary of cloud-related terms so you can talk tech with confidence.

## The diagram below show our goal: a cloud-powered masterpiece you’ll soon command. 🚀
<img width=700 src="${diagramImg}"/>
---

## 🗓️ Course Structure

- **Live Zoom Sessions**: 2 sessions per week, each 2 hours long
- **Slack Channel**: For discussions, announcements, and questions 
    - Slack Channel: Join the conversation, ask questions, and stay updated.
    Look for: #intro-to-cloud-{your cohort number} — for example, Cohort One = #intro-to-cloud-01
- **Session Format**:
  - **Hour 1**: Learn core concepts and collaboratively set up resources in the cloud (instructor-supported)
  - **Hour 2**: Instructor-led walkthroughs, with discussion and deeper insights

---

## 📚 Weekly Breakdown

### Week 1

#### Session 1: Cloud Fundamentals
- What is the Cloud?
- Why Use the Cloud?
- AWS Account Setup
- Key Vocabulary

#### Session 2: Deploying to S3
- Overview of the "Rock of Ages" front-end app
- What is S3?
- Hosting Static Sites with AWS S3
- Key Vocabulary

### Week 2

#### Session 3: CloudFront & Content Delivery
- What is CloudFront?
- Configuring CloudFront for performance
- Key Vocabulary

#### Session 4: CI/CD in Action
- Introduction to CI/CD
- CI/CD Fundamentals
- What are GitHub Actions?
- Build a complete deployment pipeline
- Key Vocabulary
`,
  exercise: null
};