#! /usr/bin/env bash

cd src
# Let the DB start
python3 ./backend_pre_start.py
cd .. 

# Run migrations
alembic upgrade head    <---- ALEMBIC MIGRATION COMMAND