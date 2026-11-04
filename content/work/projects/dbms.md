---
title: DBMS from scratch
category: academic
date: 2024-12-13
summary: A Python database-management-system project built from scratch, with a focus on the storage manager.
applicationTypes: ['Library']
fields: ['Computer Science', 'Database Systems', 'Software Engineering']
tags: [Python, DBMS]
cover: cover.png
links:
  - label: Repository
    url: https://github.com/NoHaitch/DBMS
---

## Overview

KawulaSQL is a small relational database system with a command-line SQL interface and separate components for query processing, optimization, concurrency control, storage, and recovery.
The top-level program passes each SQL statement to a query processor and displays its execution result.
My main focus in the project was the storage manager, which translates table operations into reads and writes over the stored table files.

## Storage manager design

The storage manager keeps table schemas and table-file managers, and maintains an `information_schema` table for catalog metadata.
Each table uses a schema-aware serializer and a binary file organized into blocks, with additional blocks created when a record no longer fits in the current one.
Read, insert, update, and delete operations are complemented by projection, condition filtering, and joined-table retrieval.

```python
try:
    block.add_record(record_bytes)
except ValueError:
    self.set_buffer(self.table_name, current_page, block)
    block = Block()
    current_page += 1
```

The storage layer also supports hash indexes and reports table statistics, including record and block counts, for use by query optimization.
This made the boundary between logical table operations and physical page management concrete.

```text
SQL statement -> QueryProcessor -> StorageManager
                                  |-> catalog and schemas
                                  |-> table files -> blocks and serialized records
                                  |-> indexes and storage statistics
```

## What I learned

Building this component helped me understand how schemas, record serialization, fixed-size blocks, indexes, and query planning depend on one another.
It also showed why a storage manager needs to expose both data operations and useful metadata to the rest of a database engine.
