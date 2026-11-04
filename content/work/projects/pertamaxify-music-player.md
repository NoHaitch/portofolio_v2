---
title: Pertamaxify Android Music Player
category: academic
date: 2025-05-25
summary: A Kotlin and Jetpack Compose music app with local and online listening features.
applicationTypes: ['Mobile app']
fields: ['Mobile Development', 'Software Engineering']
tags: [Kotlin, Android, Mobile]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/Pertamaxify-Android-Music-Player
---

## Overview

Pertamaxify is a native Android music application built with Kotlin and Jetpack Compose.
The repository README calls the app Purritify and describes it as a music experience inspired by familiar streaming apps.
Its screens cover sign-in, home, library, profile, playback, and QR scanning, with features such as song sharing through links or QR codes.

## Playback and data flow

The playback UI does not own the audio engine directly.
A `MusicPlayerManager` binds to the app's `MusicService`, forwards play, pause, seek, and track-navigation actions, and exposes player state through Kotlin flows.
The service uses AndroidX Media3's ExoPlayer, while the app also has Room database and repository modules for local data, plus Retrofit-based remote networking.

```text
Compose screens -> MusicPlayerManager -> bound MusicService -> ExoPlayer
       |                                      |
       +-> repositories -> Room / remote API  +-> playback state
```

The README notes that the server is provided separately and is not included in this repository.
That boundary makes the project useful for studying how a mobile client can combine server-backed content with local application data and background playback.

## Design and learning goals

Using Compose let me build the interface from smaller declarative screens, while the service boundary kept playback controls available outside an individual screen.
The project also brought together media playback, local persistence, network data, and sharing in one Android codebase.
It helped me practice coordinating UI state with a long-running playback component and organizing app features into repositories and services.
