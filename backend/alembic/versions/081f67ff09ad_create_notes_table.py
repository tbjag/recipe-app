"""create notes table

Revision ID: 081f67ff09ad
Revises: 
Create Date: 2023-05-23 17:03:44.894795

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '081f67ff09ad'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "notes",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("text", sa.String),
        sa.Column("completed", sa.Boolean)
    )


def downgrade():
    op.drop_table("notes")
