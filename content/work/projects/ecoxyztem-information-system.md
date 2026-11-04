---
title: Ecoxyztem Information System using Odoo
category: organization
date: 2025-05-28
summary: An Odoo information system for organizing startup stages, projects, tasks, documents, progress, and collaboration.
applicationTypes: ['Web interface']
fields: ['Software Architecture', 'Software Engineering']
tags: [Odoo, Python]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/SI_Ecoxyztem
---

## Overview

This project extends Odoo with a central workspace for tracking startup activity.
Its custom module defines records for startups, projects, tasks, documents, progress updates, discussions, and mentors rather than treating those workflows as unrelated lists.

A startup has a lifecycle stage, members, mentors, and related work records.
Projects belong to a startup and have deadlines and statuses, while tasks can be assigned to users and linked to both a project and its startup.
Creating a startup automatically adds the current Odoo user as a member.

## Odoo module and deployment

The module uses Odoo's ORM for its models and relationships, and it includes views and access-control data for the web interface.
Project and task records inherit Odoo's mail thread and activity mixins, with tracked fields recording status and other changes in the normal Odoo workflow.

The deployment uses Docker Compose to run Odoo 17 alongside PostgreSQL 15.
The custom add-on directory is mounted into Odoo, and named volumes keep the database and application data separate from the containers.

```text
Browser -> Odoo web service -> Ecoxyztem Core add-on
                    |
                    v
               PostgreSQL
```

## What I learned

The work provided hands-on practice with extending an established business platform through models, relationships, views, and access rules.
It also connected application architecture to deployment by running the Odoo service and its database as separate containers.
The main design choice visible in the repository is to express startup-specific workflows as an Odoo module that builds on the platform's existing model and mail features.
