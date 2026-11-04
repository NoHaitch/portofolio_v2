---
title: Mewcrosoft OS
category: academic
date: 2024-05-20
summary: A small operating system written in C, built with GNU tools, and run in QEMU.
applicationTypes: ['Operating system']
fields: ['Computer Science', 'Operating Systems', 'Systems Programming']
tags: [C, Make, GNU, QEMU]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/Tubes-IF2230-OS-GyattBelajar
---

## Overview

Mewcrosoft is a small operating-system project written in C and assembly, built with GNU tools, and tested in QEMU.
It brings together kernel initialization, interrupt handling, a framebuffer and keyboard driver, FAT32 filesystem code, paging, and process-related routines.

## Kernel startup

The kernel setup initializes the global descriptor table, remaps the interrupt controller, configures the interrupt descriptor table, enables keyboard input, and prepares the framebuffer.
It then initializes the FAT32 filesystem and task-state segment, maps a user page, reads the `shell` file from the filesystem root, and passes control to the user-program execution path.

```text
Kernel setup
    -> descriptor tables and interrupt handling
    -> framebuffer, keyboard, and FAT32 initialization
    -> paging and task-state setup
    -> load shell from the root directory
    -> execute user program
```

The startup sequence shows why a low-level project depends on many pieces agreeing about memory layout, interrupts, storage, and execution state.
The source also keeps these concerns in separate modules, including `gdt.c`, `paging.c`, `process.c`, and the filesystem and interrupt directories.

## Learning goals

The project provided hands-on practice with systems programming and the boundary between hardware-oriented initialization and code running in user space.
It also made debugging more concrete: a fault in an early boot or memory-management step can prevent higher-level code from running at all.
