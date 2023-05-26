"""create note table

Revision ID: 914d67ed88db
Revises: 
Create Date: 2023-05-25 14:36:21.754392

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '914d67ed88db'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "note",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("text", sa.String),
        sa.Column("completed", sa.Boolean)
    )


def downgrade():
    op.drop_table("note")