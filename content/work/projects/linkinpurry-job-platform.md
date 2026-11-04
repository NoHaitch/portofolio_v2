---
title: LinkinPurry Job Platform
category: academic
date: 2024-10-23
summary: A PHP job-platform web application with a vanilla HTML, CSS, and JavaScript frontend and PostgreSQL data storage.
applicationTypes: ['Web interface']
fields: ['Software Engineering', 'Web Development']
tags: [PHP, PostgreSQL, HTML, CSS, JavaScript]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/LinkinPurry-Job-Platform
---

## Overview

LinkInPurry is a web-based job platform for job seekers and companies.
Job seekers can browse vacancy details, apply, review application history, and manage a profile, while company accounts can create and edit vacancies and review applicants.
The application also includes vacancy attachments and job recommendations.

## Application structure

The browser interface uses vanilla HTML, CSS, and JavaScript, and PHP handles the server-side application logic.
The PHP source is organized into routing and controller code, services, repositories, models, and views, with PostgreSQL storing application data.
Docker Compose is provided to run the application stack.

```text
Browser interface
       |
       v
PHP router and controllers
       |
       v
Services -> repositories and models
       |
       v
PostgreSQL
       |
       v
PHP views returned to the browser
```

This separation keeps request handling, application behavior, and persistence code in distinct parts of the project.
It also offers a practical example of the MVC pattern without requiring a separate frontend framework.

## Learning goals

Building the platform involved connecting account roles and vacancy workflows to a relational data model.
The project provided practice with PHP MVC organization, server-rendered pages, form-driven interactions, and coordinating job-seeker and company use cases in one application.
