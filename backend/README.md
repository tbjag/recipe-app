# Backend

## First Time Set Up

- Create a .env file off the .env.example
- Install poetry `curl -sSL https://install.python-poetry.org | python3 -`
- Run `poetry self add poetry-dotenv-plugin`, this allows us to load environment variables easily
- Run `poetry install`
- Run `poetry run ./prestart.sh`

## Mac-specific instructions if errors occur

- Downgrade to python3.8
  - install with: `brew install python@3.8`
  - modify `backend/pyproject.toml` with `python=~3.8` (~ squiggly line instead of ^ carrot)
  - run `which python3.8` to check where the python installation is
  - run `poetry env use <path>` where `<path>` is where the python installation is (e.g. `poetry env use /usr/local/bin/python3.8`)
- Ensure postgres database is running
  - cd to the root folder (recipe-app)
  - run `docker compose up -d`
- If encountering errors with `<name>.sh` files, run `chmod +x <name>.sh`

## Running the Project

- After database changes run `poetry run ./prestart.sh`
- Run `poetry run ./run.sh`
