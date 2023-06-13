# Backend

## First Time Set Up
- Create a .env file off the .env.example
- If you have not installed poetry, install with `curl -sSL https://install.python-poetry.org | python3 -`
- Run `poetry self add poetry-dotenv-plugin`, this allows us to load environment variables easily
- Run `poetry install`
- Run `poetry run ./prestart.sh`

## Running the Project
- After database changes run `poetry run ./prestart.sh`
- Run `poetry run ./run.sh`